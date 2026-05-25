---
comments: true
---

# Rethinking RL as a Service and the Position of RL Infrastructure

*By Yichuan Wang*

*May 2026*

My current view is simple: **RL as a service is probably not a good business model at this exact time point**.

This does not mean RL, post-training, or RL infrastructure is unimportant. Quite the opposite. I think RL infrastructure is one of the most interesting systems areas to work on. But the business case for selling "RL as a service" to enterprise users is much weaker than many people assume.

## The Enterprise ROI Problem

Suppose I am an enterprise user. I want to improve model capability in my own domain using my own data. What is the highest-ROI path today?

In most cases, it is still:

> prompt engineering, RAG pipelines, and specialized agent harnesses around frontier models.

This is the most practical way to adapt models to a specific workload, data source, and product environment. Compared with harness engineering on top of frontier models, post-training has several drawbacks.

First, base model ability still matters a lot. The gap between open-source and closed-source frontier models remains significant for many enterprise workloads. RL or post-training on a weak prior usually does not magically produce a strong result.

Second, frontier models change too quickly. A new model, or a meaningfully better variant, appears roughly every few weeks. Enterprises can often get a large quality jump by switching to a better frontier model and adjusting the harness, rather than running a new post-training workflow.

Third, there are multiple strong model providers. This gives users optionality. If the goal is production quality, it is often easier to compare several frontier APIs and adapt the application layer than to commit to a custom post-trained model.

## Post-Training Is Still Too Slow

The second issue is speed.

Post-training a model is still not fast enough for many enterprise iteration loops. It is usually time-consuming, operationally complex, and hard to integrate into normal product development. An "RL as a service" business becomes much more attractive only if the post-training loop becomes dramatically faster, maybe by 100x.

This is why I think lightweight continual learning pipelines are a very good research direction. If the cost and latency of post-training change fundamentally, the business equation also changes.

Today, however, non-parametric methods are usually the fastest and cheapest adaptation strategy. Skills, RAG, memory, tool use, and agent harnesses are all ways of changing model behavior without changing model weights.

To some extent, these methods can also be viewed as a kind of test-time or semi-parametric adaptation. They change the context, retrieval state, tool state, or even KV-cache behavior during inference. The boundary between "post-training" and "inference-time adaptation" may become blurrier over time.

## The Business Model Is Hard

The third question is: how does an RL-as-a-service company make money?

I do not think a Tinker-like product is naturally a great enterprise product today. Researchers may pay to try different RL ideas, run experiments, and prototype new training algorithms. But most real enterprise users will be skeptical because the ROI is low compared with prompt engineering, RAG, and agent design.

The same logic applies to many cloud and data companies. At the current point, companies like Databricks and Snowflake seem to spend more energy designing agents, optimizing product workflows, and improving the service experience for their own customers. In other words, they are doing application and harness engineering around models.

They are not obviously the ideal customers for a general-purpose RL-as-a-service platform.

## When Could This Business Work?

There are still cases where post-training-as-a-service can make sense.

The first case is sensitive data. If a company has extremely sensitive internal data and does not want to share it with OpenAI, Anthropic, Google, or another frontier model provider, then a special post-trained model becomes more attractive.

The second case is inference cost. Frontier model inference is still expensive. If a company serves a high-volume workload, a smaller post-trained model that matches the target domain can reduce cost. In that case, the value is not only quality improvement, but also serving economics.

These two cases are real. But they are narrower than the broad claim that every enterprise will want RL as a service.

## So Why Work on RL Infrastructure?

Even though I have written a lot of pessimistic thoughts about post-training as a service, I still think RL and post-training infrastructure are worth working on.

The first reason is a lesson I learned from Tianqi Chen: build a complex pipeline that is useful enough for yourself. If the infrastructure directly enables your own research, iteration speed, and systems understanding, it is already valuable.

The second reason is that post-training is definitely useful inside frontier labs. Large teams run many expert models, RL pipelines, online policy distillation pipelines, and large-scale data/rollout systems. Smaller teams are also continuously using PPO, REINFORCE, and related methods to train more general agents.

Many systems questions are still not fully solved:

- How do we handle train-inference mismatch?
- How should training, rollout, and evaluation autoscale together?
- How should sandbox and environment systems be optimized?
- How do we make agent rollouts reliable, cheap, and reproducible?
- What is the right abstraction for data, reward, environment, and policy iteration?

There is still a lot of room to improve.

If we eventually run out of easy static data, interaction data will matter much more. At that point, the ability to run scalable, efficient, and reliable RL pipelines may become a core advantage.

So my view is not "RL infra is useless." My view is:

> RL infrastructure is a very important research and systems direction, but RL as a generic enterprise service is not yet an obviously good business.

The research opportunity is real. The business model just needs a much sharper wedge.
