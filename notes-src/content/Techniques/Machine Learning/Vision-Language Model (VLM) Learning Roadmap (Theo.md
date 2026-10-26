---
title: "Vision-Language Model (VLM) Learning Roadmap (Theory-Only)"
tags: [concept]
---

### 1. Probability and Information Theory

- Probability distributions (Gaussian, categorical, etc.)
- Bayes’ theorem
- Entropy, KL divergence, mutual information
- Maximum likelihood estimation (MLE)

### 2. Linear Algebra & Optimization

- Vectors, matrices, dot product, eigendecomposition
- Gradients, Jacobians, Hessians
- Convex optimization basics
- Stochastic gradient descent (SGD), Adam

### 3. Core Deep Learning Theory

- Perceptron, MLPs, backpropagation
- Loss functions: cross-entropy, contrastive loss, triplet loss
- Regularization: dropout, weight decay, batch norm
- Overfitting, generalization, VC-dimension (optional)
- Universal approximation theorem

### 4. Representation Learning

- Embedding spaces (word, sentence, image embeddings)
- Autoencoders & Variational Autoencoders (VAE)
- Metric learning and similarity learning
- Multimodal embeddings and alignment

### 5. Transformer Architecture

- Attention mechanism (Scaled Dot-Product Attention)
- Self-attention vs cross-attention
- Positional encoding
- Encoder-decoder architecture
- Pre-norm vs post-norm, residual connections

### 6. Vision Transformer (ViT)

- Patching and linear projection of image tokens
- Learned vs fixed positional embeddings
- Contrast with CNNs (no convolution)
- Use of CLS token for classification

### 7. Language Models

- Tokenization (BPE, WordPiece)
- Masked language modeling (MLM – BERT)
- Causal language modeling (CLM – GPT)
- Next sentence prediction, permutation LM (XLNet)
- Pretraining vs finetuning vs instruction tuning

### 8. Multimodal Learning Theory

- Modality-specific encoders (e.g., ViT for vision, BERT for text)
- Fusion techniques:
    - Early fusion (input-level)
    - Late fusion (output-level)
    - Cross-modal attention (e.g., Flamingo, ViLBERT)
- Shared latent space alignment
- Contrastive learning (e.g., CLIP's InfoNCE loss)

### 9. Self-Supervised Learning

- Contrastive learning (SimCLR, MoCo, BYOL)
- Masked image modeling (MAE, BEiT)
- Joint image-text contrastive objectives
- Image captioning as self-supervision

### 10. Key Vision-Language Models (Architecture Theory)

- CLIP: dual-encoder + contrastive learning
- ViLBERT / LXMERT: multi-stream architecture
- UNITER / VisualBERT: single-stream
- Flamingo: frozen language model + visual adapter
- BLIP / BLIP-2: bootstrapped pretraining + Q-Former
- GPT-4V: unified large model for both vision and language

### 11. Fine-Tuning and Adaptation Techniques

- Prompt tuning / Prefix tuning
- Adapter layers
- Low-rank adaptation (LoRA)
- Alignment via reinforcement learning (RLHF-style)

### 12. Evaluation & Metrics

- Image-text retrieval: Recall@k, mAP
- Captioning: BLEU, METEOR, CIDEr, SPICE
- VQA: accuracy, binary matching
- Robustness, bias, out-of-domain generalization

---

## 📚 Recommended Reading Resources (with Links)

| Topic | Resource & Link |
| --- | --- |
| **Deep Learning Foundations** | 📘 *Deep Learning* by Ian Goodfellow – [Book Link](https://www.deeplearningbook.org/) |
| **Transformer Theory** | 📄 *Attention Is All You Need* (Vaswani et al., 2017) – [arXiv Link](https://arxiv.org/abs/1706.03762) |
| **Vision Transformer** | 📄 *An Image is Worth 16x16 Words* (Dosovitskiy et al., 2020) – [arXiv Link](https://arxiv.org/abs/2010.11929) |
| **CLIP Theory** | 📄 *Learning Transferable Visual Models From Natural Language Supervision* (Radford et al., 2021) – [arXiv Link](https://arxiv.org/abs/2103.00020) |
| **Multimodal Learning** | 📄 *A Survey of Vision-Language Pretrained Models* (Li et al., 2022) – [arXiv Link](https://arxiv.org/abs/2202.10936) |
| **Self-Supervised Learning** | 📄 *A Simple Framework for Contrastive Learning of Visual Representations* (SimCLR, Chen et al., 2020) – [arXiv Link](https://arxiv.org/abs/2002.05709) |
| **BLIP-2** | 📄 *BLIP-2: Bootstrapped Language-Image Pretraining* (Li et al., 2023) – [arXiv Link](https://arxiv.org/abs/2301.12597) |