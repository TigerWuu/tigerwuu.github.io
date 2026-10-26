---
title: "(RSS2023)Learning Fine-Grained Bimanual Manipulation with"
tags: [paper]
---
Low-Cost Hardware

- website
    
    https://tonyzhaozh.github.io/aloha/
    

# Background knowledge

- Conditional VAE (CVAE)  → [[Techniques/Machine Learning/Variational Autoencoder (VAE)|Variational Autoencoder (VAE)]]
    - <u>***Schematic***</u>
        
        ![[assets/image 116.png]]
        
    - Auto encoder
    - Variational Autoencoder
- ResNet  → [[Concepts/ResNet|ResNet]]
    - Solve for gradient vanishment
    
    https://blog.csdn.net/weixin_43999691/article/details/117928537
    

# Scenario

Present a **low-cost system** that performs **end-to-end imitation learning** directly from real demonstrations, collected with a custom teleoperation interface. 

- **low-cost system → ALOHA (< 20k US dollar)**
    - **ALOHA schematic**
        
        ![[assets/image 117.png]]
        
- **end-to-end imitation learning → Action Chunking Transformer(ACT)**
    - Imitation learning has several defects, such as the compounding error problem
    - Action chunking comes from psychology

# Theory & Technique

- Contributions
    1. A **low-cost system** for learning fine manipulation, comprising a teleoperation system and a novel imitation learning algorithm.
    2. The **imitation learning algorithm, Action Chunking with Transformers (ACT)**, is capable of learning precise, closed-loop behavior and outperforms previous methods significantly. 
    3. Propose a **temporal ensemble** method to improve the smoothness of the actions and avoid the discrete switch between executing the actions.
- Design
    - Action chunking transformer
        - CVAE
        - Transformer
    - Temporal Ensemble
        - fusing the past 4 actions with an exponential weighting scheme

# Representative Schematic

- ACT architecture
    
    ![[assets/image 118.png]]
    
    - CNN → ResNet18
    - PosEmb → 2D sinusoidal position embedding
    - z → sampled from **z_mean** and **z_var**
- Concept of temporal ensemble
    
    ![[assets/image 119.png]]
    
- <u>***Detailed ACT architecture***</u>
    
    ![[assets/image 120.png]]
    

# Simulation & Experiment

The model has around 80M parameters, and we **train from scratch** for each task. The training takes
around 5 hours on a single 11G RTX 2080 Ti GPU, and the inference time is around 0.01 seconds on the same machine.

- Simulator: MuJoCo
- Dataset: 50 demonstrations for each task
- Real-world tasks
    
    ![[assets/image 121.png]]
    
- Ablation study
    
    ![[assets/image 122.png]]
    
    - TE: temporal ensemble

# My Two Cents

1. not VLA, no language instructions
    
    → so the follow-up VLA, <u>***Octo,***</u> leverage this idea and diffusion policy.