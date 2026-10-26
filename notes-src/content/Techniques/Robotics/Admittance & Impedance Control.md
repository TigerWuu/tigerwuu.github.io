---
title: "Admittance & Impedance Control"
tags: [concept]
---

## Overview

Admittance and impedance control are fundamental concepts in robotics and control systems that define how a robot interacts with its environment through force and motion relationships.

## Impedance Control

Impedance control regulates the dynamic relationship between force and motion, making the robot behave as a mechanical impedance (mass-spring-damper system).

### Key Characteristics

- **Input:** Position/velocity
- **Output:** Force/torque
- **Behavior:** The robot responds to external forces by adjusting its position according to programmed stiffness and damping parameters

### Mathematical Representation

The impedance relationship is typically expressed as:

$$
F_{ext} = M\ddot{x} + B\dot{x} + K(x-x_d)
$$

Where:

$F_{ext}$ = applied force

$M$ = desired inertia

$B$ = desired damping

$K$ = desired stiffness

$x, ẋ, ẍ$ = position, velocity, acceleration

$x_d$ = desired position

Using the Jacobian to obtain the extra torque command of each joint:

$$
\tau_{ext} = J^T F_{ext}

$$

Where:

$\tau_{ext}$ = joint torques (n×1 vector)

$J^T$ = transpose of the Jacobian matrix

## Admittance Control

Admittance control is the dual of impedance control, regulating the relationship from force to motion, making the robot behave as a mechanical admittance.

### Key Characteristics

- **Input:** Force/torque
- **Output:** Position/velocity
- **Behavior:** The robot adjusts its motion in response to measured external forces

### Mathematical Representation

The admittance relationship is the inverse (factoring out (1/K)):

$$
\ddot{x} = \frac{1}{M}(F_{ext} - B\dot{x} - K(x-x_d))
$$

Rearranging to make the *model output* the acceleration $\ddot x$:

**Implementation note:** In practice, the controller often computes $\ddot x$ from the measured force $(F)$, then integrates it to get the commanded motion:

$\dot{x}(t) = \int \ddot{x}(t) \, dt$

$x(t) = \int \dot{x}(t) \, dt$

Using an iterative method (e.g., Jacobian pseudo-inverse or numerical optimization) to calculate the inverse kinematics and obtain the position command of each joint:

$$
q_{k+1} = q_k + J^{\dagger}(q_k) \cdot (x_d - f(q_k))
$$

Where:

$q_k$ = joint configuration at iteration k

$J^{\dagger}(q_k)$ = pseudo-inverse of the Jacobian matrix at $q_k$

$x_d$ = desired end-effector position (from admittance model)

$f(q_k)$ = forward kinematics function (current end-effector position)

$q_{k+1}$ = updated joint configuration

## Comparison

| **Aspect** | **Impedance Control** | **Admittance Control** |
| --- | --- | --- |
| Causality | Motion → Force | Force → Motion |
| Sensor Requirement | Position sensors | Force/torque sensors |
| Control Type | Force control | Position control |
| Stability | Better with stiff environment | Better with soft environment |
| Implementation | Easier on force-controlled  robots | Easier on position-controlled robots |