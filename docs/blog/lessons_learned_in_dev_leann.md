---
title: Lessons Learned in Development - LEANN Project
---

# Lessons Learned in Development: LEANN Project

Here are my thoughts and comments on various research papers and topics in systems and ML, along with practical lessons learned from developing the LEANN project.

## Lessons1: Chunk Overlap Size in RAG

### Key Finding

**Chunk overlap size really matters** in Retrieval-Augmented Generation (RAG) systems.

### Effects of Chunk Overlap Size

#### Too Small Overlap

- ❌ **Risks cutting off important context**, reducing retrieval accuracy
- ❌ **Leads to fragmented chunks**, weaker embeddings, and lower generation quality  
- ⚠️ **Often causes missing or inconsistent answers** in downstream tasks like QA

#### Too Large Overlap

- ❌ **Causes high redundancy** and increases storage and compute cost
- ❌ **May reduce retrieval diversity** due to overlapping content dominating top-k results
- ⚠️ **Adds latency** without proportional gains in performance

### Conclusion

Finding the optimal chunk overlap size is crucial for RAG system performance. The overlap should be large enough to preserve important context across chunk boundaries, but not so large that it creates excessive redundancy and computational overhead.

## Lessons2: Data Format Really Matters

### Key Finding

**Data format and metadata preservation** are critical when chunking documents for RAG systems.

### The Problem

After chunking, key information often gets lost because important metadata may lie at the beginning of paragraphs. When documents are split into chunks, crucial context like contact names, document sources, or other metadata can be separated from the relevant content.

### The Solution

When applying splitters using LlamaIndex, **always attach important metadata at the beginning of each chunk** to ensure critical information is preserved.

### Example Implementation

```python
text_splitter = SentenceSplitter(chunk_size=192, chunk_overlap=64)

# Convert Documents to text strings and chunk them
all_texts = []
for doc in all_documents:
    # Split the document into chunks
    nodes = text_splitter.get_nodes_from_documents([doc])
    for node in nodes:
        # Always prepend metadata to preserve important context
        text = '[Contact] means the message is from: ' + doc.metadata["contact_name"] + '\n' + node.get_content()
        all_texts.append(text)
```

### Key Takeaway

By keeping the contact name (or any important metadata) always appearing before the chat history in each chunk, we ensure that the important information is attached and preserved throughout the retrieval process.

## Lessons3: OpenAI Embedding Model Performance Issues

### Key Finding

**OpenAI's embedding model shows surprisingly poor performance** compared to older, open-source alternatives in specific retrieval scenarios.

### The Problem

When comparing embedding models for retrieval tasks, OpenAI's embedding model consistently fails to identify the correct document even when the intent is clear, while older models like Facebook's Contriever perform correctly.

### Evidence from LEANN Project

Reference: [Embedding Model Comparison Code](https://github.com/yichuan-w/LEANN/blob/main/docs/code/embedding_model_compare.py)

#### Test Scenario

```python
conference_text = "[Title]: COLING 2025 Conference\n[URL]: https://coling2025.org/"
browser_text = "[Title]: Browser Use Tool\n[URL]: https://github.com/browser-use"

# Two queries with same intent but different wording
query1 = "Tell me my browser history about some conference i often visit"
query2 = "browser history about conference I often visit"
```

#### Expected vs Actual Results

- **Expected**: Both queries should retrieve `conference_text` (the conference-related document)
- **Facebook/Contriever** (4-year-old model): ✅ **Always correct**
- **OpenAI Embedding**: ❌ **Always wrong**

### Key Takeaway

This surprising result suggests that **OpenAI's embedding model training techniques may not be as advanced as expected** for certain retrieval tasks, especially when compared to specialized open-source alternatives.

*Credit: This finding was originally discovered by [@andylizf](https://github.com/andylizf)*

## My Experience

### Development Journey

Working on the LEANN project has been an eye-opening experience that challenged many of my assumptions about modern AI systems. Here are some key insights from my development journey:

### Key Learnings

1. **Don't assume newer = better**: The OpenAI embedding model performance issue was particularly surprising and taught me to always benchmark and validate assumptions.

2. **Data preprocessing is crucial**: The metadata preservation lesson came from hours of debugging why retrieval wasn't working as expected.

3. **Chunking strategy matters**: The overlap size experiments revealed how subtle parameter choices can dramatically impact system performance.

### Technical Challenges

- **Embedding model selection**: Finding the right balance between performance and efficiency
- **Data format optimization**: Ensuring metadata preservation across different chunking strategies
- **System integration**: Making different components work together seamlessly

### Future Directions

Based on these lessons, I'm exploring:
- More sophisticated chunking strategies
- Alternative embedding models and training approaches
- Better evaluation metrics for retrieval systems

---

*These lessons represent real-world insights from building production RAG systems. The findings may challenge common assumptions in the field.* 