---
title: "(ICRA2025)DreamFLEX: Learning Fault-Aware Quadrupedal Locomotion"
tags: [paper]
---
Controller for Anomaly Situation in Rough Terrains

# Background knowledge

- Modulation Model
- Binary cross entropy (BCE)

# Scenario

Propose a **robust fault-tolerant locomotion controller** that enables a quadrupedal robot to traverse **complex environments** even under **joint failure conditions**. 

- **robust fault-tolerant locomotion controller** **: DreamFLEX**
- **complex environments: stairs, irregular rough terrain**
- **joint failure conditions:** locked joint, weakened motor

# Theory & Technique

1. propose a failure estimation and modulation network (FEMNet) to estimate the explicit joint state of the robot as a joint fault vector and leverage it to modulate the latent embedding for the policy network.
2. Asymmetric actor-critic architecture (different observation between actor and critic) is proposed to acknowledge the terrain using only proprioception.

# Simulation & Experiment

- Isaac gym
- 4096 environment
- 1000 episodes
- learning curve
    
    ![[assets/image 48.png]]
    
    - Oracle shows that the policy network is aware of all the privileged observations

# Representative Schematic

![[assets/image 49.png]]

- $O_t$
    
    ![[assets/image 50.png]]
    
- $S_t$
    
    ![[assets/image 51.png]]
    

![[assets/image 52.png]]