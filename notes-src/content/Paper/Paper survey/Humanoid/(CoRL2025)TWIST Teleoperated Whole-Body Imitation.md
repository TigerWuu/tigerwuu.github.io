---
title: "(CoRL2025)TWIST: Teleoperated Whole-Body Imitation System"
tags: [paper]
---

- website
    
    https://yanjieze.com/TWIST/
    

# Background knowledge

- General Motion Retargeting (GMR)  → [[Concepts/Motion Retargeting|Motion Retargeting]]
    
    https://github.com/YanjieZe/GMR?tab=readme-ov-file
    
    - input: ?
    - output: robot root pose and joint position
- Imitation learning  → [[Paper/Paper survey/Robot Learning/Imitation Learning/index|Imitation Learning]]
    
    https://hackmd.io/@shaoeChen/SJmNmF1ES
    
    - Behavioral cloning
        - **Dagger**
    - Inverse reinforcement learning (IRL)
    - Generative adversarial network (GAN)

# Scenario

- Proposes a learning-based, unified **controller** that teleoperates humanoid robots in real time by imitating whole-body human motion, achieving versatile and coordinated skills.
    - **controller** → TWIST

# Theory & Technique

- Contributions
    1. Propose a two-stage teacher-student framework to ensure the **low latency of teleoperation** and reduce **hesitant behavior.**
        - teacher: future frame
        - student: only current frame
    2. Propose to train the controller with large end-effector perturbation, which improves robustness in tasks requiring contact and force.
- Design
    1. Dataset curation
        - Use both **offline retargeting** and **online retargeting**
            - offline dataset → AMASS, OMOMO, 15000 clips
            - online dataset → 150 in-house clips
        - Improve online retargeting by optimizing **3D joint positions and orientations** jointly to ensure smoothness (?.
    2. A **two-stage teacher-student** controller
        - **Teacher Policy:** access to *future motion frames* (2s) for smooth anticipation.
        - **Student Policy:** Trained with RL + BC (behavior cloning) to mimic **Teacher policy** using only the *current* frame.
        1. Reward 
            
            ![[assets/image 93.png]]
            
            - Teacher (RL)
                
                $$
                L(\pi_{tea})=L_{PPO}(\pi_{tea})
                $$
                
                $$
                r_{tea} = r_{track}+r_{penalty}
                $$
                
            - Student (RL+BC)
            
            $$
            L(\pi_{tea})=L_{PPO}(\pi_{stu})+\lambda D_{KL}(\pi_{std}||\pi_{tea})
            $$
            
            $$
            r_{stu} = r_{track}+r_{penalty}
            $$
            
        2. Domain randomization
            
            ![[assets/image 94.png]]
            

# Representative Schematic

- TWIST architecture
    
    ![[assets/image 95.png]]
    
    - Retargeting system → GMR

# Simulation & Experiment

Unitree G1 (real robot) and Booster T1 (simulation).

**Ablations:**

1. **RL+BC >> RL >> BC:** The combined method yields smoother and more stable motion.

![[assets/image 96.png]]

1. **In-house MoCap helps:** Adds realism (noise, imperfect calibration), improving sim-to-real transfer.
2. **End-effector perturbation training:** Improves stability and contact robustness.
3. **Better retargeting:** Jointly optimizing position + orientation improves motion fidelity.

# Limitations and future works

- **No robot feedback:** Lacks visual or tactile feedback to human operator → harder to manipulate objects under occlusion.
- **Hardware reliability:** Robot motors overheat after 5–10 min continuous operation.
- **Dependence on MoCap:** Requires high-quality MoCap, which is expensive and non-portable

# My two cents

- Application for VLA (?