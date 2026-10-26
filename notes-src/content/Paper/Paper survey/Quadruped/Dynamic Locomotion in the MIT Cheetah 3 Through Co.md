---
title: "Dynamic Locomotion in the MIT Cheetah 3 Through Convex Model-Predictive Control"
tags: [paper]
---

# Background knowledge

- Manipulator dynamics, jacobian  → [[Techniques/Differential Simulator/Rigid body dynamics|Rigid body dynamics]]
- Lie group  → [[Techniques/Mathematics/Lie group & Lie algebra|Lie group & Lie algebra]]
- QP problem  → [[Techniques/Mathematics/Linear Algebra/Optimization (Linear Algebra)|Optimization]]
- MPC  → [[Techniques/MPC|MPC]]

# Scenario

The control of dynamic locomotion, including trot, stand, pronk, bound, pace, and gallop, in MIT Cheetah 3 quadruped robot.  

# Theory & Technique

1. Model predictive control (MPC) to determine the ground force ($f$) , and then convert $f$  to joint torque $\tau$ for torque control
2. Using simplified rigid body dynamics of the quadruped robot
3. switch between two controllers
    1. Swing leg controller: PID control + FF
    2. Ground force control: MPC control 

# Simulation & Experiment

1. kick 
2. staircase
3. pronking 
4. jumping

# Representative Schematic

![[assets/image 26.png]]

![[assets/image 27.png]]