---
comments: true
---

# Rethinking the Search Stack for the AI Era

*By Yichuan Wang*

I strongly agree with [Rulin Shao](https://twitter.com/RulinShao) (and it was an amazing collaboration here 👏). We really need to rethink the traditional search stack in the age of LLMs, search agents, and deep research.

## The Problem with Today's Search Pipelines

Today’s “search agent” pipeline is frankly messy:
> URL discovery → HTML parsing → reader LLM/VLM → summarization → agent reasoning.

This is far from an optimal design. The core issue is a misalignment between classic search engines and LLM-native agents. Worse, this pipeline is extremely hard to scale for Reinforcement Learning (RL) rollouts, where QPS requirements are even higher.

*Rumor has it that the Qwen team is already using in-house data for efficient search in RL training.*

## Structural Misalignment

This misalignment is structural.
*   **Google** will never fully open its Search API due to ads and business incentives.
*   **Bing and DuckDuckGo** expose APIs, but quality often lags.

As a result, many third-party providers (e.g., Serper) rely on IP/proxy-based scraping of Google, which inherently leads to higher latency, lower throughput, and higher cost than first-party search infrastructure.

## Why Efficiency Matters

This is why Google still hasn’t been fully replaced by search-augmented LLMs. Not because LLMs aren’t powerful, but because efficiency matters. Google’s response time is still orders of magnitude faster than most agent-based pipelines.

**Solving search efficiency is a core problem for 2026.**

## Rebuilding the Stack

It’s time to rebuild an LLM-native search stack. This is exactly in the direction [Rulin Shao](https://twitter.com/RulinShao) pointed out (and big thanks to [Liana Patel](https://twitter.com/lianapatel_) for the inspiration as well — we should also check out Lotus, which she built, a very useful tool for context engineering in search agents).

We should build in-house, LLM-native datastores that reshape the stack from the ground up. The goal is to collapse the fragile pipeline into direct, high-quality retrieval over web-scale text and images, with minimal latency and cost.

We’re already seeing this trend from companies like [Exa](https://exa.ai/). Academically, there’s huge room to contribute to systems design, indexing, data curation, and evaluation (like building an offline efficient Arxiv library).

Because web data follows a power law, data collection is often much easier than people expect. **[DS-Serve](https://berkeley-large-rag.github.io/RAG-DS-Serve/)** is our initial step in this direction.

This is where search is heading 🚀
