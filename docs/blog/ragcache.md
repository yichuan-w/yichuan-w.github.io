---
title: "My Thoughts on RAGCache paper"
date: 2025-02-07
---

# My Thoughts on RAGCache paper

## Introduction

RAGCache is a new approach to improve the performance of RAG systems. From Xin Jin PKU Group.

In a high level idea, it caches some popular KV cache of documents in the CPU memory to avoid recomputing them.

## RAGCache's Comments

1. Their profiling results show that there is indeed skewness pattern in the document access. But I am not sure will this pattern still exist in the real production environment, like with the scale of the datastore increasing. I will be suprised if this pattern still exists.
2. Basicly, there idea is an extension version of Prefix-cache in SGLang, and they extend the idea to CPU, i am curious about the performance compared the new SGLang release [link](https://github.com/sgl-project/sglang/pull/2693) by Zhiqiang Xie and also related paper like [Pensive](https://arxiv.org/pdf/2312.05516) from Jinyang Li and Lingfan Yu. But consider thet RAGcache birth one year ago, I still think it is a good idea as some first papers to try Prefix Cache on CPU.
Also in Figure 17, they shows that PGDSF is better than LRU which is the eviction policy used in SGLang, I am not sure whther general use case can benefit from this.
3. In 5.2 Cache-aware Reordering, their conclusion is that the Order-Prioity score is $$\frac{cache-len}{computation-len}$$
This one is interesting, because I don't know which is better, SGLang simply use the length of the cache-len to compute the score, but RAGCache use the ratio of the cache-len to the computation-len.
4. Figure 10 seems interesting too, seems it can gain some performance improvement.


## Insights I gain

1. Skewness pattern in the document access is real. But not sure in large scale datastore, how's the pattern looks like.
2. Seems Reorder can always gain a lot from lots of paper like Shu Liu's Paper [TextSQL](https://arxiv.org/abs/2403.05821) and my own experience developing DLPM [DLPM](https://arxiv.org/pdf/2501.14312)