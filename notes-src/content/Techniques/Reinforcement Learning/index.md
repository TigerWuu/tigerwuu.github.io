---
title: "Reinforcement Learning"
tags: [topic]
---

# Handouts

Lecture_8_Deep_RL_Algorithms.pdf（PDF 講義未公開）

Lecture_5_Model_Free_Control.pdf（PDF 講義未公開）

Lecture_6_Value_Function_Approximation.pdf（PDF 講義未公開）

Lecture_7_Policy_Gradient_Methods.pdf（PDF 講義未公開）

Lecture_8_Deep_RL_Algorithms.pdf（PDF 講義未公開）

# Introduction

- Planning vs. Reinforcement Learning
    - Planning: there is environment (model) information, **transition probability**, and **reward**
    - Reinforcement Learning: No environment (model) information, **transition probability**, and **reward**
    
    |  | Planning | Reinforcement Learning |
    | --- | --- | --- |
    | Transition probability | V | X |
    | Reward | V | X |
- Prediction vs. Control
    - Prediction: giving a **fixed** policy to **evaluate** the future
    - Control: find the **best** policy $\pi$ to optimize the future
- MP vs. MRP vs. MDP
    - Markov process (MP): $<S,P>$
    - Markov reward process (MRP): MP + reward → $<S,P,R,\gamma>$
    - Markov decision process (MDP) MRP + action → $<S,A,P,R,\gamma>$
- Bellman Equation
    
    $$
    V(s) = R(s) + \gamma \sum_{s' \in S} P(s'|s) V(s')
    $$
    
    $$
    v = R + \gamma P v
    $$
    
    - Direct solution
        
        $$
        v = (I - \gamma P)^{-1} R
        $$
        
    - Iterative solution
        - Dynamic programming (known environment)
        - Monte Carlo evaluation (unknown environment)
        - Temporal difference evaluation (unknown environment)
- Bellman Expectation Equation vs. Bellman Optimality Equation
    - Bellman expectation equation: evaluate the **value/action value** function under a **fixed** policy
        - State value equation
            
            $$
            v_\pi(s) = \sum_{a \in A} \pi(a \mid s) \underbrace{\left( R_s^a + \gamma \sum_{s' \in S} P_{ss'}^a \, v_\pi(s') \right)}_{q_\pi(s,a)}
            $$
            
        - Action value equation
            
            $$
            q_\pi(s,a) = R_s^a + \gamma \sum_{s' \in S} P_{ss'}^a \underbrace{\sum_{a' \in A} \pi(a' \mid s') \, q_\pi(s', a')}_{v_\pi(s')}
            $$
            
    - Bellman optimality equation: evaluate the **value/action value** function under the **best** policy
        - State value equation
            
            $$
            v_*(s) = \max_{a} \left( R_s^a + \gamma \sum_{s' \in S} P_{ss'}^a \, v_*(s') \right)
            $$
            
        - Action value equation
            
            $$
            q_*(s,a) = R_s^a + \gamma \sum_{s' \in S} P_{ss'}^a \max_{a'} q_*(s', a')
            $$
            
- Dynamic programming
    
    For solving **the Bellman equation** 
    
    | Problem | Bellman Equation | Algorithm |
    | --- | --- | --- |
    | Prediction | Bellman expectation equation | Iterative policy evaluation |
    | Control | Bellman expectation equation+
    greedy policy improvement | Policy iteration |
    | Control | Bellman optimality equation | value iteration |
    - Policy iteration: find the current best action $(a)$ as a policy $\pi(a|s)$ to update the value function $(v(s))$
        - policy evaluation (value function $v(s)$) + policy improvement (e.g. greedy algorithm)
    - Value iteration: keep finding the best action value function $(q(s',a'))$ from the future to update the current value function $(v(s))$
    
- Monte Carlo vs. Temporal difference
    
    **Bootstrapping**: update involves an estimate
    
    |  | Monte Carlo | Temporal Difference |
    | --- | --- | --- |
    | Bootstrapping | X | V |
    | Termination state | V | not necessary |
    | Biased | zero | some |
    | Variance | high | low |
- Prediction & Control
    
    
    |  | Monte Carlo | Temporal Difference |
    | --- | --- | --- |
    | Prediction | MC learning | TD learning |
    | Control (on-policy) | MC control | SARSA |
    | Control (off-policy) |  | Q learning |
    - Prediction
        - Monte Carlo: No boostrapping, termination.
            
            $$
            V(s) = Return_{total}(s)/N(s)
            $$
            
            $Return_{total}(s)$ : incremental total return 
            
            $N(s)$: incremental counter
            
            ---
            
            $$
            V(s) \leftarrow V(s)+\frac{1}{N(s)}(G_t-V(s)) \\
            \downarrow \\
            V(s) \leftarrow V(s)+\alpha(G_t-V(s))
            $$
            
            $G_t$: current return
            
            $\alpha$: step size, $\in [0, 1]$
            
        - Temporal Difference: boostrapping, no need termination state.
            
            $$
            V(s_t) \leftarrow V(s_t)+\alpha(G_t-V(s_t)) \\ 
            \downarrow \\
            V(s_t) \leftarrow V(s_t)+\alpha(\textcolor{red}{R+\gamma V(s_{t+1})}-V(s_t)) \\
            $$
            
            $R_{t+1}+\gamma V(s_{t+1})$: TD target
            
            $R_{t+1}+\gamma V(s_{t+1})-V(s_t)$: TD error
            
        - TD$(\lambda)$: n-step temporal difference
    - Control
        - MC control
            
            policy evaluation (action value function $q(s,a)$)+ policy improvement ($\epsilon$-greedy algorithm)
            
            $$
            q(s,a) \leftarrow q(s,a)+\alpha(G_t-q(s,a))
            $$
            
            - $\epsilon$-greedy algorithm proof
                
                ![[assets/image 2.png]]
                
        - SARSA
            
            $$
            q(s_t,a_t) \leftarrow q(s_t,a_t)+\alpha(R+\gamma q(s_{t+1},a_{t+1})-q(s_t,a_t))
            $$
            
            <aside>
            💡
            
            Choose $a_{t+1}$ from $s_{t+1}$  using **$\epsilon$-greedy** algorithm
            
            Choose $a_t$ from $s_t$  using **$\epsilon$-greedy** algorithm
            
            </aside>
            
        - n-step SARSA
        - Q learning: two policy exist
            1. behavior policy: $\mu(A|s_t), a \in A$ , $a \rightarrow a_{t+1}$
            2. target policy: $\pi(A|s_t), a \in A$, $a \rightarrow a'$
            
            $$
            q(s_t,a_t) \leftarrow q(s_t,a_t)+\alpha(R+\gamma \max_{a'} q(s',a')-q(s_t,a_t))
            $$
            
            <aside>
            💡
            
            choose $a'$  from $s'$  using **greedy** algorithm
            
            Choose $a_t$ from $s_t$  using **$\epsilon$-greedy** algorithm
            
            </aside>
            
- On-policy RL vs. off-policy RL
    
    ![[assets/image 3.png]]
    
    - On-policy RL: not reuse the data, not sample efficiency.
    - Off-policy RL: reuse the data, sample efficiency.
- Online RL vs. offline RL
    - Online RL: interacts with the environment during training
    - Offline RL: not interact with the environment during training (the dataset is collected in advance)
- Model-free RL vs. model-based RL
    - Model-free:
    - Model-based:
- Tabular RL vs. scale-up RL
    
    
    |  | Tabular | Scale-up |
    | --- | --- | --- |
    | State space | finite set | Large set or infinite set (continuous) |
    | Action space | finite set | Large set or infinite set (continuous) |
- Scale-up RL
    - Value function approximation
        
        **Goal**: find a parameter vector $\mathbf{w}$ minimizing mean-squared error between the true value
        function $v_\pi(s)$ and its approximation $\hat{v}(s,\mathbf{w})$
        
        $$
        \hat{v}(s,\bold{w})\approx v_\pi(s) \\
        \hat{q}(a, s,\bold{w})\approx q_\pi(s,a) \\
        $$
        
        $\bold w$ : neural network parameters
        
        <aside>
        💡
        
        generalize from seen states to unseen states
        
        </aside>
        
        - <u>***weight update induction :***</u>
            
            $$
            J(\mathbf{w}) = \mathbb{E}_{\pi}[(v_{\pi}(S) - \hat{v}(S, \mathbf{w}))^{2}]
            $$
            
            $$
            \begin{aligned} \Delta \mathbf{w} &= -\frac{1}{2} \alpha \nabla_{\mathbf{w}} J(\mathbf{w}) \\ &= \alpha \mathbb{E}_{\pi}[(v_{\pi}(S) - \hat{v}(S, \mathbf{w})) \nabla_{\mathbf{w}} \hat{v}(S, \mathbf{w})] \end{aligned}
            $$
            
            - Stochastic gradient descent (SGD)
                
                $$
                \Delta \mathbf{w} = \alpha (v_{\pi}(S) - \hat{v}(S, \mathbf{w})) \nabla_{\mathbf{w}} \hat{v}(S, \mathbf{w})
                $$
                
            - How to solve $\nabla_{\mathbf{w}} \hat{v}(S, \mathbf{w})$? Ans: Represent the value function by a **linear combination of features**
                
                Feature
                
                $$
                \mathbf{x}(S) = 
                \left[
                x_1(S)\quad x_2(S) \quad ...\quad x_n(S)
                \right]^\top
                $$
                
                <aside>
                💡
                
                Features ($\mathbf{x}(S)$) can be obtained from observation (feature engineer) or an encoder (learning-based)  
                
                </aside>
                
                value function by a linear combination of features
                
                $$
                \hat{v}(S, \mathbf{w}) = \mathbf{x}(S)^\top \mathbf{w} = \sum_{j=1}^{n} \mathbf{x}_j(S) \mathbf{w}_j
                $$
                
                The loss function and update $\Delta w$ can be represented as follows
                
                - loss function
                
                $$
                J(\mathbf{w}) = \mathbb{E}_{\pi}[(v_{\pi}(S) - \textcolor{red}{\mathbf{x}(S)^\top \mathbf{w}})^{2}]
                $$
                
                - $\Delta \mathbf{w}$
                
                $$
                \Delta \mathbf{w} = \alpha (v_{\pi}(S) - \hat{v}(S, \mathbf{w})) \textcolor{red}{\mathbf{x}(S)}
                $$
                
            - We don’t have ground truth $v_{\pi}(S)$, how?
                - For MC, using $G_t$ instead.
                    
                    $$
                    \Delta \mathbf{w} = \alpha (\textcolor{red}{G_t} - \hat{v}(S, \mathbf{w})) \mathbf{x}(S)
                    $$
                    
                - For TD(0), using TD target instead.
                    
                    $$
                    \Delta \mathbf{w} = \alpha (\textcolor{red}{R_t+\gamma\hat{v}(S_{t+1},\mathbf{w})} - \hat{v}(S, \mathbf{w})) \mathbf{x}(S)
                    $$
                    
            
            <aside>
            💡
            
            $\mathbb{E}_{\pi}$: 根據 $\pi$ 這個policy 算出來的期望值
            
            $\nabla_{\mathbf{w}} \hat{v}(S, \mathbf{w})$: 用chain rule 打開也可以算 (back propagation)
            
            </aside>
            
        - Action-value function approximation
            
            action-in vs. action-out
            
            ![[assets/image 4.png]]
            
    - Policy gradient
        
        **Goal**: given a policy  $π_\theta(s, a)$  with parameters $\theta$, find best $\theta$
        
        $$
        \pi_\theta(s, a) = \mathbb{P}[a\mid s, \theta]
        $$
        
        <aside>
        💡
        
        $\pi_\theta(s, a)$ 意思是 $a$ 在 當下 $s$  以及參數 $\theta$ 的 條件機率
        
        $\pi_\theta(s, \cdot)$ 意思是在 $s$  以及參數 $\theta$ 的情況下 $a$ 的條件機率分布(e.g. gaussian)
        
        ![[assets/image 5.png]]
        
        </aside>
        
        - How to measure the quality of  $π_\theta(s, a)$  ? → How do we define how best $\theta$  is?
            - Episodic environments: start value
                
                $$
                J(\theta) = V^{\pi_\theta}(s_1) = \mathbb{E}_{\pi_\theta}[v_1]
                $$
                
            - Continuing environments
                
                average value
                
                $$
                J(\theta) = \sum_{s} d^{\pi_\theta}(s) V^{\pi_\theta}(s)
                $$
                
                Average Reward per time-step
                
                $$
                J(\theta) = \sum_{s} d^{\pi_\theta}(s) \sum_{a} \pi_\theta(s, a) R_s^a
                $$
                
                - $d^{\pi_\theta}(s)$: 在 $\pi_\theta$ 這個policy 下，平均停留在 state $s$ 的機率
                - $\sum_{a} \pi_\theta(s, a) R_s^a$: 在 $\pi_\theta$ 這個policy下，這個state s 獲得Reward的期望值
                
                <aside>
                💡
                
                如果action 跟 state 是連續的，公式應該改成積分式, e.g. 
                $J_{avR}(\theta) = \int_{S} d^{\pi_\theta}(s) \int_{A} \pi_\theta(a|s) R_s^a \, da \, ds$
                
                </aside>
                
        
        **Goal:** Find $\theta$ that maximizes $J(\theta)$
        
        $$
        \theta_{new} = \theta_{old} + \Delta\theta 
        $$
        
        $$
        \Delta\theta = \alpha \nabla_\theta J(\theta)
        $$
        
        $\nabla_\theta J(\theta) = \begin{bmatrix}
        \frac{\partial J(\theta)}{\partial \theta_1} \
        \cdots \
        \frac{\partial J(\theta)}{\partial \theta_n}
        \end{bmatrix}^\top$: **policy gradient**
        
        **Goal:**  Compute $\nabla_\theta J(\theta)$ → compute the $\nabla_\theta \pi_\theta(s, a)$
        
        **Goal:**  Compute the $\nabla_\theta \pi_\theta(s, a)$
        
        $$
        \begin{aligned}
        \nabla_\theta \pi_\theta(s, a) &= \pi_\theta(s, a) \frac{\nabla_\theta \pi_\theta(s, a)}{\pi_\theta(s, a)} \\
        &= \pi_\theta(s, a) \nabla_\theta \log \pi_\theta(s, a)
        \end{aligned}
        $$
        
        - score function derivation
            
            $$
            \begin{aligned}
            \frac{\nabla_\theta \pi_\theta(s, a)}{\pi_\theta(s, a)} & = 
            \frac{1}{\pi_\theta(s,a)} \cdot \frac{d\pi_\theta(s,a)}{d\theta} \\&= \frac{d \log \pi_\theta(s,a)}{d\pi_\theta(s,a)} \cdot \frac{d\pi_\theta(s,a)}{d\theta} \\
            &= \frac{d \log \pi_\theta(s,a)}{d\theta} \\
            &= \nabla_\theta \log \pi_\theta(s, a)
            \end{aligned}
            $$
            
        
        $\nabla_\theta \log \pi_\theta(s, a)$: score function, the gradient of the log-likelihood function
        
        <aside>
        💡
        
        $\pi_\theta(s, a)$: likelihood function, the case that sample number n = 1
        
        </aside>
        
        <aside>
        💡
        
        $\nabla_\theta \pi_\theta(s, a)$: 可以被auto diff 等方法算出，但是之後要算$\nabla_\theta J(\theta)$ 會需要每個state 的$R^a_s$，但我們沒辦法得到每一個state的$R^a_s$(太複雜無法遍歷)，我們希望得到期望值的形式(機率x數值)，這樣就可以用sampling 來更新參數
        
        </aside>
        
        **Goal:**  Compute the score function $\nabla_\theta \log \pi_\theta(s, a)$
        
        Discrete action space: Softmax policy
        
        $$
        \pi_{\theta}(s, a) = \frac{e^{\phi(s, a)^T \theta}}{\sum_{a' \in A} e^{\phi(s, a')^T \theta}}
        $$
        
        <aside>
        💡
        
        A 是finite action set. update $\theta$ 等於是udpate 每一個action a 出現的機率
        
        </aside>
        
        Score function 
        
        $$
        \nabla_{\theta} \log \pi_{\theta}(s, a) = \phi(s, a) - \mathbb{E}_{\pi_{\theta}}[\phi(s, \cdot)]
        $$
        
        - score function derivation
            
            Take the log of $\pi_\theta(s,a)$
            
            $$
            \log \pi_{\theta}(s, a) = \phi(s, a)^T \theta - \log \sum_{a'} e^{\phi(s, a')^T \theta}
            $$
            
            <aside>
            💡
            
            $\log(\frac{A}{B}) = \log A - \log B$
            
            </aside>
            
            Take the gradient
            
            $$
            \nabla_{\theta} \log \pi_{\theta}(s, a) =  \nabla_{\theta} (\phi(s, a)^T \theta) - \nabla_{\theta} \log \sum_{a'} e^{\phi(s, a')^T \theta}
            $$
            
            - The first term
            
            $$
             \nabla_{\theta} (\phi(s, a)^T \theta) = \phi(s, a)
            $$
            
            - The second term
            
            $$
            \begin{aligned}
            \nabla_{\theta} \log \sum_{a'} e^{\phi(s, a')^T \theta} & = \frac{\sum_{a'} e^{\phi(s, a')^T \theta} \cdot \phi(s, a')}{\sum_{a''} e^{\phi(s, a'')^T \theta}} \\
            & = \sum_{a'} \left( \frac{e^{\phi(s, a')^T \theta}}{\sum_{a''} e^{\phi(s, a'')^T \theta}} \right) \phi(s, a') \\ 
            & = \sum_{a'} \pi_{\theta}(s, a') \phi(s, a') \\
            & = \mathbb{E}_{\pi_{\theta}}[\phi(s, \cdot)]
            \end{aligned}
            $$
            
            Score function
            
            $$
            \nabla_{\theta} \log \pi_{\theta}(s, a) = \phi(s, a) - \mathbb{E}_{\pi_{\theta}}[\phi(s, \cdot)]
            $$
            
            <aside>
            💡
            
            score function = current feature vector - feature vector expectation 
            
            </aside>
            
        
        Continuous action space: Gaussian policy
        
        Mean: $\mu(s) = \phi(s)^\top \theta$
        
        Variance: $\sigma^2$ (assume fixed number)
        
        $$
        \pi_\theta(s, a) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp \left( -\frac{(a - \phi(s)^\top \theta)^2}{2\sigma^2} \right)
        $$
        
        Score function 
        
        $$
        \nabla_\theta \log \pi_\theta(s, a) = \frac{(a - \mu(s))\phi(s)}{\sigma^2}
        $$
        
        <aside>
        💡
        
        直觀的說 $(a - \mu(s))$ 決定了參數 $\theta$ 更新的幅度
        
        </aside>
        
        - score function derivation
            
            TBD
            
        
        Caculate the policy gradient $\nabla_\theta J(\theta)$
        
        - Policy gradient for one-step MDP
            
            We try to maximize the estimation of total reward $J(\theta)$
            
            $$
            \begin{aligned}
            J(\theta) & = \mathbb{E}_{\pi_\theta}[r] \\ & = \sum_{s \in S} d(s) \sum_{a \in A} \textcolor{red}{\pi_\theta(s, a) }R_{s,a} \\\nabla_\theta J(\theta) & = \sum_{s \in S} d(s) \sum_{a \in A} \textcolor{red}{\pi_\theta(s, a) \nabla_\theta \log \pi_\theta(s, a)} R_{s,a} \\ & = \mathbb{E}_{\pi_\theta}[\nabla_\theta \log \pi_\theta(s, a) r]
            \end{aligned}
            $$
            
            Gradient ascent
            
            $$
            \theta_{t+1} = \theta_t+\alpha \nabla_\theta J(\theta_t)
            $$
            
            <aside>
            💡
            
            policy gradient: depends on discrete or continuous → anyway, we can obtain it.
            
            r: reward can be obtained after one step. 
            
            → Traditional update weighting techniques in ML can be applied (e.g. SGD, ADAM…)
            
            </aside>
            
        - Policy gradient for multi-step MDP → introduce **policy gradient theorem**
            
            We try to maximize the estimation of total reward $J(\theta)$
            
            trajectory $\tau = (s_0, a_1, s_1, a_2, \dots, s_T)$
            
            trajectory total reward $r(\tau)$
            
            $$
            \begin{aligned}
            J(\theta) & = \mathbb{E}_{\pi_\theta} [r(\tau)] \\
            & = \int \pi_\theta(\tau) r(\tau) d\tau
            \end{aligned}
            $$
            
            $$
            \begin{aligned}
            \nabla_\theta J(\theta) & = \nabla_\theta \int \pi_\theta(\tau) r(\tau) d\tau \\
            & = \int \textcolor{red}{\nabla_\theta \pi_\theta(\tau)} r(\tau) d\tau \\
            & = \int \textcolor{red}{\pi_\theta(\tau) \nabla_\theta \log \pi_\theta(\tau)} r(\tau) d\tau \\
            & = \mathbb{E}_{\pi_\theta} [ r(\tau) \nabla_\theta \log \pi_\theta(\tau)]
            \end{aligned}
            $$
            
            How to get $\nabla_\theta \log \pi_\theta(\tau)$ ?
            
            $$
            \pi_\theta(\tau) = \underbrace{P(s_0)}_{\text{1. 初始狀態機率}} \times \underbrace{\prod_{t=1}^T \pi_\theta(a_t \mid s_t)}_{\text{2. 策略大腦的選擇 (連乘)}} \times \underbrace{\prod_{t=1}^T p(s_{t+1} \mid s_t, a_t)}_{\text{3. 環境物理轉移 (連乘)}}
            $$
            
            $$
            \log \pi_\theta(\tau) = \log P(s_0) + \sum_{t=1}^T \log \pi_\theta(a_t \mid s_t) + \sum_{t=1}^T \log p(s_{t+1}, r_{t+1} \mid s_t, a_t)
            $$
            
            $$
            \nabla_\theta \log \pi_\theta(\tau) = \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t)
            $$
            
            Put $\nabla_\theta \log \pi_\theta(\tau)$ back into gradient of the estimation of the total reward $\nabla_\theta J(\theta)$
            
            $$
            \nabla_\theta J(\theta) = \mathbb{E}_{\pi_\theta} \left[ r(\tau) \left( \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t) \right) \right]
            $$
            
            Gradient ascent
            
            $$
            \theta_{t+1} = \theta_t+\alpha \nabla_\theta J(\theta_t)
            $$
            
            <aside>
            💡
            
            By the policy gradient theorem, we don’t need to know
            
            1. Ergodic distribution of states $(P)$
            2. Environment dynamics $(p)$
            
            We can still obtain the policy gradient through sampling.
            
            </aside>
            
        
        **Policy gradient theorem** 
        
        1. Trajectory level 
            
            $$
            \nabla_\theta J(\theta) = \mathbb{E}_{\pi_\theta} \left[ r(\tau) \left( \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t) \right) \right]
            $$
            
        2. State-action level
            
            $$
            \nabla_\theta J(\theta) = \mathbb{E}_{\pi_\theta} \left[ Q^{\pi_\theta}(s, a)  \nabla_\theta \log \pi_\theta(s, a) \right]
            $$
            
        - Derivation of the trajectory level to the state-action level
            
            [[Techniques/Reinforcement Learning/策略梯度定理推導：從軌跡視角到狀態-動作對視角|**策略梯度定理推導：從軌跡視角到狀態-動作對視角**]]
            
        - Monte-Carlo policy gradient (REINFORCE)
            
            ![[assets/image 6.png]]
            
        - Actor-critic policy gradient
            
            Solve the high gradient of REINFORCE → using **approximate policy gradient**
            
            $$
            \begin{aligned}
            \nabla_\theta J(\theta) & = \mathbb{E}_{\pi_\theta} \left[ Q^{\pi_\theta}(s, a)  \nabla_\theta \log \pi_\theta(s, a) \right] \\
            & \approx \mathbb{E}_{\pi_\theta} \left[ Q_w^{\pi_\theta}(s, a)  \nabla_\theta \log \pi_\theta(s, a) \right]
            \end{aligned}
            $$
            
            ![[assets/image 7.png]]
            
        - Policy gradient method summary
            
            
            | Method | $\nabla_\theta J(\theta)$ |
            | --- | --- |
            | **REINFORCE** | $\mathbb{E}_{\pi_\theta}[\nabla_\theta \log \pi_\theta(s, a)v_t]$ |
            | **Q Actor-Critic** | $\mathbb{E}_{\pi_\theta}[\nabla_\theta \log \pi_\theta(s, a)Q^{\mathbf{w}}(s, a)]$ |
            | **Advantage Actor-Critic** | $\mathbb{E}_{\pi_\theta}[\nabla_\theta \log \pi_\theta(s, a)A^{\mathbf{w}}(s, a)]$ |
            | **TD Actor-Critic** | $\mathbb{E}_{\pi_\theta}[\nabla_\theta \log \pi_\theta(s, a)\delta]$ |
            | **TD($\lambda$) Actor-Critic** | $\mathbb{E}{\pi\theta}[\nabla_\theta \log \pi_\theta(s, a)\delta e]$ |
            - $A^{\pi_\theta}(s, a) = Q^{\pi_\theta}(s, a) - V^{\pi_\theta}(s)$
- Value-based vs. policy-based vs. actor-critic
    - value-based: value function approximation
    - policy-based: policy gradient method
        - Monte-carlo policy gradient (REINFORCE)
    - actor-critic: because REINFORCE has high variance
        
        ![[assets/image 8.png]]
        
        - $Q(s,a)$ is the actual return of one trajectory
        - Use an auxiliary **critic** (value approximation) to estimate the $Q(s,a)$
    
    |  | Value approximation | Policy gradient |  |
    | --- | --- | --- | --- |
    | State space | Infinite | Infinite |  |
    | Action space | Discrete
    (greedy algorithm) | Discrete/Continuous
    (Softmax/Gaussian) |   • softmax 後直接選機率最大的
      • gaussian output $\sigma, \mu$  |
    | Policy  | **Deterministic $(\uparrow, \downarrow, \leftarrow, \rightarrow)$** | **Stochastic** |  |
    | Convergence | Bad | Good |  |
- QN vs. DQN
    
    類似但實則不同，難以言傳需意會
    
    QN : 目標是多次sampling然後得到Q的最佳值平均 → minimize 括號內的值
    
    ![[assets/image 9.png]]
    
    DQN : 目標是直接 minimize 括號內的值(所以也可以用LS)
    
    ![[assets/image 10.png]]
    

# Reinforcement Learning Algorithm

# Deep Reinforcement Learning Algorithm

## Deep reinforcement learning algorithm(value approximation, policy gradient)

- DQN
    
    $$
    \mathcal{L}_i(w_i) = \mathbb{E}_{s,a,r,s' \sim D_i} \left[ \left( r + \gamma \max_{a'} Q(s', a'; w_i^-) - Q(s, a; w_i) \right)^2 \right]
    $$
    
- DDPG: Deep Deterministic Policy Gradient
    - off-policy, actor-critic, continuous action
    - DQN can only deal with discrete action space → replace $a$ with policy network $\mu(s_{t}|\theta^\mu)$
        
        $$
        \mathcal{L}(\theta^Q) = \mathbb{E}_{s,a,r,s' \sim D_i} \left[ \left( r + \gamma Q'(s_{t+1}, \mu'(s_{t+1}\vert{}\theta^{\mu'})\vert{}\theta^{Q'}) - Q(s_t, a_t\vert{}\theta^Q) \right)^2 \right]
        $$
        
        1. maximize $Q'(s_{t+1}, \mu'(s_{t+1}\vert{}\theta^{\mu'})\vert{}\theta^{Q'})$
        2. minimize $r + \gamma Q'(s_{t+1}, \mu'(s_{t+1}\vert{}\theta^{\mu'})\vert{}\theta^{Q'}) - Q(s_t, a_t\vert{}\theta^Q)$
    
- TD3: Twin Delayed DDPG
    - off-policy, actor-critic, continuous action
- D4PG: Distributed Distributional Deterministic Policy Gradients
    - off-policy, actor-critic, continuous action
- A2C: Advantage Actor Critic
    - use advantage function $(A)$ instead of action value function $(Q)$ to update the policy
    - Use the state value function $V(s)$ as the baseline function
- A3C: Asynchronous Advantage Actor Critic
    - on-policy, actor-critic, continuous action
- TRPO: Trust region policy optimization
    - on-policy, actor-critic, continuous action
    - Constraint the policy changes so that we do not make too aggressive moves
    - We want to
        1. guarantee the improvement in rewards
        2. limit the change in the policy behaviors
    - Minorize-maximization algorithm (MM algorithm)
        1. Find a lower bound M approximating the expected reward η locally at the current guess
        2. We locate the optimal point for M and use it as the next guess
            
            ![[assets/image 11.png]]
            
    - Optimization strategy
        1. line search → like gradient descent/ascent
        2. trust region → First decide the step size $\alpha$ and then construct a region (i.e., trust region) by considering the $\alpha$ as the radius of the circle
        
        <aside>
        💡
        
        Why is the **trust region** better than **line search**?
        
        trust region can avoid a saddle point optimization situation.
        
        </aside>
        
    - Importance sampling
        - 我們想要用舊policy $\pi_\theta(a|s)$ 產生出的軌跡來update 新 policy $\pi_{\theta'}(a|s)$
            
            $$
            J(\theta') = \mathbb{E}_{\tau \sim \pi_{\theta'}} [r(\tau)] = \mathbb{E}_{\tau \sim \pi_\theta} \left[ \frac{\pi_{\theta'}(\tau)}{\pi_\theta(\tau)} r(\tau) \right]
            $$
            
                                                                                                                                                               $\downarrow$
            
            $$
            \nabla_{\theta'} J(\theta') = \mathbb{E}_{\tau \sim \pi_\theta(\tau)} \left[ \sum_{t=1}^T \nabla_{\theta'} \log \pi_{\theta'}(a_t\vert{}s_t) \left( \prod_{t'=1}^t \frac{\pi_{\theta'}(a_{t'}\vert{}s_{t'})}{\pi_\theta(a_{t'}\vert{}s_{t'})} \right) \left( \sum_{t'=t}^T r(s_{t'}, a_{t'}) \right) \right]
            $$
            
    - TRPO objective
        - Construct a lower bound function for MM algorithm
        - When updating the policy, we want to
            1. Limit the change in the policy behaviors: KL-divergence constraint
            2. Guarantee improvement in rewards: MM algorithm
- PPO: Proximal policy optimization
    - on-policy, actor-critic, first-order, policy gradient
    - Make the first order derivative solution, like the gradient descent, closer to the secondorder
    derivative solution by adding soft constraints:
    - Generalized Advantage Estimation (GAE)
        
        https://zhuanlan.zhihu.com/p/682710138
        
    - PPO-Penalty
    - PPO-Clip
- SAC: Soft actor critic
    - off-policy, actor-critic, policy gradient
    - Maximum entropy reinforcement learning
    - Soft Q learning
    - Reparameterization trick
    - model
        - actor
        - critic