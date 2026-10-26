---
title: "(2025) GR00T N1: An Open Foundation Model for Generalist"
tags: [paper]
---
Humanoid Robots

- website
    
    https://research.nvidia.com/labs/gear/publications/
    

# Background knowledge

- Diffusion transformer (DiT)  → [[Techniques/Machine Learning/Diffusion model|Diffusion model]], [[Concepts/Transformer|Transformer]]
- flow matching  → [[Techniques/Machine Learning/Flow Matching|Flow Matching]]
- latent-action codebook
- inverse dynamics model (IDM)
- Lapa
- DexMimicGen
    - MimicGen

# Scenario

Bringing robot learning to the level of generality required for effective real-world systems faces major obstacles in terms of data, generalization, and robustness. In this paper, we discuss how **generalist robot policies** (i.e., robot foundation models) can address these challenges, and how we can design effective generalist robot policies for complex and highly dexterous tasks. 

# Theory & Technique

- Contributions
    - address data island problem by proposing data pyramid concept
        
        ![[assets/image 113.png]]
        
    - We develop an effective co-training strategy to learn across the entire data pyramid in both pre- and post-training phases.
        - Use **latent-action codebook** and trained **inverse dynamics model (IDM)** to infer pseudo-actions from human demonstration
- Design
    - Data
        - Dateset
            - real-robot datasets
            - synthetic datasets
            - human video datasets
        - Dataset generation
            - latent actions
            - neural trajectory
            - simulation trajectory
    - Model
    - Training
        - pre-training
        - post-training

# Representative Schematic

- Model overview
    
    ![[assets/image 114.png]]
    
    - detailed
        
        ![[assets/image 115.png]]
        

# Simulation & Experiment

- 

# Limitations & future works

##