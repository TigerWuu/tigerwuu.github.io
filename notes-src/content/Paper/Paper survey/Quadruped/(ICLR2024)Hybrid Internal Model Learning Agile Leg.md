---
title: "(ICLR2024)Hybrid Internal Model: Learning Agile Legged Locomotion with Simulated Robot Response"
tags: [paper]
---

- website
    
    https://junfeng-long.github.io/HIMLoco/
    

# Background knowledge

- Contrastive learning  → [[Concepts/Contrastive Learning|Contrastive Learning]]
    - SwAV
        
        https://blog.csdn.net/qq_36560894/article/details/124579191
        
- Mimic learning
- Internal model control (IMC)
    - Diagram
        
        ![[assets/image 53.png]]
        
- Sinkhorn-Knopp algorithm
    - optimal transportation problem
- t-SNE  → [[Techniques/Mathematics/Linear Algebra/PCA|PCA]]

# Scenario

However, the sensors of most legged robots can only provide partial and noisy observations, making the estimation particularly challenging, especially for external states like terrain frictions and elevation maps. Inspired by the classical Internal Model Control principle, we consider these external states as **disturbances** and introduce **Hybrid Internal Model (HIM)** to estimate them according to the response of the robot.

- **Hybrid Internal Model (HIM) → refer to the concept of internal model control**
- **Disturbances → elevation maps, ground friction**

# Theory & Technique

- Contributions
    1. Use **contrastive learning** to optimize the embedding to be close to the robot’s successor state, in which the response is naturally embedded.
    2. Estimate the external states, such as **disturbances** and **velocity**, using a hybrid internal model based on the robot's response.
    3. It only requires 1 hour of training on an RTX 4090 to enable a quadruped robot to traverse any terrain under any disturbances.
- Design: Two-step optimization
    - PPO optimization
    - Hybrid internal optimization
        - Using **contrastive learning** to separate embedding distributions from **different disturbances,** and cluster embedding distributions into **prototypes**
            
            → The more embeddings are separated, the better PPO learned
            
            - **Contrastive learning →** SwAV
                - Induction
                    1. Inner product to each prototype, calculate the probability of this embedding belonging to this prototype by going through a **softmax function**
                        
                        ![[assets/image 54.png]]
                        
                    2. Calculate target probability by **Sinkhorn-Knopp algorithm** and calculate the **cross-entropy** loss function that we want to minimize
                        
                        ![[assets/image 55.png]]
                        
            - **Different disturbances→**terrains, friction,…
            - **Prototypes →** 16 in total are used, like different categories

# Representative Schematic

- IMC vs. HIM
    
    ![[assets/image 56.png]]
    
- HIM framework
    
    ![[assets/image 57.png]]
    
    - blue: pull closer
    - grey: push away

# Simulation & Experiment

- Terrain curriculum
- Domain randomization
- tsne representation
    - Why do we need a large separation in latent space? for training
    - HIM vs. DreamWaQ
    
    ![[assets/image 58.png]]
    

- Prototype ablation study
    
    ![[assets/image 59.png]]