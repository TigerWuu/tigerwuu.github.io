---
title: "(2024)DreamWaQ++: Obstacle-Aware Quadrupedal Locomotion with Resilient Multi-Modal Reinforcement Learning"
tags: [paper]
---

- website
    
    http://dreamwaqpp.github.io/
    
    https://zhuanlan.zhihu.com/p/5912828982
    

# Background knowledge

- Quadrupod robot locomotion - Dream family
    
    ```mermaid
    flowchart LR
    LM(Quadruped Locomotion Dream Family) --- P1(Proprioception)
    LM --- E1(Extroception)
    
    P1 --- DWQ(DreamWaQ-2023)
    DWQ .- ll(Locomotion)
    P1 --- DF(DreamFLEX-2025)
    DF .-> MM(Motor malfunctioned)
    P1 --- DR(DreamRiser-2023)
    DR .- FR(Fall recovery)
    
    E1 --- DWQpp(DreamWaQ++-2024)
    
    ```
    
- PointNet  → [[Concepts/PointNet|PointNet]]
    - a foundational neural network architecture for directly processing 3D point clouds
    - **permutation invariance** (independent of point order)

# Scenario

Propose an **obstacle-aware quadrupedal locomotion controller → DreamWaQ++**

# Theory & Technique

- Contributions
    1. A resilient controller with **multi-modal perception** capability and sensor-agnostic that can be integrated with various options of **exteroceptive** sensors.
    2. An efficient reinforcement learning (RL) pipeline with **a single-stage** learning procedure.
        1. ↔ TWIST: two-stage learning procedure
- Design
    1. Hierarchical exteroceptive memory
        
        Handle the **low-frequency**, **sparse**, and **noisy** nature of 3D exteroceptive inputs
        
        - Maintains a **temporal memory** of several past exteroceptive frames.
        - Each frame is transformed into a latent embedding (via the exteroceptive encoder) and then **aggregated hierarchically** to form a **dense, history-aware spatial map**.
    2. Proprioceptive encoder
        
        **VAE-style encoder** 
        
        → the same as in **DreamWaQ**
        
    3. Exteroceptive encoder
        
        Using a PointNet-like structure
        
        - Additional **confidence filter** → downweight uncertain or far points.
    4. Multi-modal mixer
        
        Fuse **proprioceptive and exteroceptive** latent representations
        
        - **contrastive loss** aligns $z_t^{pe}$ with the **critic’s privileged latent** (from the heightmap encoder), ensuring it encodes physically meaningful, terrain-aware features.
            
            → contrastive learning in **Hybrid Internal Model (HIM)** 
            

# Representative Schematic

- System architecture
    
    ![[assets/image 60.png]]
    

# Simulation & Experiment

# My two cents

- A real mixed bag of different practical techniques
- Proprioception vs. extroception
    - pros & cons