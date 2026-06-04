# slime `coding_agent_rl`: Status of the Official Script

*June 4, 2026*

These are my notes from setting up and costing [slime](https://github.com/THUDM/slime)'s
[`examples/coding_agent_rl`](https://github.com/THUDM/slime/tree/main/examples/coding_agent_rl) —
THUDM/Z.ai's end-to-end **SWE coding-agent RL** example. The goal here is to document the
*status of the official script*: what it actually requires to run, what it does **not** ship,
and a concrete sandbox/GPU cost estimate. I'll clean this up later.

## What the example actually does

In one sentence: **it borrows the `claude-code` CLI as the agent "body", but swaps the brain
for the model you're training, and uses "do the tests pass?" as the reward.**

The per-sample rollout loop (`generate.py`) is four stages:

1. Boot an E2B sandbox → install Node 22 + `claude-code` CLI → drop in the repo and a
   `PROBLEM_STATEMENT.md`.
2. Run `claude-code`, which uses `Read/Edit/Grep/Bash` to edit code → produces a `git diff`.
3. Boot a **second, clean sandbox**, apply the diff, run the dataset's tests →
   pass = reward 1.0, else 0 (this two-sandbox split prevents test-cheating).
4. Split the trajectory into token segments + reward, feed back to slime training.

The single most important design point: **`claude-code` never talks to the real Anthropic API,
so there is no Anthropic API spend.** Its `ANTHROPIC_BASE_URL` is pointed at slime's in-process
`AnthropicAdapter` shim, which forwards requests to a local **SGLang** server running the model
being trained. The adapter follows a "string in, token out" contract: each turn re-tokenizes the
message history, calls SGLang `/generate` with `return_logprob=True`, and records the exact sampled
`output_ids` + logprobs — so RL only backprops through tokens the rollout model actually sampled.

## The official script config

`run_qwen36_35b_a3b_swe_8nodes.sh`:

- **Model:** `Qwen3.6-35B-A3B` — an MoE with **~35B total params but only ~3B active** (256 experts,
  top-k 8, 40 layers). Training via Megatron, rollout via SGLang, **colocated** on the same GPUs.
- **GPUs:** `--actor-num-nodes 8`, `--rollout-num-gpus 64` → **64×H100 (8 nodes × 8)**.
- **Context:** 96k token context per trajectory (`--rollout-max-context-len 96000`), with
  context-parallel `CP=8`.
- **Batch:** `rollout_batch_size 8 × n_samples_per_prompt 8 = 64` trajectories/step,
  `num_rollout 100` steps.
- **Algo:** GSPO advantage estimator, `lr 1e-6`, KL/entropy coefs = 0.

### Why 64 GPUs? (It's not a hard requirement)

64 is **just the cluster Z.ai happened to run on** — the script is literally named `8nodes`. It is
**not** a minimum dictated by the model or the algorithm. The 35B-A3B model (3B active) fits
comfortably on 8×H100 (96 GB): ~70 GB of bf16 weights spread over 8 GPUs via expert parallelism,
with the Adam optimizer offloaded to CPU (`--optimizer-cpu-offload`).

They used 64 for two real reasons:

1. **Throughput (main reason).** Agent rollouts are slow — each `claude-code` run gets up to
   30 minutes (`SWE_TIME_BUDGET_SEC=1800`), and each step needs 64 trajectories. More GPUs → more
   SGLang engines (`ROLLOUT_DP_SIZE=8`) → more sandboxes served concurrently → shorter wall-clock
   per step.
2. **Long context (the only model-side reason tied to GPU count).** 96k context needs context
   parallelism (`CP=8`) to avoid OOM during the training forward/backward on a single long
   trajectory. This is tunable — drop the context and `CP` drops with it.

**An 8-GPU single-node run is feasible** by editing the parallelism and batch down (e.g.
`actor-num-nodes 1`, `rollout-num-gpus 8`, `CP=1`, context → ~32k, batch → 4×4). The cost is
fewer concurrent rollouts (slower steps) and shorter context.

## What the script does NOT ship: data

slime ships **no recipe dataset and no data-prep script** for this example. The README only defines
the JSONL format and references an internal image name (`swedev/scaleswe.oh.34:<tag>`) from Z.ai's
private registry — which is not publicly pullable.

`generate.py` accepts **two metadata schemas**:

1. `swepro` — a SWE-bench Pro test harness (the README's "preferred" path).
2. `remote_env_info.f2p_script` — the "sweb-style" path: give an `image_url` + `workdir` + a
   fail-to-pass pytest script, and slime auto-wraps it into an eval command
   (`_wrap_f2p_script()`). **This is the easiest on-ramp for public data.**

So you don't have to build data from scratch — you convert a public dataset into slime's JSONL.
Candidates with prebuilt Docker images:

| Dataset | Size | Prebuilt images | Notes |
|---|---|---|---|
| **SWE-Gym** | ~2.4k | yes | Purpose-built for training SWE agents — most on-target |
| **R2E-Gym** | ~8.1k | yes | Largest; built for RL/agent training |
| **SWE-bench Verified** | 500 | yes (official) | The standard benchmark; good for a smoke/eval set |
| **SWE-bench (full/Lite)** | 2.3k / 300 | yes | Classic |
| **SWE-bench Pro** | limited public | partial | Only one that maps directly to the `swepro` field |

Two things are unavoidable regardless of dataset choice:

1. A small (~30–50 line) **converter** to map the dataset's fields into slime's
   `{prompt, label, metadata:{image, workdir, remote_env_info:{...}}}`. No public set is
   byte-for-byte aligned.
2. **The real work is the images, not the JSON.** Each task's multi-GB Docker image must be
   reachable by your E2B-compatible sandbox gateway. On public e2b.dev you'd first push these to a
   registry it can pull from.

## The other knobs you must provide

| Knob | What it is |
|---|---|
| `E2B_API_KEY` | E2B (or compatible gateway) key. README explicitly supports **internal gateways** — a dummy `e2b_` + 40-hex placeholder works if the gateway ignores auth. The official intent looks like an in-house sandbox cluster, not public e2b.dev. |
| `SWE_SANDBOX_METADATA_FILE` + `SWE_SANDBOX_IMAGE_METADATA_KEY` | JSON routing metadata; which key carries the image ref. |
| `SWE_HOST_NODE_TARBALL` | Node 22 tarball uploaded into each sandbox. |
| `SWE_HOST_CC_TARBALL` | `claude-code` npm tarball uploaded into each sandbox. |
| `SLIME_HEAD_HOST` | Routable IP the sandbox dials back to reach the adapter shim. |

## Cost estimate (one 100-step run = 6,400 trajectories)

### E2B sandbox cost

E2B (public e2b.dev) per-second pricing:

- **vCPU:** $0.000014 / s
- **RAM:** $0.0000045 / GiB / s
- Hobby: free + one-time $100 credit, 1-hour session cap.
- Pro: $150/mo, 24-hour session cap.

Assuming a moderate **4 vCPU / 8 GiB** sandbox ≈ **$0.33/hr**, and two sandboxes per trajectory
(work ≤ 1800 s + eval ≤ 600 s):

| Scenario | Sandbox-sec / traj | Cost / traj | × 6,400 traj |
|---|---|---|---|
| Best (agent finishes fast) | ~520 s | ~$0.05 | **~$300** |
| Mid | ~1,140 s | ~$0.11 | **~$700** |
| Worst (full budgets) | ~2,400 s | ~$0.22 | **~$1,400** |

So **roughly $300–$1,400 of sandbox time per full run on public e2b.dev**, midpoint ~$700. On your
own sandbox cluster this is just machine time, no cash. Scale linearly with sandbox size: 8 vCPU /
16 GiB ≈ 2× these numbers; 2 vCPU / 4 GiB ≈ 0.5×.

### GPU cost dominates

- 64×H100 for ~33–50 h wall-clock (each step's rollout is gated by the ≤30-min agent budget).
- At ~$2.5/H100-hr on public cloud: 64 × ~40 h × $2.5 ≈ **$5,000–$10,000 per run**.

**Takeaway: the sandbox bill is a few hundred to ~$1.4k; the real money is GPU (several thousand).**
If you run on owned hardware + an internal sandbox gateway, the cash cost collapses to machine time.

## Setup status (what I've actually done)

I split the environment into two layers, because the training side (Megatron + SGLang, 64 GPUs)
needs the official Docker image and a cluster, but the **agent side is pure-Python / CPU** and can
be smoke-tested locally.

- **Independent venv** (`uv`, Python 3.12, CPU torch): `torch-cpu, transformers, aiohttp,
  httpx[http2], e2b 2.25.1, anthropic, pillow, pytest` + `pip install -e . --no-deps` for slime.
  The agent path imports SGLang lazily, so it loads fine with no GPU stack.
- **Smoke test PASSED (CPU, no GPU / no E2B cluster):**
  - All agent modules import (`generate.py`, `sandbox.py`, the Anthropic adapter).
  - `tests/test_agent_trajectory.py` + `test_agent_adapters.py` → **21 passed**.
  - The `AnthropicAdapter` shim boots and exposes `/v1/messages`, `/v1/messages/count_tokens`,
    `/v1/models`, `/healthz` — exactly the endpoints `claude-code` dials back to.
  - The E2B SDK path reaches DNS resolution then fails (expected — no real gateway), confirming the
    SDK wiring is correct.
- **Not run:** the full GPU training (needs the cluster) and a real sandbox rollout (needs an
  E2B-compatible gateway + task images + the Node/claude-code tarballs + a dataset).

## What's needed to actually run it

1. **GPUs:** either the official 64×H100, or an edited single-node 8-GPU config (smaller batch /
   context / parallelism).
2. **Sandbox backend:** an E2B-compatible gateway (internal cluster recommended per the README) +
   the task Docker images pushed somewhere it can pull from.
3. **Data:** convert a public SWE dataset (SWE-Gym / R2E-Gym / SWE-bench Verified) into slime JSONL.
4. **Host tarballs:** Node 22 + `claude-code` npm tgz.
5. **Model checkpoint:** `Qwen3.6-35B-A3B` in HF + Megatron `torch_dist` format (or a smaller model
   for a single-node repro).
