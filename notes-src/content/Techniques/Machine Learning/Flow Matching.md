---
title: "Flow Matching"
tags: [concept]
---

# Training Procedure

## Step 1: Sample Expert Trajectory and Noise

- Expert action trajectory:
    
    $$
    
    x_1 = [a_1, a_2, \dots, a_H] \in \mathbb{R}^{H \times d}
    
    $$
    
- Noise trajectory:
    
    $$
    x_0 \sim \mathcal{N}(0, I) \in \mathbb{R}^{H \times d} 
    $$
    

$H:$  action steps 

$d$ : action dimension, i.e, a 6-axis robot arm has d = 6 for joint position $(q)$

<aside>
💡

If there are 50 (H=50) action steps, the noise should also be 50, and the noise will gradually flow to the actual trajectory in a vector field.

</aside>

---

## Step 2: Sample Flow Time and Construct Interpolation Path

- Sample a scalar:
    
    $$
    t \sim \mathcal{U}(0, 1) 
    $$
    
- Construct an interpolation trajectory:
    
    $$
    x(t) = (1 - t)x_0 + t x_1 
    $$
    

This defines a reference path in trajectory space from noise to expert data.

---

## Step 3: Compute Ground-Truth Velocity

Since the interpolation path is predefined, its time derivative is:

$$
\dot{x}(t) = x_1 - x_0 
$$

This velocity serves as the supervision signal.

---

## Step 4: Train Neural Network to Match the Velocity Field

Train a neural network $v_\theta(x(t), t, c)$ to predict the velocity:

$$
v_\theta(x(t), t, c) \approx x_1 - x_0

$$

Loss function:

$$
\mathcal{L}
= \mathbb{E}_{x_0, x_1, t}
\left[
\|v_\theta(x(t), t, c) - (x_1 - x_0)\|^2
\right]
$$

$c:$  conditioning information (state, vision, language)

<aside>
💡

1. 在訓練時，針對同一個ground truth trajectory $x_1$, 會sample 很多noise $x_0$ ，所以在vector field 上每一個 $x_0$ 跟 $x_1$ 會學到一小部份vector, 很多 $x_0$ 就建立一張完整的 vector field 了
2. robot 在移動時每一個時刻都會有不同的 $x_1$, 所以會有很多不同的vector field ，這些vector field 會根據 condition $(c)$ 來改變。 
</aside>

---

## Graph Illustration

![[assets/image 20.png]]

Purple dotted line: interpolation path

Purple solid line: ground truth velocity

# Inference Procedure

The velocity of the current state is the distance between $x_0$ and $x_1$, so we can say the after the update of state, by newton euler integration 

$$
x_{t+\Delta t} = x_t + v_\theta(x_t, t, c) \cdot \Delta t
$$

$x_t$: current state at time $t$

$v_\theta(x_t, t, c)$: predicted velocity from the neural network

$\Delta t$: integration step size, depends on how much step you want to do, i.e, If step number = $N$, the $\Delta t = \frac{1}{N}$ 

$x_{t+\Delta t}$: next state after integration

<aside>
💡

1. 如果 $\Delta t$ = 1 , 那就是  1 步到目標，但通常會跑 5- 10 步 ($N=5-10$)，因為 $v_\theta(x_t, t, c)$ 所估出來的值不會是完全準確的
</aside>

---

## Graph illustration

 

![[assets/image 21.png]]

<aside>
💡

The arrow direction of $x_1$ and $x_2$  is wrong, due to the stupid Nanobanana

</aside>

1. Purple trajectory: the ideal action state after 5 updates
2. Orange trajectory: the true action state update after 5 updates, due to the training error between $v_\theta$ and $\dot x$
3. The orange dotted line show the true velocity vector should be like.