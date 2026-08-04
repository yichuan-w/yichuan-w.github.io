---
title: "Defending Against the Training–Inference Numeric Mismatch in RL (Especially Linear Attention) — and How It Fares Under Async RL"
date: 2026-08-01
comments: true
---

# Defending Against the Training–Inference Numeric Mismatch in RL (Especially Linear Attention) — and How It Fares Under Async RL

*Yichuan Wang in collaboration with the TorchTitan team · August 2026*

## The result, up front

**Qwen3.5-9B-Base** trained on
[DAPO-Math-17k](https://huggingface.co/datasets/BytedTsinghua-SIA/DAPO-Math-17k),
async RL at `offpolicy = 12`. Three setups, same data, same recipe. **BI** in the
legends is short for **batch invariance** — the property we spend section 3 building,
and the shorthand we use for the rest of the post:

<div class="fig-row" style="display: flex; gap: 1rem; align-items: flex-start;" markdown="1">

<div style="flex: 1 1 0; min-width: 0;" markdown="1">

![Train/inference logprob difference (abs mean) across 200 steps: vLLM native engine is highest and spikiest, TorchTitan unified model without BI is in the middle, TorchTitan unified model with batch-invariant kernels is consistently lowest; the origin at step 0 is circled, where the BI curve is exactly 0](../asset/ti-mismatch-dapo-logprob-diff.png)

*Train/inference logprob gap — lower is better.*

</div>

<div style="flex: 1 1 0; min-width: 0;" markdown="1">

![Rollout average train reward across 200 steps: the TorchTitan unified model with BI ends highest (~0.7), without BI slightly below, vLLM native engine lowest (~0.6)](../asset/ti-mismatch-dapo-reward.png)

*Training reward — higher is better.*

</div>

</div>

Three lines in both plots:

- 🔴 **red** — vLLM native engine serving (the standard two-engine setup);
- 🟤 **brown** — TorchTitan **unified model**: trainer and generator share one model
  definition, but with stock kernels;
- ⚪ **grey** — the same unified model, **plus batch-invariant kernels** (BI).

The ordering is the same on both sides: grey has the **lowest** logprob gap and the
**highest** reward. Closing the numerical mismatch is not just cosmetic — it buys
real reward on a linear-attention model under async RL.

The single most telling point is at **step 0**, where the grey curve's
`bit_wise/logprob_diff/abs_mean` is **exactly 0**. At step 0 nothing is stale yet, so
this is the clean measurement: with BI kernels, our system has **no train/inference
mismatch at all** — bitwise parity between trainer and generator. Every nonzero value
after that is *off-policy staleness*, not precision noise. That separation is the
whole point: once the infra term is provably zero, whatever gap remains is genuinely
algorithmic, and you can reason about it.

The rest of the post is how we got there, and what it does (and does not) buy you.

---

## Intro

Reinforcement learning on LLMs runs on **two different engines**. Training happens
in one stack (Megatron, or PyTorch FSDP); rollout generation in another (SGLang,
vLLM). They are tuned for opposite goals — the trainer for throughput, the
generator for latency — so under the hood they run **different kernels**: different
matmul tilings, attention implementations, and reduction orders.

That is fine until you recall what RL asks of them. The generator samples a token
and reports its log-prob `μ`; the trainer later recomputes the log-prob `π` of that
*same* token under (nominally) the same weights. Different kernels, plus
non-associative floating-point ([Thinking Machines, *Defeating Nondeterminism in
LLM Inference*](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/)),
mean **the same token comes back with a different logprob from each engine.** That
gap is pure infrastructure — no policy actually changed — yet it leaks into the RL
signal as **numerical noise**. This is the **train/inference mismatch**: an infra
artifact masquerading as an algorithmic one. So when an RL run misbehaves, *"is this just infra precision?"* is
a suspect you can never quite rule out. The goal we want is simple to state:
**infra-level numerical error should not leak into the algorithm.**

And by 2026, across the open-source landscape, it is only getting harder — for two
reasons.

1. **Architectures keep getting fancier, and holding the mismatch at zero gets
   harder with them.** The frontier open-source models no longer ship plain
   quadratic attention: linear attention in the latest Qwen and Kimi,
   sliding-window attention in Inkling, sparse attention in DeepSeek. Take linear
   attention as the example — instead of keeping an explicit KV cache, it
   compresses the entire context into a fixed-size **recurrent state**. It is
   genuinely unclear whether squeezing global information into so small a state
   makes the numerics *more* sensitive — and as far as we know, **no open-source
   stack has hit train/inference KL = 0 for linear attention** yet.
2. **Async RL is going mainstream.** To overlap the trainer and the generator,
   async RL lets the generator run several steps behind the live policy — so `μ` is
   a genuinely *older* policy than `π`, and the ratio `exp(π − μ)` is *supposed* to
   be ≠ 1 (that's what the clipped surrogate is for). But the popular open-source
   loops (slime, open-instruct) compute that ratio from raw `μ` and `π` directly,
   which **conflates two very different mismatches**: the *algorithmic* one from
   staleness (which the surrogate is designed to absorb) and the *numerical* one
   from precision (which it is not). When something breaks, you cannot tell whether
   the culprit is async or infra.

The folk wisdom here is that driving the train/inference KL to zero should make
async RL more stable — clean out the numerical mismatch, and the off-policy window
can be pushed wider. It is a plausible story, but there is **little open evidence
for it either way**.

So we wrote this post. You will see:

1. a quick recap of the key notions — **determinism**, **batch invariance**, and
   **trainer/generator bitwise parity** — what the train/inference mismatch really
   is, and what the open-source stack already handles (which ops have
   batch-invariant kernels);
2. how we push it further — closing the mismatch at the **RL-engine level** and the
   **special-op level** (linear attention, etc.), driving the numerical difference
   between trainer and generator to zero, a.k.a. **batch invariance**;
3. what happens when *zero mismatch* meets **async RL**, across three regimes —
   **long math reasoning**, **multi-turn single-agent** (search agent), and
   **multi-turn complex-agent** training (terminal agent): does bit-exact parity
   actually let us push the async off-policy window wider?;
4. the bottom line — whether closing this mismatch is actually worth it: the costs,
   and the benefits.

---

## 2. Background: determinism, batch invariance, and bitwise parity

Three notions we lean on throughout the post:

- **Determinism** — the same input batch produces the same result run-to-run. Rerun
  the identical forward on the identical batch, get identical bits.
- **Batch invariance** — a *single sample* produces the same result regardless of
  which other samples share its batch. This is strictly stronger than determinism: a
  kernel can be perfectly deterministic (stable for a fixed batch) yet still
  batch-*variant* — its output for one row shifts the moment the batch's shape or
  composition changes.
- **Trainer/generator bitwise parity** — the end-to-end goal: the trainer's
  recomputed logprob `π` equals the generator's rollout logprob `μ` bit for bit.
  This is what "**train/inference zero logp difference**" means in practice.

The culprit underneath all of this is floating-point non-associativity:

```
(a + b) + c  ≠  a + (b + c)
```

Every kernel that sums something has to pick an order to fold the partials together,
and a high-performance kernel picks that order *per shape*, to maximize occupancy on
the tensor it happens to be handed. So the reduction order is a property of the
shape, not of the math: change the batch, and the summation order changes with it —
same math, different low bits. That is what breaks `π = μ`.

Batch invariance, then, comes down to one thing: **a reduction somewhere is happening
along the batch-size axis.** (The full kernel-level derivation is in the TML blog;
we only recap enough to build on it.)

So the recipe for parity falls out: make every op **batch-invariant** (a fixed
reduction order, independent of the batch), run both engines **deterministically**,
and the two logprob streams collapse onto each other — zero mismatch.

### What the open-source stack already covers

The first people to attack batch invariance and determinism in the open were
Thinking Machines, in the blog above plus its
[`batch_invariant_ops`](https://github.com/thinking-machines-lab/batch_invariant_ops)
repo. That repo gives batch-invariant kernels for **three ops** — RMSNorm, GEMM, and
attention:

| Op | Why it is batch-variant by default | Fix |
|---|---|---|
| **RMSNorm** (`mean.dim`) | with few rows, the kernel splits the reduction across the batch axis to fill the GPU | don't reduce along the batch-size axis |
| **GEMM** (`mm` / `addmm`) | tile size and split-K are picked per shape | don't reduce along the batch-size axis |
| **attention** | flash-decoding splits the KV dimension, and the split count depends on `max_k` — i.e. on the batch | disable split-K, which achieves the same effect |

There is also work on the *cross-GPU* version of the problem: [Zhang et
al.](https://arxiv.org/abs/2511.17826) use tree-based TP — one unified hierarchical
binary reduction tree within and across GPUs — to get no train/inference mismatch
even when the trainer runs FSDP at `TP = 1` and the generator runs multi-GPU TP. It
works, but it greatly sacrifices speed.

Worth noting: **DP at inference time, and DP/FSDP at training time, cause no extra
mismatch**, because neither reduces along the batch-size axis.

That is where the open-source coverage stops. It is enough for the architecture of
2023, and it is exactly the set of ops the newest models are moving *away* from. How
to handle newer architectures — **MoE**, and **linear attention** — is unclear.

---

## 3. How to defend batch-invariance — especially for a linear-attention model

We answer this at two levels at once: the **RL-engine level** and the **operator
level**.

### 3.1 RL-engine level: one model definition for both sides

As we said at the top, the training engine and the serving engine are developed
independently — so the two sides carry **two different model definitions**. That is
not just a code-duplication annoyance; it is a numerical one. Some op inside a layer
runs in fp32 on the training side and not on the serving side, and nobody notices
until the logprobs disagree. Then somebody has to go fix it by hand: see, for
example, [miles #975](https://github.com/radixark/miles/pull/975), which keeps
Qwen3.5's `A_log` in fp32 all the way through Megatron's bf16 wrapping so that
Megatron and SGLang agree again. Multiply that by every op in the model and you get
the real cost — **a lot of human effort spent aligning Megatron's and SGLang's
precision**, op by op, forever.

vLLM's [bitwise-consistent training and inference](https://vllm.ai/blog/2025-11-10-bitwise-consistent-train-inference)
post attacks this by **patching the same kernels into both engines**: they import
vLLM's forward ops into the trainer (writing backward passes for them, since
inference kernels carry no gradients) and audit every kernel invocation in the
forward pass. It gets to bitwise parity — but the patching has to be done on both
sides, and, as they note themselves, there are still two copies of the model code,
which is "fragile for long-term maintenance."

Our approach gets this for free from **TorchTitan's unified model abstraction**:
both frameworks enjoy the *same* model definition — the TorchTitan model. The
serving side keeps only vLLM's **KV-cache management** (paged attention, prefix
caching), but every per-layer op it runs is the trainer's op. So a forward pass is a
forward pass: trainer and generator execute the same code, at the same precision,
and the whole alignment problem above simply does not arise.

### 3.2 Operator level: linear attention

<div class="fig-float" style="float: right; width: 42%; margin: 0.2rem 0 1rem 1.6rem;" markdown="1">

![Dataflow of Qwen3.5 batch-invariant mode. Left, TRAINER: training tokens go through a RECURRENT forward to activations/logits and the loss; the backward pass uses the CHUNKED kernel to produce gradients. Right, INFERENCE/GENERATOR: prompt tokens go through a RECURRENT prefill into the recurrent state, and RECURRENT decode reads and updates that state to emit the next token. Dashed arrows link the trainer's recurrent forward to both the generator's prefill and decode, marking the ops that are bitwise identical across the two engines.](../asset/ti-mismatch-qwen35-bi-dataflow.png)

*The recurrent kernel (green) is shared by the trainer's forward, the generator's
prefill, and the generator's decode — those are the three places that must agree.
The chunked kernel (orange) survives only in the backward pass, where batch
invariance does not matter.*

</div>

TML gives us GEMM, attention, and RMSNorm, and for an older model like Qwen3 that is
enough. For the new ones — Qwen3.5 / Qwen3.8, Kimi 3 — it is not: we additionally
have to handle **linear attention**, plus its **state cache management** and its
**prefix caching**.

**Background.** For GDN (Gated DeltaNet), most open-source implementations — e.g.
[FLA](https://github.com/fla-org/flash-linear-attention) — use a
[**chunked**](https://github.com/fla-org/flash-linear-attention/blob/main/fla/ops/gated_delta_rule/chunk.py)
kernel for training and prefill, and a
[**recurrent**](https://github.com/fla-org/flash-linear-attention/blob/main/fla/ops/gated_delta_rule/fused_recurrent.py)
kernel only for decode. The chunked
kernel slices the sequence into fixed-size chunks, computes each chunk in matrix
form, and carries the state across chunk boundaries; the recurrent kernel walks the
sequence token by token. The two compute the same function in a *different order*,
so they do not agree bit for bit. Note what this means: the gap here is not a
mistuned kernel, it is **two different algorithms** on the two sides of the RL loop.

**Solution.** Continue using the vLLM SSM state, but switch **both prefill and
decode to the recurrent kernel**. For training, use the **recurrent kernel for the
forward pass and the chunked kernel for the backward pass** — only the forward
computation needs to be batch-invariant.

Going all-recurrent on the forward costs less than it sounds: in an RL step the
trainer is the cheap part anyway, so trading the chunked forward for a recurrent one
barely moves the wall clock.

The rest is the easy part: **disable split-K in attention, and patch in Thinking
Machines' batch-invariant GEMM.**

<div style="clear: both;"></div>

---

## 4. Results: async RL without the train/inference mismatch — performance or illusion?

### 4.1 Why production is async (and why that changes everything)

### 4.2 Batch invariance meets async: the guarantee quietly stops mattering

### 4.3 Experiments: three workloads, async, BI vs non-BI

---

## 5. Conclusion: bitwise parity is the ceiling, not the recipe

---

## Acknowledgements

This work was mainly done by Yichuan Wang, with the help of the TorchTitan team. Thanks also to [Charlie Ruan](https://www.charlieruan.com/), [Han Zhang](https://zhhhhahahaha.github.io/), [Yilong Zhao](TODO), and [Alexander Jiang](TODO) for the helpful discussions.

---

## Cite

```bibtex
@misc{wang2026traininginferencemismatch,
  title  = {Defending Against the Training–Inference Numeric Mismatch in RL (Especially Linear Attention) — and How It Fares Under Async RL},
  author = {Wang, Yichuan and the TorchTitan team},
  year   = {2026},
  month  = {August},
  url    = {https://yichuan-w.github.io/blog/training-inference-mismatch-rl/}
}
```
