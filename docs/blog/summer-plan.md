---
comments: true
---

# Opportunities in the Open-Source Agentic RL Landscape

*By Yichuan Wang*

*June 2026*

The RL-for-LLM space is moving fast, but the open-source infrastructure has not kept up. Per-domain RL recipes exist in fragments — a SWE-Bench harness here, a math reward function there — yet there is no widely adopted, end-to-end open-source pipeline that covers the full loop: domain-specialized RL training followed by on-policy distillation (OPD) to produce a deployable model. Building that infrastructure, paired with real data and reproducible recipes, would be one of the highest-impact contributions to the open-source RL community right now.

This post maps the current landscape: where the infrastructure gaps are, what each major lab has chosen, and where the concrete opportunities lie.

## From Single-Turn to Agentic RL

Most existing RL infrastructure was designed around single-turn optimization: generate a response, compute a reward, update the model. This paradigm is well-understood and reasonably well-supported by current frameworks.

The shift to multi-turn, agentic rollouts changes the picture significantly. When an agent interacts with an environment over multiple turns — browsing the web, writing and executing code, navigating a file system — the infrastructure requirements become qualitatively different.

**Verifiable rewards can take a long time.** In benchmarks like [Terminal-Bench](https://arxiv.org/abs/2504.01495), a single rollout might involve [optimizing NanoGPT training](https://www.tbench.ai/benchmarks/terminal-bench-2/train-fasttext) — the agent must iteratively modify training code and run it to completion before the reward signal (speedup achieved) can be computed. During this time, the trainer sits idle waiting for rollout results.

**KV cache management becomes a real question.** In single-turn RL, the KV cache from generation is discarded after each sample. In multi-turn agentic rollouts, the serving engine must decide whether to retain the KV cache across turns. Retaining it saves redundant computation but consumes GPU memory; discarding it is simpler but slower. This tradeoff is still under-explored in multi-turn RL settings.

**On-policy distillation (OPD) compounds these challenges.** When performing OPD — where the model generates rollouts on-policy and distills from a stronger model's corrections — the time per sample is already high. Add multi-turn environments and the variance in completion time grows further.

## The Rollout Variance Problem

Rollout time variance is one of the most underappreciated infrastructure challenges in agentic RL.

**Cross-domain variance.** When performing OPD across multiple domains simultaneously (e.g., math + code + web browsing), the time to complete a single rollout varies dramatically across domains. A math problem might resolve in seconds; a code debugging task might take minutes. This imbalance creates scheduling and batching challenges that most current frameworks do not handle well.

**Within-domain variance.** Even within a single domain, rollout lengths follow a heavy-tailed distribution. Math tasks already exhibit significant long-tail behavior. Agent tasks amplify this: some instances terminate in 3 turns while others run for 20+ turns. This variance creates GPU utilization problems — fast rollouts finish and sit idle while slow rollouts continue to consume resources.

Both of these are infrastructure challenges with no widely adopted solution. The frameworks that support OPD today — [Slime](https://github.com/NVIDIA/Megatron-LM/tree/main/examples/slime), [Miles](https://github.com/radixark/miles), [SkyRL](https://github.com/NovaSky-AI/SkyRL), and [KDFlow](https://github.com/kdflow) — each handle variance differently, and none have converged on a clearly dominant approach. GLM has its own internal OPD infrastructure but has not released it publicly.

## Sync vs Async RL: Industry Choices

The choice between synchronous and asynchronous RL training reveals interesting differences in engineering philosophy across labs.

**Synchronous (colocated) RL** places the trainer and rollout engine on the same set of GPUs, switching between training and inference phases. The advantage is simplicity and training stability. The disadvantage is the switching overhead between training and inference modes.

**Asynchronous RL** separates the trainer and rollout workers onto different machines, allowing rollout generation to overlap with gradient updates. This improves throughput but introduces staleness — the model being rolled out may be several gradient steps behind the model being trained.

Here is how major labs have chosen:

- **Kimi / GLM:** Synchronous, colocated RL. Domestic Chinese labs generally favor sync RL for training stability.
- **Tencent:** Asynchronous, but precision/convergence issues are not fully resolved. The priority has been to start training and iterate.
- **OpenAI:** Fully asynchronous. This enables maximum throughput but requires careful engineering to manage staleness.
- **Thinking Machine Lab (TML):** Pure REINFORCE — a simpler algorithmic choice that sidesteps some of the complexity of PPO-style methods.

**The elastic scheduling problem.** In async RL, balancing the ratio of trainer machines to rollout machines is non-trivial. As training progresses and the model improves, rollouts tend to get longer (the agent takes more turns, explores more). To maintain the same throughput, the system needs to elastically scale rollout workers — otherwise the trainer starves for data. This is a real infrastructure problem that few systems handle gracefully.

For sync colocated RL, the tradeoff is different: colocating saves machines but pays a switching cost. Separating trainer and rollout onto different machines avoids the switch but wastes resources during the phase when one side is idle.

## Precision and Stability

Precision issues in RL training deserve more attention than they currently receive.

The core problem is that every existing RL framework uses **separate models for serving (rollout) and training** — typically vLLM/SGLang for inference and FSDP/Megatron for training. These two systems use different model implementations, different kernels, and different numerical paths. As a result, the log-probabilities computed by the serving engine during rollout do not exactly match the log-probabilities computed by the trainer's forward pass on the same input. This **training-inference mismatch** is a significant source of instability.

A major contributor to this mismatch is [batch invariance](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/) — the same input can produce different outputs depending on batch composition and padding, due to floating-point non-associativity in attention and normalization kernels. When the serving engine and trainer handle batching differently, the mismatch compounds.

This is precisely why building RL on a **unified model** (e.g., TorchTitan RL, where the same model definition is used for both training and inference) is valuable. A unified model avoids many of these issues by construction: consistent model definitions, consistent kernel behavior, and easier control over numerical precision across the entire pipeline.

In practice, precision checking often functions more as a debugging and CI validation tool than a scientifically studied topic. There is not yet a solid body of work studying when and why the training-inference mismatch matters, what the failure modes look like, and how to mitigate them systematically. This is an open area.

## Anatomy of an RL Framework

Despite the apparent diversity of RL frameworks, the underlying architecture is remarkably similar across projects. A typical RL training system is assembled from:

1. **Training backend:** FSDP or Megatron-LM for distributed training.
2. **Inference/rollout backend:** vLLM or SGLang for fast generation.
3. **Weight transfer:** A mechanism to synchronize model weights from the trainer to the inference engine after each update.
4. **Orchestration:** Typically Ray, though some systems remove this dependency.

The training and inference backends are commoditized — everyone uses the same handful of options, and everyone struggles with the same integration pain. The real differentiation between frameworks lies in the **weight transfer design** (how fast, how often, how to handle partial updates) and the **scheduling/orchestration layer** (how to manage the lifecycle of training and rollout workers).

## Model Ladder

Choosing a base model for RL experiments requires a model with publicly available base (pre-trained, non-instruction-tuned) weights. The current landscape:

| Model Family | Available Base Sizes | Notes |
|---|---|---|
| **Qwen** | 2B, 4B, 9B, 27B, 35B | Qwen-235B did not release base weights |
| **GLM** | 100B | Base weights available |
| **DeepSeek** | 400B+ | Base weights available |
| **Kimi** | — | No base weights released after Kimi 2.5 |
| **Nemotron** | 30B | Good starting point for experiments |

A practical path is to start from smaller models (Qwen 2B–9B or Nemotron 30B) and scale up. Note that base models almost certainly need SFT before RL — running RL directly on a raw pre-trained model rarely works well.

## Data and Benchmark Landscape

The availability of open-source data and benchmarks varies significantly across domains:

**Well-established domains:**

- **SWE (Software Engineering):** Abundant open-source data. SWE-Bench and variants are widely used. Many groups have published recipes.
- **Math:** Standard and well-understood. Established benchmarks (GSM8K, MATH, etc.) with known recipes.
- **Deep Research:** Growing body of open-source data, though rollout cost is high (API calls to search engines, document retrieval).
- **Code Contests ([CodeContests](https://github.com/google-deepmind/code_contests)):** Relatively simple — most problems can be solved within 3–5 agent turns. SkyRL supports this benchmark with [a fully async training example](https://github.com/NovaSky-AI/SkyRL/blob/68ccdf57398b12647ac96ac66e837baa301a0d90/examples/train_integrations/harbor/run_codecontest_fully_async.sh).
- **Search Agent:** Nemotron and Qwen models work well for search tasks. Qwen appears to have better support going forward. See [Search-R1](https://arxiv.org/pdf/2601.06487) as an example.

**Emerging domains:**

- **Kernel Optimization ([KernelBench](https://arxiv.org/abs/2502.10517)):** Tasks involve optimizing ML kernels (e.g., ResNet kernel fusing). Not fully realistic production tasks, but excellent for RL research because they allow many iterations with long-horizon feedback loops. Related: [TritonForge](https://github.com/RLsys-Foundation/TritonForge) applies RL to Triton kernel writing, developed on the Slime framework. There is also recent work on [kernel post-training](https://arxiv.org/abs/2602.14293).
- **Terminal-Bench:** Agents interact with a full terminal environment. Long rollouts, complex state management. [ECHO](https://arxiv.org/abs/2605.24517) recently demonstrated strong results by learning world models for terminal agents, but has not open-sourced their code. [Endless Terminals](https://arxiv.org/pdf/2601.16443) is open-source and worth checking out and reproducing as a starting point for terminal agent RL.
- **Office / Finance Bench:** A rising domain. Hunyuan is actively training on these benchmarks.
- **Program Bench:** Claude Opus 4.8 performs very well, but open-source models lag significantly behind. This is an area where focused RL training could close the gap — see section below.

## Open-Source RL Framework Survey

No single open-source RL framework covers everything well. Here is the current state:

**[verl](https://github.com/volcengine/verl):** The most widely known framework, but hard to use in practice. Difficult to configure for fully async training, and integrating custom harnesses is painful. The [verl-recipe](https://github.com/verl-project/verl-recipe/tree/main) repository may provide usable recipes, but the core framework's flexibility is limited. [DeepSWE](https://www.together.ai/blog/deepswe) (Together AI) was built on verl but has a known bug in verl's distributed training path.

**[Slime](https://github.com/NVIDIA/Megatron-LM/tree/main/examples/slime) (Zhipu):** Provides solid OPD infrastructure but ships without data or recipes. If you bring your own data pipeline, the infrastructure works. Slime has also been used as the backend for TritonForge's kernel-writing RL experiments and has its own deep research recipe.

**[Miles](https://github.com/radixark/miles):** Supports OPD and has SWE-Bench job configurations. Currently [adding KL=0 support](https://github.com/radixark/miles/blob/main/examples/true_on_policy/README.md) for true on-policy training.

**[SkyRL](https://github.com/NovaSky-AI/SkyRL) / Harbor:** Supports SWE and Terminal-Bench tasks. The [SkyRL-Agent](https://arxiv.org/abs/2511.16108) paper demonstrates efficient multi-turn RL training. However, Harbor's training integration currently only supports the Terminus 2 harness, which is limited to bash interactions. It can be prompted to work in other settings but is not flexible. CodeContests is supported with a fully async example.

**[KDFlow](https://github.com/kdflow):** Specifically designed for OPD workflows. Worth watching as OPD becomes more important.

**[Prime RL](https://github.com/PrimeIntellect-ai/prime-rl) (Prime Intellect):** Supports LoRA-based RL and multi-tenant training — designed for enterprise scenarios where multiple users share infrastructure. No accompanying research paper yet.

**[SWE-RL](https://arxiv.org/pdf/2502.18449):** Interesting approach using self-play and async training, but the code is not open-sourced.

**Nemotron RL (NVIDIA):** May offer good out-of-the-box training pipelines. Worth evaluating for quick-start experiments.

**Reference: [GLM tech reports](https://z.ai/blog/glm-5.1)** provide useful context on training methodology choices, even though their exact infrastructure is not publicly available.

## The Tokenizer Problem: Why Arbitrary Harnesses Are Hard

A subtle but important issue prevents RL frameworks from supporting arbitrary evaluation harnesses: the tokenizer roundtrip problem.

When a model generates tokens during a rollout, those tokens live in "tokenizer space" — a sequence of token IDs. To interact with an external harness (a bash shell, a web browser, a code executor), these tokens must be decoded to text, sent to the harness, and the harness response must be tokenized back.

The problem: **decode followed by re-tokenize is not always identical to the original token sequence.** Edge cases arise with whitespace, newlines, and special characters. For example, two consecutive newline tokens might decode to text that, when re-tokenized, produces a single newline token. When logits or log-probabilities are computed over the original token sequence, this mismatch corrupts the RL training signal.

The workaround is to keep the entire interaction in tokenizer space and use a proxy layer that translates between tokenizer space and the harness's text interface. This adds complexity and is one reason why most frameworks only support a small set of pre-integrated harnesses rather than arbitrary environments.

[R2E](https://proceedings.mlr.press/v235/jain24c.html) is a data curation pipeline that extracts executable tasks from real-world repositories. Its output can be adapted to produce training data compatible with specific harness formats (e.g., converting to Harbor/SkyRL's Terminus 2 harness), partially working around the arbitrary-harness limitation.

## The Sandbox Problem

Agent RL requires sandboxed execution environments — the model's generated code must run somewhere safe. [Modal](https://modal.com) is currently the most practical option, with a clean API and good developer experience.

However, the infrastructure challenges introduced by sandboxing are under-studied. Each rollout may need its own isolated container, filesystem state, and network environment. At scale, this means thousands of concurrent sandboxes, each with potentially long-running processes. The resource contention this creates — especially in shared corporate GPU clusters — is a real operational problem that few papers or frameworks address directly.

## A Concrete Opportunity: Program Bench

One area that is ripe for focused effort is improving open-source model performance on programming benchmarks.

The current situation: Claude Opus 4.8 achieves strong results on program benchmarks, but open-source models are significantly behind. This gap suggests that targeted RL training could yield large improvements.

A practical approach:

1. **Start with Nemotron 30B** as the base model.
2. **Fix the harness first.** Use a well-tested harness like OpenHands or Claude Code as the evaluation environment. Validate that the data quality is acceptable before attempting to change the harness.
3. **SFT with thinking traces.** If the SFT stage requires chain-of-thought / thinking traces, use open-source models (e.g., GLM) to generate them, following the construction methodology used by the benchmark authors.
4. **Avoid MiniMax.** MiniMax models exhibit severe overfitting (poor out-of-distribution generalization). Most practitioners have moved away from using them.
5. **Use the same data for RL and SFT.** There is no strong reason to construct separate datasets — the same task distribution works for both stages.

## Landscape Summary

The table below summarizes concrete projects and their status across domains:

| Direction | Key Projects | Status |
|---|---|---|
| Search Agent | Nemotron, Qwen, [Search-R1](https://arxiv.org/pdf/2601.06487) | Qwen has better ongoing support |
| Kernel Optimization | [KernelBench](https://arxiv.org/abs/2502.10517), [TritonForge](https://github.com/RLsys-Foundation/TritonForge) | Active area, good for long-horizon RL |
| SWE | [DeepSWE](https://www.together.ai/blog/deepswe), SkyRL, Miles | DeepSWE has verl distributed bug; Miles has SWE-Bench job |
| Terminal Agent | SkyRL, [ECHO](https://arxiv.org/abs/2605.24517) | ECHO not open-sourced |
| Program Bench | Nemotron 30B + OpenHands/CC | Academic community starting to focus here |
| Deep Research | Slime (own recipe) | Rollout cost is high |
| Self-Play Async | [SWE-RL](https://arxiv.org/pdf/2502.18449) | Not open-sourced |
| Agent RL (general) | [SkyRL-Agent](https://arxiv.org/abs/2511.16108), [PolarAgent](https://arxiv.org/abs/2605.24220) | SkyRL-Agent is open |
| Kernel Post-Training | [Paper](https://arxiv.org/abs/2602.14293) | Emerging direction |

## Where the Opportunities Are

To summarize the key opportunities I see in this space:

1. **End-to-end OPD infrastructure with real recipes.** No open-source project currently offers a working pipeline from base model to improved model with reproducible results across domains. The first project to do this well — with real data, validated recipes, and clear documentation — will see wide adoption.

2. **Multi-turn / agentic RL optimization.** The shift from single-turn to multi-turn RL creates optimization opportunities at every level: KV cache management, rollout scheduling, trainer-rollout balancing, and sandbox lifecycle management.

3. **Elastic scheduling for async RL.** As rollouts get longer during training, the system must adapt. This is a systems problem with clear metrics (throughput, GPU utilization) and no dominant solution.

4. **Closing the sandbox gap.** Scalable, low-overhead sandboxing for agent RL is an infrastructure primitive that does not yet exist as a well-packaged open-source solution.

5. **Program bench for open-source models.** A focused effort starting from Nemotron 30B, with validated data and harness, could meaningfully close the gap with frontier closed-source models.

---

*This post reflects my current understanding of the RL infrastructure landscape as of June 2026. The space is evolving rapidly — corrections and additions are welcome in the comments.*
