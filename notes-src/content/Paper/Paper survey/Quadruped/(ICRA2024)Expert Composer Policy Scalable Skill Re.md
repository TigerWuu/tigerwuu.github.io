---
title: "(ICRA2024)Expert Composer Policy: Scalable Skill Repertoire for Quadruped Robots"
tags: [paper]
---

- video
    
    https://www.youtube.com/watch?v=luJlquIElxc&ab_channel=%E8%8B%B1%E6%A5%AD%E9%81%94AI
    

# Background knowledge

![[assets/image 39.png]]

- Mixture-of-experts (MoE)  → [[Concepts/Mixture of Experts|Mixture of Experts]]
- Ensemble learning
- Imitation learning  → [[Paper/Paper survey/Robot Learning/Imitation Learning/index|Imitation Learning]]
    
    → compounding error 
    

# Scenario

Propose the ****expert **composer policy**, a framework to reliably expand the skill repertoire of quadruped agents.

- **composer policy→**The composer policy links pair of experts via transitions to a sampled target state, allowing **experts** to be composed sequentially.
- **experts→** Each expert specializes in a single skill, such as a locomotion gait or a jumping motion.

# Theory & Technique

- Contributions
    1. A novel transition mechanism that generates smooth trajectories between arbitrary states of physics-enabled agents learned via shrinking boundaries.
    2. A versatile meta-controller capable of performing various skills that can be incrementally expanded at deployment.
        - Adding new experts and using the same comoposer policy ($\mathbf{P}$) without re-training or fine-tuning
            
            → MoE and ensemble learning need re-training procedure
            
- Design
    1. Using imitation learning to learn different expert motion such as 
        
        https://www.youtube.com/watch?v=AmdSDJlHIEM&ab_channel=HRRLABOnAir
        
        - Trot(F)
        - Trot(B)
        - Pace(F)
        - Pace(B)
        - Hop
        - Hop (Turn)
        - Spin
        - Side Step (F)ast
        - Side Step (S)low.
    
    1. Composer policy $(\mathbf{P})$
        
        $$
        \mathbf{P}(\mathbf{a}_t|s_t,\hat{s})
        $$
        
        - $\mathbf{a}_t$ : actions, 12 joints angle
        - $s_t$ : current **states**
        - $\hat s$ : target **states**
            - **states →** including position, orientation, binary feet contact indicators, linear and angular velocities, and joint angles and velocities, which is sampled from **animation data**
            - **animation data** → the data from the imitation learning
    2. Reward function incentivize the states to stay within a set of boundaries for each property
        
        ![[assets/image 40.png]]
        
        ![[assets/image 41.png]]
        
        ![[assets/image 42.png]]
        
        ![[assets/image 43.png]]
        
    3. If $\mathbf{P}$ is trained with a large enough distribution of start and target states, it is reasonable to assume that **it should learn feasible transitions between any experts, even new ones.**
        
        → contribution 2
        

# Representative Schematic

![[assets/image 44.png]]

![[assets/image 45.png]]

# Simulation & Experiment

- Unitree A1
- PPO
- Isaac Gym
- We constructed a library of 9 distinct experts in the following motions:
    - Trot (F), Trot (B), Pace (F), Pace (B), Hop, Hop (Turn), Spin, Side Step (F)ast, and Side Step (S)low.
        
        → 72 unique transition pairs. 
        
- To evaluate generalization to new skills, $P$ was trained by sampling starting and target states from just 4 experts:
    - Trot (F) and (B), Pace (F) and Side Step (F).
    - The 5 remaining experts were added in a supposed expansion process, i.e. were not part of the training.
- Result
    
    ![[assets/image 46.png]]
    
- PCA analysis
    
    ![[assets/image 47.png]]