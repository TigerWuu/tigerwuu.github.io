---
title: "Rigid body dynamics"
tags: [concept]
---

While these three models are mathematically **equivalent** (providing the same equations of motion), they offer different perspectives—focusing on forces, energies, or state-space trajectories.

### 1.

Newtonian Model

- **Core Perspective**: Based on **Forces** and **Vector Balance**.
- 
    
    **Key Equation**: $F = m\ddot{q}$.
    
- **In Simulation**: Often extended to the **Newton-Euler** equations to account for rotation:
    
    $$M(q)\ddot{q} + C(q, \dot{q}) = \tau$$
    
    *(Where $M$ is the mass matrix, $C$ accounts for Coriolis/gravity/centrifugal forces, and $\tau$ is the generalized force)*.
    
- 
    
    **Usage**: Ideal for simulating rigid-body systems and handling contact impulses.
    

### 2.

Lagrangian Model

- **Core Perspective**: Based on **Energy** and the **Principle of Least Action**.
- 
    
    **Key Equation**: Defines the Lagrangian as $\mathcal{L} = T - V$ (Kinetic - Potential Energy). The motion follows the **Euler-Lagrange Equation**:
    
    $$\frac{d}{dt} \left( \frac{\partial \mathcal{L}}{\partial \dot{q}} \right) - \frac{\partial \mathcal{L}}{\partial q} = 0$$
    
- 
    
    **Usage**: Frequently used because it handles **generalized coordinates** (like joint angles) naturally, effectively eliminating internal constraint forces.
    

### 3.

Hamiltonian Model

- **Core Perspective**: Based on **Total Energy** and **Conservation Laws**.
- **Key Equation**: Uses the Hamiltonian $H = T + V$ (Total Energy). It converts second-order equations into two first-order equations involving position ($q$) and momentum ($p$).
- 
    
    **Usage**: Used in simulators (like **Dojo**) to ensure **conservation of momentum and energy**, providing high numerical stability even with large time steps.