---
title: "Accelerated Policy Learning with Parallel Differentiable Simulation (SHAC)"
tags: [paper]
---

- website
    
    https://short-horizon-actor-critic.github.io/
    

# Background knowledge

- Reparameterization sampling method
- backpropagation through time (BPTT)  → [[Concepts/Backpropagation Through Time|Backpropagation Through Time]]
- truncated backpropagation through time (TBPTT)  → [[Concepts/Backpropagation Through Time|Backpropagation Through Time]]
- soft update (DDPG) vs. hard update (DQN)  → [[Techniques/Reinforcement Learning/index|Reinforcement Learning]]

# Scenario

Using first-order policy gradient to leverage the power of a differentiable simulator, which accelerates the process of training. 

# Theory & Technique

- BPTT (gradient explode) → TBPTT (no consider the future value) → SHAC
- Short Horizon Actor-Critic (SHAC)
    
    Actor
    
    $$
    \mathcal{L}_{\theta} = -\frac{1}{Nh} \sum_{i=1}^{N} \left[ \left( \sum_{t=t_0}^{t_0+h-1} \gamma^{t-t_0} \mathcal{R}(\mathbf{s}_t^i, \mathbf{a}_t^i) \right) + \gamma^h V_\phi(\mathbf{s}_{t_0+h}^i) \right]
    $$
    
    Critic
    
    $$
    \mathcal{L}_{\phi} = \mathbb{E}_{\mathbf{s} \in \{\tau_i\}} \left[ \Vert{} V_{\phi}(\mathbf{s}) - \tilde{V}(\mathbf{s}) \Vert{}^2 \right]
    $$
    
    $$
    \tilde{V}(\mathbf{s}_t) = (1 - \lambda) \left( \sum_{k=1}^{h-t-1} \lambda^{k-1} G_t^k \right) + \lambda^{h-t-1} G_t^{h-t},
    $$
    
    $$
    G_t^k = \left( \sum_{l=0}^{k-1} \gamma^l r_{t+l} \right) + \gamma^k V_\phi(\mathbf{s}_{t+k})
    $$
    
    - $\mathcal{L}_{\theta}$ update
        
        Calculate the adjoint from the last step in **reverse order,** we assume $h = 32$, **$t_0 = 0$,** $i$  represents the $i$ th trajectory
        
        <aside>
        💡
        
        計算出每一個時刻$(t)$的$\frac{\partial\mathcal{L_\theta}}{\partial a_t}$ → 可以求出$\frac{\partial\mathcal{L_\theta}}{\partial \theta}$
        
        </aside>
        
        1. Loss function for actor
        
        $$
        \mathcal{L}_{\theta} = -\frac{1}{Nh} \sum_{i=1}^{N} \left[ \left( \sum_{t=t_0}^{t_0+h-1} \gamma^{t-t_0} \mathcal{R}(\mathbf{s}_t^i, \mathbf{a}_t^i) \right) + \gamma^h V_\phi(\mathbf{s}_{t_0+h}^i) \right]
        $$
        
        1. Terminal gradient $t = 32 = t_0+h$
            
            $$
            \frac{\partial \mathcal{L}_\theta}{\partial \mathbf{s}^i_{t_0+h}} = -\gamma^h \frac{1}{Nh} \frac{\partial V_\theta(\mathbf{s}^i_{t_0+h})}{\partial \mathbf{s}^i_{t_0+h}} \tag{9} 
            $$
            
        2. Calculate $\frac{\partial\mathcal{L_\theta}}{\partial a_t}$ and $\frac{\partial\mathcal{L_\theta}}{\partial s_t}$ in  $0 \le t < 32$, from $t = 31$.
            
            $$
            \frac{\partial \mathcal{L}_\theta}{\partial \mathbf{s}^i_t} = -\gamma^{t-t_0} \frac{1}{Nh} \frac{\partial \mathcal{R}(\mathbf{s}^i_t, \mathbf{a}^i_t)}{\partial \mathbf{s}^i_t} + \left(\frac{\partial \mathcal{L}_\theta}{\partial \mathbf{s}^i_{t+1}}\right) \left( \left(\frac{\partial \mathcal{F}}{\partial \mathbf{s}^i_t}\right) + \left(\frac{\partial \mathcal{F}}{\partial \mathbf{a}^i_t}\right)\left(\frac{\partial \pi_\theta(\mathbf{s}^i_t)}{\partial \mathbf{s}^i_t}\right) \right) \tag{10} 
            $$
            
            $$
            \frac{\partial \mathcal{L}_\theta}{\partial \mathbf{a}^i_t} = -\gamma^{t-t_0} \frac{1}{Nh} \frac{\partial \mathcal{R}(\mathbf{s}^i_t, \mathbf{a}^i_t)}{\partial \mathbf{a}^i_t} + \left(\frac{\partial \mathcal{L}_\theta}{\partial \mathbf{s}^i_{t+1}}\right) \left(\frac{\partial \mathcal{F}}{\partial \mathbf{a}^i_t}\right) \tag{11}
            $$
            
            <aside>
            💡
            
            (9) 可以帶入 (10), $\frac{\partial \mathcal{L}_\theta}{\partial \mathbf{s}^i_{32}}$  → $\frac{\partial \mathcal{L}_\theta}{\partial \mathbf{s}^i_{31}}$ 
            
            (9) 可以帶入 (11), $\frac{\partial \mathcal{L}_\theta}{\partial \mathbf{s}^i_{32}}$  → $\frac{\partial \mathcal{L}_\theta}{\partial \mathbf{a}^i_{31}}$ 
            
            以此類推，迭代得到 
            
            $$
            \frac{\partial \mathcal{L}_\theta}{\partial \mathbf{a}^i_{31}}, \frac{\partial \mathcal{L}_\theta}{\partial \mathbf{a}^i_{30}}, \cdots , \frac{\partial \mathcal{L}_\theta}{\partial \mathbf{a}^i_{0}}  
            $$
            
            </aside>
            
        3. Derive  $\frac{\partial\mathcal{L_\theta}}{\partial \theta}$
            
            $$
            \frac{\partial \mathcal{L}_\theta}{\partial \theta} = \sum_{i=1}^{N} \sum_{t=t_0}^{t_0+h-1} \left(\frac{\partial \mathcal{L}_\theta}{\partial \mathbf{a}^i_t}\right) \left(\frac{\partial \pi_\theta(\mathbf{s}^i_t)}{\partial \theta}\right) \tag{12}
            $$
            
            Update $\theta$ with ADAM
            
            <aside>
            💡
            
            $\left(\frac{\partial \pi_\theta(\mathbf{s}^i_t)}{\partial \theta}\right)$needs a **reparameterization sampling method**
            
            </aside>
            

# Representative Schematic

![[assets/image 100.png]]

![[assets/image 101.png]]

- SHAC algorithm
    
    ![[assets/image 102.png]]
    

# Simulation & Experiment

![[assets/image 103.png]]

- No critic: TBPTT

# Future work

1. Adaptive short horizon (different h ?)