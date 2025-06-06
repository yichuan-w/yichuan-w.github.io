# Exploring Orak: A Unified Benchmark for LLM Agents in Games

I recently read the newly released paper [Orak: A Foundational Benchmark for Training and Evaluating LLM Agents on Diverse Video Games](https://arxiv.org/abs/2506.03610), which presents an exciting step forward in the ecosystem of evaluating LLM-based agents in games. The paper introduces **Orak**, a benchmark that unifies a wide range of video games through a standardized interface, allowing for consistent training and evaluation of multimodal and modular AI systems.

## Key Insights and Takeaways

### 1. Shifting Modalities: From Text to Vision and Video

Game evaluation using LLMs or MLLMs has progressed significantly — transitioning from purely text-based settings to incorporating images and even videos. This reflects a broader push toward grounding language models in richer, more realistic environments.

### 2. Rise of Agentic Workloads

The paper also highlights how **agentic workloads** are gaining traction. Rather than evaluating monolithic LLMs, there is growing interest in testing **modular LLM agents** — systems that combine planning, perception, memory, and action modules. Games provide an ideal testbed for these emerging paradigms.

### 3. Standardizing with MCP

One of the most important contributions of Orak is its use of the **Modular Centralized Protocol (MCP)** to unify interfaces across games. This abstraction enables scalable benchmarking and plug-and-play agent integration.

- [Unified MCP base server](https://github.com/krafton-ai/Orak/blob/release/src/mcp_game_servers/base_server.py#L44)
- [Game-specific MCP for *Baba Is You*](https://github.com/krafton-ai/Orak/blob/release/src/mcp_game_servers/baba_is_you/game/baba_is_you_env.py#L303)

### 4. Surprising Empirical Results

What surprised me most were the empirical findings: **vision wasn’t as beneficial as expected**. The authors note that in many games, crucial state information is provided through *textual abstractions* (e.g., inventories, off-screen items), rather than being visible on-screen. 

As shown in Table 6, agents with text-only inputs often performed comparably — or even better — than those with combined vision-text inputs.

In the case of *StarCraft II*, the evaluation pipeline leverages [`python-sc2`](https://github.com/BurnySc2/python-sc2), a Python wrapper built on top of Blizzard's official [s2client-api](https://github.com/Blizzard/s2client-api). Instead of relying on visual input, this library communicates directly with the game client using protobuf messages over WebSocket connections. It retrieves structured, real-time game state by issuing observation requests and receiving rich responses that include unit positions, resources, map features, and other key gameplay information — effectively bypassing the need for any screen parsing. ([See implementation](https://github.com/krafton-ai/Orak/blob/release/src/mcp_game_servers/star_craft/game/utils/bots.py#L44))

### 5. Opportunities for Vision-Only Agents

This raises an intriguing research question: *Can we build more capable vision-only agents that don’t depend on handcrafted textual state or complex APIs like MCP?*

From a generalization perspective, GUI-based agents that learn directly from screen pixels could be more transferable and broadly applicable — especially in environments where structured interfaces are unavailable.

## Final Thoughts

**Orak** offers a powerful framework for evaluating modular LLM agents in realistic and diverse environments. But its findings also challenge common assumptions — especially about the role of vision in gaming AI. 

Going forward, I believe there is great potential in pushing toward **simpler, vision-first agents** that learn directly from GUI interactions — perhaps bringing us closer to general-purpose embodied AI.

Let’s keep a close eye on how this space evolves. And I guess we can do some great research on the field, stay tuned!