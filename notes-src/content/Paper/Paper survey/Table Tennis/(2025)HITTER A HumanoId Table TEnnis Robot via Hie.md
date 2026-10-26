---
title: "(2025)HITTER: A HumanoId Table TEnnis Robot via Hierarchical Planning and Learning"
tags: [paper]
---

- video
    
    https://humanoid-table-tennis.github.io/
    

# Background knowledge

- SMPL  → [[Concepts/Motion Retargeting|Motion Retargeting]]
    
    https://smpl.is.tue.mpg.de/
    
- GMR  → [[Concepts/Motion Retargeting|Motion Retargeting]]
    
    https://github.com/YanjieZe/GMR?tab=readme-ov-file
    
- GVHMR
    
    https://zju3dv.github.io/gvhmr/
    

# Scenario

Present a hierarchical framework for a humanoid table tennis robot

- Model-based planner for ball trajectory prediction
- Racket target planning with a reinforcement learning–based whole-body controller.

# Theory & Technique

- Contributions
    1. Propose a hierarchical framework that integrates a model-based planner and an RL-based whole-body controller, enabling humanoid table tennis play.
    2. Develop human-like, whole-body striking skills, combining coordinated arm motions for multi-skill ballhitting, and agile leg movements for rapid reaching.
    3. Introduce the human motion reference into policy training via video clip
    4. Validate through humanoid–humanoid and humanoid–human rallies.
- Design
    
    Assumptions
    
    1. Magnus effect ❌
    2. Spin ❌
    3. friction of rubber ❌
    4. Racket plane is always perpendicular to the ball velocity
    5. Given a predefined virtual hit plane (x = -1.35m)
    6. Fixed landing position of the table
    
    - <u>***Model-based planner***</u>
        1. ball state estimation
            
            position, velocity → second order polynomial via least squares
            
        2. ball trajectory prediction
            1.  ball-table interaction
                
                ![[assets/image 74.png]]
                
                ![[assets/image 75.png]]
                
                - k: is the aerodynamic drag coefficient
                    
                    ![[assets/image 76.png]]
                    
                - C: is the restitution coefficient
                    
                    ![[assets/image 77.png]]
                    
                - Both k and C are estimated from 15 recorded ball trajectories
            2. ball-racket interaction
                
                given landing position → initial vel of ball
                
                ![[assets/image 78.png]]
                
                ![[assets/image 79.png]]
                
    - <u>***Learning-based whole body controller***</u>
        1. Human motion reference 
            - human motion (video) → <u>***GVHMR***</u> → SMPL → <u>***GMR***</u> → robot position
            - Clip the reference video to 94 frames, and the hitting occurs at the 43rd frame.
        2. PPO optimization
            - separate base and racket command
                - base: world coordinate
                - racket: base coordinate
            1. reward function → it didn’t reveal how to design this reward function
                
                ![[assets/image 80.png]]
                
                $r_i$ : imitation of the upper body trajectory
                
                $r_g$ : tracking of the command goal (e.g., hitting time, base position, racket position, racket velocity)
                
                $r_r$ : regularization term(?
                

# Representative Schematic

- System framework
    
    ![[assets/image 81.png]]
    

# Simulation & Experiment

- Model-based planner

![[assets/image 82.png]]

# Limitation and future works

1. Virtual hitting plane
2. External motion capture
3. Spin handling and stroke repertoire
- Future works
    
    The additional characteristics that are required to play against skilled opponents include learning their characteristics by watching them play (**strategic learning**), and then adapting the stroke making in real time to specific characteristics of the opponent (**tactical learning**)