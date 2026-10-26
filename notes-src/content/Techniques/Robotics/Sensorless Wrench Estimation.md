---
title: "Sensorless Wrench Estimation"
tags: [concept]
---

## Overview

Sensorless wrench estimation is a technique used in robotics to estimate the forces and torques (wrench) applied at the end effector of a robotic manipulator without using dedicated force/torque sensors. This method relies on transforming the torque measurements from the six joints of the robot to calculate the equivalent wrench at the end effector.

## Key Concept

The transformation is based on the relationship between joint torques and end effector wrench through the manipulator's Jacobian matrix. The fundamental equation is:

$$
τ = J^T  F
$$

Where:

- **τ** = Joint torque vector (6×1)
- **J** = Jacobian matrix relating joint velocities to end effector velocities
- **J^T** = Transpose of the Jacobian matrix
- **F** = Wrench at the end effector (6×1 vector: 3 forces + 3 torques)

## Estimation Process

1. **Measure joint torques:** Obtain torque readings from all six joints using motor current measurements or embedded torque sensors in the joints
    
    $$
    τ_{measured} = \begin{bmatrix} τ_1 \\ τ_2 \\ τ_3 \\ τ_4 \\ τ_5 \\ τ_6 \end{bmatrix}
    $$
    
2. **Calculate the Jacobian:** Compute the geometric Jacobian matrix based on the current robot configuration (joint angles)
    
    $$
    J(q) = \begin{bmatrix} J_{11} & J_{12} & \cdots & J_{16} \\ J_{21} & J_{22} & \cdots & J_{26} \\ \vdots & \vdots & \ddots & \vdots \\ J_{61} & J_{62} & \cdots & J_{66} \end{bmatrix}
    $$
    
3. **Compensate for robot dynamics:** 
    
    $$
    τ_{external} = τ_{measured} - τ_{model}
    $$
    
    Where $τ_{ideal}$ includes gravity, inertia, and friction effects from the robot dynamics model.
    
    The equation for $τ_{ideal}$  in robot dynamics is:
    
    $$
    τ_{model} = M(q)\ddot{q} + C(q,\dot{q})\dot{q} + G(q) 
    $$
    
    Where:
    
    - **M(q)** = Mass/inertia matrix (configuration-dependent)
    - **C(q,ẋ)** = Coriolis and centrifugal forces matrix
    - **G(q)** = Gravity torque vector
    - **F(ẋ)** = Friction torque vector
    - **q** = Joint positions
    - **ẋ** = Joint velocities
    - **q̈** = Joint accelerations
    
    This represents all the internal torques the robot needs to maintain its motion and counteract gravity and friction, which must be subtracted from the measured torques to isolate external forces.
    
4. **Solve for external wrench:** Subtract gravity and dynamic effects to isolate external forces
    
    $$
    F_{external} = (J^T)^{-1} τ_{external}
    $$
    

## Advantages

- Cost-effective: No need for expensive force/torque sensors
- Reduced complexity: Fewer components and wiring
- Improved reliability: Fewer sensors mean fewer potential points of failure

## Limitations

- Accuracy depends on model precision (mass, inertia, friction parameters)
- Sensitivity to joint compliance and backlash
- Requires accurate knowledge of robot kinematics and dynamics
- Performance degrades near singular configurations