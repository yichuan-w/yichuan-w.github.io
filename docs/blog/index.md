---
title: Blog Posts
---

# Blog Posts

Here are my thoughts and comments on various research papers and topics in systems and ML, along with practical lessons learned from my development experience. Posts are grouped by topic — pick the bucket you care about.

## Research Vision

Where I think the field is going, and what is worth building.

- [Rethinking the Search Stack for the AI Era](build-search-engine-for-AI.md) — Why we need to move beyond traditional search APIs and build retrieval stacks native to LLM agents and deep research.

## Production & Entrepreneurship Thoughts

Business and productization angles on ML systems.

- [Rethinking RL as a Service and the Position of RL Infrastructure](rethinking-rl-as-a-service.md) — May 2026. RL infrastructure is a compelling systems direction, but RL as a generic enterprise service is still a hard business today.

## Tech Development Experience

Hands-on lessons, reproduction logs, and tuning recipes from building real systems.

- [Mastering DiskANN: Practical Lessons from Building Large-Scale Vector Search Systems](How-to-build-diskANN-perfectly.md) — Dec 11, 2025. Compression rates, hidden distance-metric traps, and tuning recipes from LEANN and DS-serve.
- [Lessons Learned in Development — LEANN Project](lessons_learned_in_dev_leann.md) — Chunk overlap strategies, data format choices, and embedding model comparisons for RAG.

## Paper Reads

Notes and takeaways from papers I have read.

- [Finally, a Retriever That Can Actually Reason (ReasonIR)](reasonir.md) — Retrieval for long, reasoning-heavy queries instead of short keyword lookups.
- [Qwen3 Embedding: Advancing Text Embedding and Reranking Through Foundation Models](qwen3embedding.md) — Multi-stage training, synthetic data, and the 0.6B/4B/8B trade-off space.
- [My Thoughts on RAGCache](ragcache.md) — February 7, 2025. Caching popular document KV cache in CPU memory to avoid recomputation.
- [Exploring Orak: A Unified Benchmark for LLM Agents in Games](game_eval.md) — Unifying video games behind one interface for training and evaluating agents.

## Misc

Longer running logs and notes that do not fit the buckets above.

- [Opportunities in the Open-Source Agentic RL Landscape](summer-plan.md) — June 2026. The missing end-to-end open-source pipeline: domain-specialized RL plus on-policy distillation, and where the highest-impact contributions are.
- [Defending Against the Training–Inference Numeric Mismatch in RL (Especially Linear Attention) — and Whether It Helps Async RL](GDN-train-inference-mismatch-asyncRL.md) — August 2026. Making trainer/generator log-probs bit-exact for Gated DeltaNet, and why the guarantee quietly stops mattering under async RL.

## About

This blog is where I share my thoughts on research papers, system design, and technical insights from my work in machine learning systems and high-performance computing. I also document practical lessons learned from building real-world systems, including the challenges and surprises encountered during development.
