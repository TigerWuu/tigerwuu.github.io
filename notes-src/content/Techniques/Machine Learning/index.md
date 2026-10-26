---
title: "Machine Learning"
tags: [topic]
---

# Resources

- 李弘毅 ML
    
    [Hung-yi Lee](http://speech.ee.ntu.edu.tw/~tlkagk/courses_ML20.html?fbclid=IwAR1q0lg1yZ3jQ7ZPsr5BXbmshAess4AGIyvhSO1yZFdEt_-YL7jqSLI-XfE)
    
- AI coding
    
    https://medium.com/@simon3458/gemini-cli-google-adk-ai-agent-9c91d6e102c5
    

---

# Optimizer

# Loss

- Cross entropy
    - $q$ is the predicted distribution
    - $p$ is the true distribution
    
    $$
    \begin{align*}
    
    H(p, q) = - \sum_x p(x) \log q(x)
    
    \end{align*}
    $$
    
- Binary cross-entropy (BCE)
    - Binary case of cross entropy
- Kullback–Leibler divergence (KL divergence)
    
    $$
    \begin{align*}
    
    D_{\mathrm{KL}}(p \| q) = \sum_x p(x) \log \frac{p(x)}{q(x)}
    
    \end{align*}
    $$
    
    - Relationship Between KL divergence and cross entropy
        
        https://clay-atlas.com/blog/2024/12/02/cn-difference-kl-divergence-cross-entropy/
        
        You can express KL divergence in terms of cross-entropy:
        
        - $q$ is the predicted distribution
        - $p$ is the true distribution
        
        $$
        \begin{align*}
        
        D_{\mathrm{KL}}(p \| q) 
        & = \sum_x p(x) \log \frac{p(x)}{q(x)} \\
        & = \sum_x p(x) \left[ \log p(x) - \log q(x) \right] \\
        & = \sum_x p(x) \log p(x) - \sum_x p(x) \log q(x)\\
        & = H(p, q) - H(p)
        
        \end{align*}
        $$
        
        where
        
        $$
        \begin{align*}
        
        H(p) = - \sum_x p(x) \log p(x)
        
        \end{align*}
        $$
        
        is the entropy of the true distribution.
        
        where 
        
        $$
        I(x) = -\log p(x)
        $$
        
- Triplet loss
- Negative log likelihood (NLL)
- NCEloss

# Model

## Generation Model

[[Techniques/Machine Learning/Generative Adversarial Network (GAN)|Generative Adversarial Network (GAN)]]

[[Techniques/Machine Learning/Autoregressive|Autoregressive]]

[[Techniques/Machine Learning/Diffusion model|Diffusion model]]

[[Techniques/Machine Learning/Flow Matching|Flow Matching]]

[[Techniques/Machine Learning/Variational Autoencoder (VAE)|Variational Autoencoder (VAE)]]

- Famous text-to-image generation model
    - Dalle
    - Midjourney
    - Stable diffusion

## Convolutional Neural Network (CNN)

- ResNet
    
    https://blog.csdn.net/weixin_43999691/article/details/117928537
    
- U-Net
    
    https://tomohiroliu22.medium.com/%E6%B7%B1%E5%BA%A6%E5%AD%B8%E7%BF%92paper%E7%B3%BB%E5%88%97-05-u-net-41be7533c934
    
    https://hackmd.io/@tarostudent99/BkNl8VVJu
    

## Recurrent Neural Network (RNN)

- Recurrent neural network (RNN)
    - Elman network
    - Jordan network
- Bidirectional Recurrent neural network
- Long short-term memory (LSTM)
    - Dealing with the ***gradient vanishing*** problem (not gradient explode) induced by RNN
        - forget gate
        - input gate
        - output gate
- Gated recurrent unit (GRU)
- Attention-based network
- Backpropagation through time (BPTT)
    
    https://chih-sheng-huang821.medium.com/%E9%81%9E%E6%AD%B8%E7%A5%9E%E7%B6%93%E7%B6%B2%E8%B7%AF-recurrent-neural-network-back-propagation-through-time-8d49ebf04b77
    
- Truncated backpropagation through time (TBPTT)

## PointNet

https://blog.csdn.net/CV_Autobot/article/details/128527145

- PointNet
- PointNet++
- F-PointNet

# Meta-Learning

[[Techniques/Machine Learning/Meta-Learning|Meta-Learning]]

https://www.youtube.com/watch?v=rTqmWlnwz_0&t=3s&ab_channel=Hung-yiLee

<u>***Content:***</u>

- Meta learning
    - Maml
    - Reptile

# Auto Encoder

- Auto Encoder (AE)
- Variational Auto Encoder (VAE)
    
    https://alu2019.home.blog/2021/05/07/math-ai-variational-autoencoder-vae-bian-fen-zi-b/
    
- Beta-Variational Auto Encoder ($\beta$-VAE)
- Conditional Variational Auto Encoder (CVAE)
    
    https://medium.com/data-science/understanding-conditional-variational-autoencoders-cd62b4f57bf8
    
- Vector-Quantized Variational AutoEncoder (VQ-VAE)
    
    https://medium.com/ai-academy-taiwan/%E5%B8%B6%E4%BD%A0%E8%AA%8D%E8%AD%98vector-quantized-variational-autoencoder-%E7%90%86%E8%AB%96%E7%AF%87-49a1829497bb
    

# Contrastive learning

https://u9534056.medium.com/%E9%9D%A2%E8%A9%A6%E5%BF%85%E5%82%99-%E5%B0%8D%E6%AF%94%E5%AD%B8%E7%BF%92-contrastive-learning-%E4%B8%BB%E6%B5%81%E6%96%B9%E6%B3%95%E4%B8%80%E8%A6%BD-bddf2afc5e5f

- SwAV
    
    https://blog.csdn.net/qq_36560894/article/details/124579191
    

# Stable Diffusion

- General image generation model
    - text encoder → generation model →decoder
        
        ![[assets/image 19.png]]
        
    - stable diffusion → using diffusion model as generation model
- Diffusion model
    
    https://www.youtube.com/watch?v=azBugJzmz-o&list=PLJV_el3uVTsNi7PgekEUFsyVllAJXRsP-&index=6&ab_channel=Hung-yiLee
    
- VAE
- UNet
- CLIP
    
    https://www.youtube.com/watch?v=AKwl3t811tA&ab_channel=%E9%99%B3%E7%B8%95%E5%84%82VivianNTUMiuLab
    

# Transformer

- RNN
- Seq2Seq
    
    Uniform structure : input vector → encoder → decoder → output vector
    
    - Decoder
        1. Autoregressive
        2. Non-autoregressive
    
    <aside>
    💡
    
    **Transformer** is a kind of Seq2Seq
    
    </aside>
    
    https://youtu.be/n9TlOhRjYoc?si=l_Avo-ZtiXjjMnL5
    
- Self-attention
    - Multi-head self-attention
    - Masked self-attention
    - Positional encoding
    
    https://youtu.be/hYdO9CscNes?si=osIOj6c45-PGThgR
    
    https://www.youtube.com/watch?v=gmsMY5kc-zw&ab_channel=Hung-yiLee
    

## Natural Language Processing

- Bag of words
    
    https://medium.com/@derekliao_62575/nlp%E7%9A%84%E5%9F%BA%E6%9C%AC%E5%9F%B7%E8%A1%8C%E6%AD%A5%E9%A9%9F-ii-bag-of-words-%E8%A9%9E%E8%A2%8B%E8%AA%9E%E8%A8%80%E6%A8%A1%E5%9E%8B-3b670a0c7009
    
- Word vectors
    
    https://medium.com/royes-researchcraft/%E8%87%AA%E7%84%B6%E8%AA%9E%E8%A8%80%E8%99%95%E7%90%86-1-word-to-vector-%E5%AF%A6%E4%BD%9C%E6%95%99%E5%AD%B8-99b668faa296
    
    - One-hot encoding
        - We cannot differentiate the relationship between each word
        - The vector is too sparse
    - Word embedding
        - CBOW: predict the middle word
        - Skip-gram: predict the former and the latter word
        
        https://www.youtube.com/watch?v=X7PH3NuYW0Q&ab_channel=Hung-yiLee
        

# Robot Learning

## Imitation learning

- Action Chunk Transformer
    
    https://blog.csdn.net/v_JULY_v/article/details/135454242
    

## Diffusion policy

https://zhuanlan.zhihu.com/p/670555655

## Vision Language Action (VLA)

- Octo
    
    https://blog.csdn.net/kebijuelun/article/details/147592582
    
- Groot N1.5
    
    https://research.nvidia.com/labs/gear/gr00t-n1_5/
    
- OpenVLA
- Pi0
- RT-X

## Vision Language Model (VLM)

https://tomohiroliu22.medium.com/66%E5%80%8B%E8%A6%96%E8%A6%BA%E8%AA%9E%E8%A8%80%E6%A8%A1%E5%9E%8Bvlm%E7%B6%93%E5%85%B8%E8%AB%96%E6%96%87-f44f280a7f62

[[Techniques/Machine Learning/Vision-Language Model (VLM) Learning Roadmap (Theo|Vision-Language Model (VLM) Learning Roadmap (Theory-Only)]]

## Fine-Tuning

- LoRa
    
    https://axk51013.medium.com/llm%E5%B0%88%E6%AC%84-all-about-lora-5bc7e447c234