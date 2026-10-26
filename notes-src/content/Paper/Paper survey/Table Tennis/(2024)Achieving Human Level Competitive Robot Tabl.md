---
title: "(2024)Achieving Human Level Competitive Robot Table Tennis"
tags: [paper]
---

- video
    
    https://www.youtube.com/watch?v=abi84lnjNV4
    

# Background knowledge

- Blackbox gradient sensing (BGS)
- KD-tree

# Scenario

Presents the first learned robot agent that reaches amateur human-level performance in **competitive** table tennis.

- **competitive** → winning strategy → not only hit the ball

# Theory & Technique

- Contributions
    1. a hierarchical and modular policy architecture consisting of (i) low level controllers with their detailed skill descriptors which model the agent’s capabilities and help to bridge the sim-toreal gap and (ii) a high level controller that chooses the low level skills,
    2. techniques for enabling zero-shot sim-to-real including an iterative approach to defining the task distribution that is grounded in the real-world and defines an automatic curriculum
    3. real time adaptation to unseen opponents. Policy performance was assessed through 29 robot vs. human matches of which the robot won 45% (13/29). All humans were
    unseen players and their skill level varied from beginner to
    tournament level. Whilst the robot lost all matches vs. the
    most advanced players it won 100% matches vs. beginners and
    55% matches vs. intermediate players, demonstrating solidly
    amateur human-level performance.
- Design
    - High-level controller (HLC) → select LLC once while the opponent hit the ball (<20ms)
        
        
        | Step | Component | Purpose | Output |
        | --- | --- | --- | --- |
        | 1 | Trigger | Detect opponent hit | Start decision cycle |
        | 2 | Style Policy | Choose forehand/backhand | Style ∈ {FH, BH} |
        | 3 | Spin Classifier | (Serve only) detect spin | Spin ∈ {Top, Under} |
        | 4 | **Skill Descriptors** | Predict each LLC’s performance | Metrics per LLC |
        | 5 | Heuristic Strategies | Shortlist promising LLCs | Λ* |
        | 6 | H-values | Adapt to opponent | Online preferences |
        | 7 | Weighted Sampling | Combine info & select LLC | Selected LLC |
        |  |  |  |  |
        - **Skill descriptors**: represented by KD tree
            
            → Given this ball’s position and velocity, how well would each skill (LLC) perform if used now
            
    - Low-level controller (LLC) → **3** training steps
        
        Training algorithm → **BGS**
        
        | Component | Description |
        | --- | --- |
        | **Algorithm** | **Blackbox Gradient Sensing (BGS)** — an evolutionary strategies (ES) method. |
        | **Why BGS** | Produces smooth joint motions and better sim-to-real transfer than PPO/SAC. |
        | **Network** | Dilated-gated 1D CNN (~10 k params) with optional FiLM adapter (~2.8 k params). |
        | **Inputs (observation)** | 8 timesteps of: ball pos/vel (6), robot joint pos (8), one-hot style (2). |
        | **Outputs (action)** | 8-dim vector → joint velocities at 50 Hz. |
        | **History length** | 8 timesteps ≈ 0.14 s context. |
        
        Training steps
        
        1. Base Generalist Policies → create two strong, general-purpose foundations to fine-tune specialized skills.
            1. **forehand**
            2. **backhand**.
        2. Specialize in Specific **Skills →** Each new LLC is evaluated for **return rate**, **hit velocity**, and **landing accuracy** — only good performers are added to the library.
            - **Skill examples:**
                - Forehand topspin rally
                - Backhand underspin return
                - Targeting a specific landing location
                - Fast-hit policy
                - Serve returns for different spins
            - Additional reward components :
                - Higher return velocity
                - Target accuracy (reduce landing error)
                - Stable ball trajectory (crossing net, staying on table)
        3. Build and Evaluate the Final Library
            
            **17** total LLCs are selected.
            
            - 4 for serving
            - 13 for rallying
            - 11 forehand style, 6 backhand style

# Representative Schematic

- Overall architecture
    
    ![[assets/image 91.png]]
    
- HLC selection flow chart
    
    ![[assets/image 92.png]]
    

# Simulation & Experiment

# Limitation and future works

1. cannot handle short pip paddle → however, the robot and people in the video seem to hold the short pip paddle.