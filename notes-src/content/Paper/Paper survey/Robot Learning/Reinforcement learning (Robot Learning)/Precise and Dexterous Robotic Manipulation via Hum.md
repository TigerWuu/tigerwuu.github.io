---
title: "Precise and Dexterous Robotic Manipulation via Human-in-the-Loop Reinforcement Learning (HIL-SERL)"
tags: [paper]
---

- website
    
    https://hil-serl.github.io/
    
    [https://github.com/rail-berkeley/hil-serl](https://github.com/rail-berkeley/hil-serl)
    
    https://huggingface.co/docs/lerobot/hilserl
    
    https://serl-robot.github.io/
    
    [https://github.com/ikostrikov/rlpd](https://github.com/ikostrikov/rlpd)
    

# Background knowledge

- SERL: without human intervention
- RLPD: modified from SAC  → [[Techniques/Reinforcement Learning/index|Reinforcement Learning]]
- polyak averaging
- binary reward classifier
- DrQ style random shift
- UTD ratio (update-to-data ratio)  → [[Concepts/Update-to-Data Ratio|Update-to-Data Ratio]]

# Scenario

# Theory & Technique

- Contributions
    - binary reward for easily adapting to different tasks
    - human in the loop for fixing OOD data
- Design
    - data preprocessing
        - image: resized to (**128x128**)  → DrQ style random shift augmentation → mean std normalization → pre-trained **resnet10
        - state: (normalization) → state encoder
    - action:
        - $(\Delta x,\Delta y,\Delta z,\Delta r_x, \Delta r_y,\Delta r_z, gripper)$
    - observation:
        - end-effector state $(x,y,z,r_x,r_y,r_z, v_x, v_y,v_z, w_x, w_y,w_z,gripper)$
            
            <aside>
            💡
            
            x, y, z are in the **relative frame
            relative frame vs. absolute frame**
            
            </aside>
            
        - Almost every task includes ft sensor information in observations $(f_x,f_y,f_z,\tau_x, \tau_y, \tau_z)$
        - All tasks have at least **2** cameras (wrist camera, side camera)
    - reward:
        - 0, 1
- Tricks on training
    1. Avoid persistently providing **long sparse** **interventions** that lead to task successes.
    2. Such an intervention strategy will cause the overestimation of the value function, particularly in the early stages of the training process; which can result in unstable training dynamics.
    3. initial position randomization
    4. action scale!
        1. precise motion → action scale low
        2. intense motion → action scale high
    
    normalization [-1, 1]→ tanh sqash → unnormalization [0.01, 0.05] ,[xyz, rxryrz]
    

# Representative Schematic

- Overview
    - states → encoder → latent → decoder → states
    - states → normalization → norm states
        - min max
        - mean std (z-score)
- policy transitions → state action reward state_n, action_n
- humand → state action reward state_n, action_n (SARSA) → Q value → action
    
    ![[assets/image 123.png]]
    

# Simulation & Experiment

![[assets/image 124.png]]

- Training recipe
    
    
    1. SSD assembly
        
        ![[assets/image 125.png]]
        
    
    1. Jenga whipping
        
        ![[assets/image 126.png]]
        

# My Two Cents

1. sim2real gap mitigation
    1. domain randomization
    2. co-training
    3. real2sim2real (system identification)
    4. **real-world RL**
2. Depends on the data quality (human teleoperation)
3. Spend too much time on data collection !!!
4. Binary reward for generalization; task-specific training recipe is against it!
5. sparse reward →Dense reward may improve the leanring process.