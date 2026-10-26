---
title: "Differential Simulator"
tags: [topic]
---

# Reference

- Review
    
    https://arxiv.org/abs/2407.05560
    
- System identification
    
    https://arxiv.org/abs/2011.01734
    
    https://arxiv.org/abs/2007.00987
    
    https://hal.science/hal-03025616v3/document
    
- Policy optimization
    
    https://arxiv.org/abs/2204.07137 (SHAC)
    
- Gradient calculation
    
    https://arxiv.org/abs/1502.05767 (AD)
    

# Terms

`Simulator` : isaac sim, gazebo, mujoco, **newton,** …

`Physics engine` : physx, **newton (warp)**, …

`Solver` : SemiImplicit, mujoco warp, Kamino, Implicit MPM, Featherstone,…

`dynamics model` : rigid body, soft body, fluid, …

- Eular diagram
    
    ![[assets/image 12.png]]
    

# Introduction

1. Differential simulator vs. traditional simulator
    - **Gradient information.**
        
        For what?  Ans: optimization
        
        What gradient? 
        
        <u>***Example***</u>: friction estimation
        
        https://www.youtube.com/watch?v=d248IWMLW9o
        
        **Goal**: 方塊在地面上滑動，要讓方塊在模擬器裡的動態跟真實的世界裡的方塊動態一樣
        
        - 位移: $q$
        - 摩擦係數: $\mu$
        - loss function: $L$, e.g. $L = \frac{1}{2}\sum_{t=0}^N(q_{{true}_t}-q_t)^2$
        - Gradient: $G$
        
        $$
        G = \frac{\partial L}{\partial \mu} = \frac{\partial L}{\partial q}\cdot \textcolor{red}{\frac{\partial q}{\partial \mu}}
        $$
        
        - Actually BPTT
            
            $$
            G = \frac{\partial L}{\partial \mu} = \sum_{t=1}^{N} \frac{\partial L_t}{\partial \hat{q}_t} \cdot \frac{\partial \hat{q}_t}{\partial \mu}
            $$
            
        - update friction
            
            $$
            \mu_{new} = \mu_{old} - \eta \cdot G
            $$
            
    
    <aside>
    💡
    
    $\textcolor{red}{\frac{\partial q}{\partial \mu}}$ is provided by the differential simulator
    
    </aside>
    
2. Components
    
    ![[assets/image 13.png]]
    
    1. Gradient calculation
        1. automatic differentiation
            
            relies on the fact that even complex functions are composed of elementary operations
            (e.g., addition, subtraction, etc.) and functions (e.g., sin, cos, exp, etc.), which allows for repeatedly applying the chain rule to these expressions in a programmatic way to compute the value of a derivative
            
            1. Forward mode AD
            2. **Reverse mode AD**
        2. symbolic differentiation
        3. analytical gradient
            1. implicit Differentiation
            2. adjoint Method
    2. Dynamics model
        1. rigid body dynamics
            
            [[Techniques/Differential Simulator/Rigid body dynamics|Rigid body dynamics]]
            
            1. newton-eular dynamics
                
                $$
                F=m\ddot q
                $$
                
            2. Lagrangian dynamics
            3. hamiltonian dynamics
        2. soft body dynamics
            1. continuum mechanics
                1. MLS-MPM
                2. FEM
            2. projective dynamics
            3. compliant position-based dynamics (XPBD)
        3. fluid 
    3. Contact model
        
        ![[assets/image 14.png]]
        
        <aside>
        💡
        
        It is difficult to model a contact model in a differentiable simulator due to its highly **nonlinear** and **discontinuous behavior**
        
        </aside>
        
    4. Integrator
        1. explicit (forwards) integration → less stable, $\Delta t < 0.5ms$
            
            $$
            \begin{aligned}
            \dot{q}_{k+1} &= \dot{q}_k + \Delta t \cdot \ddot{q}_k \\
            q_{k+1} &= q_k + \Delta t \cdot \dot{q}_k
            \end{aligned}
            $$
            
        2. implicit (backwards) integration → more stable $\Delta t < 10 ms$
            
            $$
            \begin{aligned}
            \dot{q}_{k+1} &= \dot{q}_k + \Delta t \cdot \ddot{q}_{k+1} \\
            q_{k+1} &= q_k + \Delta t \cdot \dot{q}_{k+1}
            \end{aligned}
            $$
            
            | **特性** | **顯式積分 (Explicit)** | **隱式積分 (Implicit)** |
            | --- | --- | --- |
            | **誤差來源** | 能量積累導致的「爆炸」 | 能量損耗導致的「數值阻尼」 |
            | **小步長表現 $(\Delta t \to 0)$** | **更準確**，能還原真實物理  | 準確，但仍可能帶有微小阻尼 |
            | **大步長表現 $(\Delta t \gg 0)$** | 數值發散，物體噴飛  | **極其穩定**，系統不崩潰  |
            | **計算代價** | 每個步長極快，但需模擬更多步 | 每個步長慢（需解方程），但步數少  |
            
            <aside>
            💡
            
            將(1)式帶入(2)式，再用$\ddot{q}_{k+1} = \frac{F(q_{k+1})}{m}$取代 → 非線性方程組(if $F$ 是非線性) 
            
            </aside>
            
3. Simulators
    
    ![[assets/image 15.png]]
    
4. Applications
    
    ![[assets/image 16.png]]
    
    All papers that investigate use cases of differentiable simulators can be categorized into one of these **five** applications area
    
    - <u>***System Identification***</u>
        - **differentiable rendering techniques** → calculate the pixelwise mean square error between recorded video fo the true system and a rendered video from the differentiable simulator
        - Example
            
            ball-in-cup
            
            https://sites.google.com/view/ball-in-a-cup-in-4-minutes/ 
            
             friction estimation (1:11)
            
            https://www.youtube.com/watch?v=d248IWMLW9o
            
    - Trajectory Optimization
    - Morphological Optimization
        
        
        ![[assets/image 17.png]]
        
        ![[assets/image 18.png]]
        
    - <u>***Policy Optimization***</u>
        - Analytic policy gradient
        - Enhanced policy learning
            - Policy optimization via differentiable simulation (PODS): extend from the Deterministic policy gradient (DPG)
            - Short horizon actor critic (SHAC)
            
            <u>***SHAC and PODS belong to RL algorithm***</u>
            
        
        <aside>
        💡
        
        Algorithm comparison in policy optimization
        
        | **類別** | **核心演算法** | **解決的核心問題** | **適用場景** |
        | --- | --- | --- | --- |
        | **直接求導** | **APG (BPTT)** | 建立物理到控制的端到端梯度。  | 簡單接觸、短時域任務。  |
        | **Enhanced policy learning** | **SHAC, PODS** | 解決長時域下的梯度(APG) 不穩定與效能瓶頸。  | 高維度控制（如 Humanoid）。  |
        </aside>
        
    - Neural Network Augmented Simulation
    
    <aside>
    💡
    
    Trajectory optimization vs. Policy optimization
    
    | **特性** | **軌跡優化 (Trajectory Optimization)** | **政策優化 (Policy Optimization)** |
    | --- | --- | --- |
    | **優化目標** | 找到一組「控制指令」序列 $u$  | 找到一個「控制函數」 $\pi(s)$  |
    | **控制類型** | 通常為開迴路 (Open-loop)  | 閉迴路 (Closed-loop/Reactive)  |
    | **計算時機** | 執行前進行昂貴的離線計算  | 離線訓練長，但在線執行極快  |
    | **適用場景** | **單一、精確的動作**路徑規劃  | 需要應對環境變化的動態控制任務  |
    | **可微模擬優勢** | 梯度非常準確，收斂極快  | 提供高品質梯度以加速策略收斂 |
    </aside>
    
- Summary
    
    https://www.youtube.com/watch?v=RyOb2WhPnRc
    

Callenges

- long horizon planning and control, the performance of differentiable simulators is hindered by landscape characteristics such as non-linearity, non-smoothness, and discontinuities.
- using deterministic gradients from these simulators can lead to sub-optimal behavior due to the inherent landscape characteristics.
- The phenomenon of ‘empirical bias’, where approximations of discontinuous dynamics lead to inaccuracies in gradient estimates
1. Future directions
    - Better Gradient Estimation
    - Leveraging Gradient Information
    - Long Horizon Tasks
    - Differentiable Sensor Simulation
    - Online Applications
    - Real-to-Sim Transfer Learning
    - Challenges for Widespread Adaptation

# Pipeline

1. System identification
2. Policy optimization
3. differential simulator: newton api
    1. obtain gradient tape