---
title: "(2025)High Speed Robotic Table Tennis Swinging Using Lightweight Hardware with Model Predictive Control"
tags: [paper]
---

- video
    
    https://www.youtube.com/watch?time_continue=2&v=5LUOxgO5ugY&embeds_referring_euri=https%3A%2F%2Fwww.google.com%2Fsearch%3Fsca_esv%3D8a3c59226109f1b5%26rlz%3D1C1GCEA_enTW963TW963%26sxsrf%3DAE3TifNCrZ8CJI-YuLTWNPOSOS6QZ7o3rg%3A1764509&source_ve_path=Mjg2NjY
    

# Background knowledge

- MPC  → [[Techniques/MPC|MPC]]
    - Variable horizon MPC (VHMPC)
    - Shrinking horizon MPC (SHMPC)
    - Fixed horizon MPC (FHMPC)
    - Comparison
        
        ![[assets/image 83.png]]
        
        | Aspect | SHMPC | FHMPC |
        | --- | --- | --- |
        | Initialization | Current arm state | Ready pose |
        | Horizon | Shrinks every iteration | Fixed forever |
        | OCP Size | Changes | Constant |
        | Warm Start | Weak | Very strong |
        | Solve Time | 6–7 ms | 3 ms |
        | Convergence | ~90% | ~99.5% |
        | Practical Stability | Sensitive | Very stable |
        | Drawback | Feasibility loss & slow | Current-state mismatch |
- MPC solver and tool  → [[Techniques/MPC|MPC]]
    - CasADi
    - IPOPT
- Manipulator Dynamics Equation  → [[Techniques/Differential Simulator/Rigid body dynamics|Rigid body dynamics]]
    
    $M(\mathbf{q})\ddot{\mathbf{q}} + C(\mathbf{q}, \dot{\mathbf{q}}) -\tau_g(\mathbf{q}) = \mathbf{u}$
    
    - Euler-Lagrange Equation of Motion
    

# Scenario

Present a **robotic table tennis platform** that achieves a variety of **hit styles** and ball-spins with high precision, power, and consistency. 

- **Robotic table tennis platform →** a custom 5 DOF lightweight robot arm
- **Hit styles →** loop, drive,  chops

# Theory & Technique

- Contributions
    1. our **custom hardware** and high-bandwidth control system show progress towards
    matching the top end of human performance at striking table tennis balls while maintaining the ability to perform different types of shots.
        - low rotor inertia, high acceleration capability
        - 11 m/s exit velocity
    2. Construct a **fixed-horizon model predictive controller (FHMPC)** around the optimal control problem (OCP)
- Design
    
    Assumptions
    
    1. Magnus effect ❌
    2. Spin ❌
    3. friction of rubber ❌
    4. Racket plane is always perpendicular to the ball velocity
    5. Given a predefined virtual hit plane (x = -1.35m)
    6. Fixed landing position of the table
    
    - <u>***Ball trajectory prediction***</u>
        
        ![[assets/image 84.png]]
        
    - <u>***Arm controller design through FHMPC***</u>
        1. MPC to obtain the joint acceleration $\ddot{\mathbb q}$
            
            ![[assets/image 85.png]]
            
            - Each iteration → new ball estimation → new desired paddle position and velocity
            - the distance metric between orientation vectors is defined by the Euclidean distance rather than the intersecting angle
            - $\mathbf{p}_{des},\mathbf{v}_{des}, \mathbf{o}_{des}$ definition
                
                ![[assets/image 86.png]]
                
        2. Calculate torque **$\mathbb \tau$** through **$\ddot{\mathbb q}$** → torque control 
            
            ![[assets/image 87.png]]
            

# Representative Schematic

- MIT humanoid arm
    
    ![[assets/image 88.png]]
    
- Communication diagram
    
    ![[assets/image 89.png]]
    

# Simulation & Experiment

- Sensing
    - Six motion capture systems to capture the dynamics of table tennis ball

# Limitation and future works

- Limitations
    - **FHMPC drawback — Current arm state mismatch**
        - New optimized trajectory may differ greatly from current state
        - Requires smoothing / can cause suboptimal tracking
    - **Limited wrist control authority**
        - Horizontal orientation (α, θ) is harder to control
        - Affects accuracy of complex spins and directional shots
    - **Prediction latency variability**
        - Computation time varies depending on distance to strike-plane
        - Forced constraints on incoming ball speed and table setup
    - **Workspace confined to strike-plane**
        - Robot does not choose arbitrary 3D strike points
        - Limits gameplay applicability
    - **No spin estimation**
        - Assumes zero incoming spin
        - Reduces physical realism of prediction and impact modeling
    - **No shot aiming logic**
        - Only controls strike conditions, not target landing position
- Future works
    - Add **additional wrist DoF** for improved control in all orientation axes
    - Extend target selection to **3D pdes** rather than a planar strike-plane
    - Use **RGB-camera tracking** to support regulation table tennis balls
    - Implement **spin estimation & spin-aware prediction**
    - Automate **shot aiming** using racket-ball collision models
    - Reduce latency variance for handling faster balls
    - Expand robot workspace for full court coverage

# My two cents

- 5 DOF robot arm is not enough for the purpose of mimicking human player
    - Arm have 7 dof (3+1+1+2)
- Too many constraints
    - Swinging time : 0.5 s
    - Terminal paddle velocity : 6 m/s
    - Swinging type
        
        ![[assets/image 90.png]]