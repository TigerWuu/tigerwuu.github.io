---
title: "(2024) π0: A Vision-Language-Action Flow Model for General Robot Control"
tags: [paper]
---

- website
    
    https://www.physicalintelligence.company/blog/pi0
    

# Background knowledge

- Action chunk  → [[Concepts/Transformer|Transformer]]
- TransFusion [2024]
    - Transformer + diffusion model
- Flow matching  → [[Techniques/Machine Learning/Flow Matching|Flow Matching]]
    - Conditional flow matching
- PaliGemma (Vision-language Model)  → [[Techniques/Machine Learning/Vision-Language Model (VLM) Learning Roadmap (Theo|Vision-Language Model]]
    - SigLip
        - Clip
    - Gemma

# Scenario

Bringing robot learning to the level of generality required for effective real-world systems faces major obstacles in terms of data, generalization, and robustness. In this paper, we discuss how **generalist robot policies** (i.e., robot foundation models) can address these challenges, and how we can design effective generalist robot policies for complex and highly dexterous tasks. 

# Theory & Technique

- Contributions
    
    Design a generalist robot policies that can
    
    - Follow **natural language commands**,
    - Perform **zero-shot execution** on unseen tasks,
    - Be **fine-tuned efficiently** for high-performance downstream tasks,
    - Operate at **high control frequency (up to 50 Hz)** for dexterous manipulation.

- Design
    - Data
        1. Cross-embodiment training
            1. single-arm
            2. dual-arm
            3. mobile manipulators
        2. How to handle the dataset's different dimensions across different robot configurations?
            1. brutal force zero pad the channel ! → like OCTO!
    - Training
        1. Training recipe
            1. Pre-trained and post-trained skills
                1. Pre-trained → low-quality data
                2. Post-trained → high-quality data
    - Model
        1. Bakebone (3B)
            
            PaliGemma
            
            1. Vision encoder → sigLIP (400M) 
            2. Language encoder → Gemma (2.6B)
        2. Action expert (3M) (Action head)
            1. action chunk output,  $H = 50$
                
                $$
                a_t = [a_t, a_{t+1}, \ldots, a_{t+H-1}]
                $$
                
            2. Use **conditional flow matching**, a diffusion-style formulation that learns a vector field transforming noise into valid action trajectories.
                
                

# Representative Schematic

![[assets/image 108.png]]

- ViT : vision transformer
- $q_t$ : robot joint state

# Simulation & Experiment

- Inference time (~ 13hz)
    
    ![[assets/image 109.png]]
    
    - onboard : 73 ms
    - offboard : 86 ms (with network latency)
- H-step action chunk
    1. Execute up to H actions before another inference
    2. Combine actions from different inferences, such as temporal ensembling → **hurt policy performance (?**
    
    → execute 0.5 s (25 action steps), then perform one inference → **50 hz**
    

- Finetuning comparison
    
    ![[assets/image 110.png]]
    

# Limitations & future works

## Limitations

- **Massive data and compute requirements** (not easily reproducible).
- Heavy reliance on **demonstration data** rather than autonomous learning.
- Action integration still requires multiple diffusion steps → latency.
- High-level reasoning depends on **external VLM planners**. → $\pi_{0.5}$
- No formal safety or stability guarantees (purely learning-based).

## Future works

- Tighter integration of **high-level planning and low-level control**.
- Incorporating **reinforcement learning or online adaptation**. → $\pi_{0.6}^*$
- Improving **inference efficiency** for real-time deployment.
- Scaling to **even more embodiments and tasks**.
- Adding **formal safety constraints or hybrid control priors**.

# My two cents

- 13 hz inference time