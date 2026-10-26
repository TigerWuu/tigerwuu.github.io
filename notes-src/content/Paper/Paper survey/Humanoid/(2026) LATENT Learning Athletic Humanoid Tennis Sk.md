---
title: "(2026) LATENT: Learning Athletic Humanoid Tennis Skills from Imperfect Human Motion Data"
tags: [paper]
---

- website
    
    https://zzk273.github.io/LATENT/
    

# Background knowledge

- conditional variational information bottleneck (CVIB) ↔ conditional variational autoencoder (CVAE)  → [[Techniques/Machine Learning/Variational Autoencoder (VAE)|Variational Autoencoder (VAE)]]
- loco-mujoco

# Scenario

- Enabling a humanoid robot to play tennis using imperfect human motion data.

# Theory & Technique

- Contributions
    - Propose a **novel system** to learn athletic humanoid tennis skills from imperfect human motion
    data, paving the way for future research.
        - **novel system** → latent
    - We propose **two novel designs** to better construct and utilize a latent action space from imperfect human motion data.
- Design
    1. Data collections
        1. primitive skills → No complete motion sequences from tennis matches
            - forehand stroke,
            - backhand stroke
            - lateral shuffle
            - crossover step
            
            → retarget through loco-Mujoco
            
        
    2. Motion tracker pre-training
        - Teacher action: RL policy
        
        $$
        \pi_{\text{tracker}}(\hat{a}_t^{\text{body}} | s_t, \tilde{s}_{t+1})
        $$
        
    3. Online distillation 
        - Student action: conditional variational information bottleneck (CVIB)
            
            $$
            \mathcal{L} = \lambda_1 \mathcal{L}_{\text{action}} + \lambda_2 \mathcal{L}_{\text{KL}} 
            $$
            
            $$
            \mathcal{L}_{\text{action}} = \mathbb{E}_{(s_t, \hat{a}_t^{\text{body}}) \sim \mathcal{D}_{\text{agg}}} \left[ \| \hat{a}_t^{\text{body}} - a_t^{\text{body}} \|^2 \right]
            $$
            
    4. High-level policy learning
    5. Sim-to-real transfer

# Representative Schematic

- Latent architecture
    
    ![[assets/image 97.png]]
    
    - conditioned on $S_t$

# Simulation & Experiment

We use PPO as our reinforcement learning framework and MuJoCo JAX for simulation in training. We train our policy in parallel on 8 GPUs. Our high-level planner and low-level controller run at 50 Hz, and the simulation frequency is set to 2000 Hz

![[assets/image 98.png]]

# Limitations and future works

# My two cents