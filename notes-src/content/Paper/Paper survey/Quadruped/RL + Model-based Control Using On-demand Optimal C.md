---
title: "RL + Model-based Control: Using On-demand Optimal Control to Learn Versatile Legged Locomotion"
tags: [paper]
---

# Background knowledge

- VHIPM
- Model-based Optimal Control  → [[Techniques/Mathematics/Linear Algebra/Optimization (Linear Algebra)|Optimization]]

# Scenario

Learn versatile legged robot locomotion through PPO with an MBOP generating the model states.

# Theory & Technique

1. Use VHIPM for modelling quadruped robots
2. Learn from MBOP, the reward is designed as the deviation of the output of MBOP and the RL  
3. Generalize to unseen scenario
4. A complicated reward function is not needed 
    1. Just learn how to imitate MBOP outputs

# Simulation & Experiment

![[assets/image 28.png]]

# Representative Schematic

![[assets/image 29.png]]