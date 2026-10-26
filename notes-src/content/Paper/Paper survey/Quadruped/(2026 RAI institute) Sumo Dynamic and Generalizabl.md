---
title: "(2026 RAI institute) Sumo: Dynamic and Generalizable Whole-Body Loco-Manipulation"
tags: [paper]
---

https://sumo.rai-inst.com/

---

[https://www.youtube.com/watch?v=3DKkiA_ZOfQ](https://www.youtube.com/watch?v=3DKkiA_ZOfQ)

# Scenario

Dynamically manipulation for large and heavy objects with whole-body dexterity.

- **Whole-body loco-manipulation** while walking, pushing, dragging, lifting, or using **body contacts**.
- Example tasks include uprighting a 15 kg tire, stacking tires, dragging a barrier, pushing a 20 kg box, opening a door, and pushing a table.

![[assets/image 61.png]]

# Problem Statement

- **End-to-end RL** is robust, BUT
    - New tasks adaptation: reward redesign, retraining, and expensive tuning
- **Sample-based MPC** is flexible and training-free for contact-rich manipulation, BUT
    - Curse of dimensionality
    - Unstable single-shooting rollouts
- Core problem
    - **How to adapt to unseen objects without task-specific retraining**, while preserving whole-body stability (def of ***unseen*** is discussed later)
- **Test-time steerable generalist whole-body control policy**
    - NO teleoperation references
    - NO fixed contact modes
    - NO task-specific motion libraries.
    - **Goal-conditioned** (via costs & constraints) loco-manipulation

# Contributions

- Proposes **Sumo**, a hierarchical framework combining:
    - **High-level sample-based MPC**: reasons contacts and plans the robot-object interactive movements
    - **Low-level RL whole-body control policy**: whole-body movements execution + stabilization
    - **Hybrid RL-MPC**: the MPC steers the pre-trained RL policy effectively for contact-rich loco-manipulation tasks.
- **Address key shortcomings of both: HOW?**
    - MPC: plans in the command space of RL policy (reduced search/decision space), more effective.
    - RL: steered at test-time and can adapt without task-specific retraining.
- Robust, flexible, and generalizes to unseen objects
    - Keeping high-level decision making (steering by costs)
    - Flexibly adjusting the cost function at test time without tuning or training.
    
    <aside>
    📌
    
    <u>***Assumption***</u> Definition of the generalization to unseen objects
    
    Reusing the same controller on new objects and new task objectives by changing only the planner’s **object model** (3D mesh, pose, collision, and inertia info, etc.) or **cost function** at test time, **without retraining.**
    
    </aside>
    
- Demonstrates 8 real-world Spot tasks and 4 simulated G1 humanoid tasks, along with **benchmark/dataset/code**.

![[assets/image 62.png]]

![[assets/image 63.png]]

## How Sumo Combines the Best of RL and MPC

The key idea is to let MPC optimize over the **command space of a pre-trained RL whole-body policy**, rather than directly optimizing joint-level commands.

$$
a_{t:t+T}^{*} = \arg\min J(s_{t:t+T}, a_{t:t+T})
$$

The MPC action $a$ is not sent directly to the robot as joint commands. Instead, it is passed to the RL whole-body policy:

$$
u_t = \pi_{\text{RL}}(s_t, a_t)
$$

So the rollout dynamics become:

$$
s_{t+1} = f(s_t, \pi_{\text{RL}}(s_t, a_t))
$$

This means MPC searches over a smaller and more stable high-level action space, such as base velocity, arm targets, torso targets, leg selection, and gripper commands. The RL policy handles whole-body stabilization and locomotion, while MPC handles online task reasoning and object interaction.

## Real-time cost steering

![[assets/image 64.png]]

![[assets/image 65.png]]

## Takeaway

**Sumo uses RL for what RL is good at — robust whole-body locomotion and stabilization — and MPC for what MPC is good at — online task reasoning, object-model adaptation, and cost-function flexibility.**

## Limitations

- Strong assumption on perception completeness
    - Whole-body **contact** & object **interaction** reasoning rely on accurate perception of object and reset in MuJoCo sim in real-time.
    - MoCap is used instead in this paper. While practically object pose estimation can not easily achieve this level of real-time performance
    - This is the bottleneck.
- Strong assumption on object model completeness
    - 

# Raw figures

![[assets/image 66.png]]

![[assets/image 62.png]]

![[assets/image 63.png]]

![[assets/image 67.png]]

![[assets/image 68.png]]

![[assets/image 69.png]]

![[assets/image 70.png]]

![[assets/image 71.png]]

![[assets/image 72.png]]

![[assets/image 73.png]]