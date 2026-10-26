---
title: "(ICRA2023)DreamWaQ: Learning Robust Quadrupedal Locomotion With Implicit Terrain Imagination via Deep Reinforcement Learning"
tags: [paper]
---

# Background knowledge

- Asymmetric actor-critic PPO  → [[Concepts/PPO|PPO]], [[Techniques/Reinforcement Learning/index|Reinforcement Learning]]
- Beta variational autoencoder (beta - VAE)  → [[Techniques/Machine Learning/Variational Autoencoder (VAE)|Variational Autoencoder (VAE)]]
- Curriculum learning  → [[Concepts/Curriculum Learning|Curriculum Learning]]
- Domain randomization  → [[Concepts/Domain Randomization|Domain Randomization]]

# Scenario

This work proposes a novel quadrupedal **locomotion learning framework** that allows quadrupedal robots to walk through **challenging terrains**, even with **limited sensing modalities**. 

- **locomotion learning framework → DreamWaQ**
- **challenging terrains → stairs, irregular**
- **limited sensing modalities → X exteroception, O proprioception**
    - exteroception can malfunction in adverse weather conditions.

# Theory & Technique

- Contributions
    1. A **context-aided estimator network(CENet)** is proposed to estimate the body state (**velocity**) and **environmental context**
    2. Asymmetric actor-critic architecture (different observation between actor and critic) is proposed to acknowledge the terrain using only proprioception.
- Design (POMDP)
    1. observation 
        1. actor $(\bold{o}_t^H :H=5)$(worth noting that $\bold{v}_t$ is not included in the actor’s observation)
            
            ![[assets/image 30.png]]
            
        2. critic $(\bold{s}_t)$
            
            ![[assets/image 31.png]]
            
    2. reward
        
        ![[assets/image 32.png]]
        
    3. action $(\bold{a}_t)$
        
        ![[assets/image 33.png]]
        

# Simulation & Experiment

- Isaac gym
- 4096 environment
- 1000 episodes
- Unitree A1
- Domain randomization parameters
    
    (critical for sim-to-real!!!! In simulation, the training success no matter how, but it won’t work without the proper settings of domain randomization.)
    
    ![[assets/image 34.png]]
    
- learning curves
    - Ablation study
    - Oracle policy is using **exteroceptive sensor**
    
    ![[assets/image 35.png]]
    
- sim-to-real xy trajectory
    
    ![[assets/image 36.png]]
    

# Representative Schematic

- Overall diagram
    
    ![[assets/image 37.png]]
    
- CENet
    - Reconstruct the observation of the next observation
    
    ![[assets/image 38.png]]