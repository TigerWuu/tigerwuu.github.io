---
title: "Optimization"
tags: [concept]
---

# Bayes Filter

---

## Resources

- Probabilistic Robotics Textbook Chapter 2

## Basic Probability Concept

1. Basic definition
    
    $$
    \begin{align}
    p(X=x) = P[X=x] = P_X(x)
    \end{align}
    $$
    
    <aside>
    💡 $p(X=x)$ is used in this textbook. **R.V. distribution** and **probability of event** is mixed !!!
    
    </aside>
    
2. Bayes rule
    
    $$
    \begin{align}
    p(x|y) = \frac{p(y|x)p(x)}{p(y)} = \frac{f_{Y|X}(y|x)f_X(x)}{f_Y(y)}
    \end{align}
    $$
    
    <aside>
    💡 **R.V. distribution‘s** bayes rule
    
    </aside>
    
    $$
    \begin{align}
    p(x|y,z) = \frac{p(y|x,z)p(x|z)}{p(y|z)} 
    \end{align}
    $$
    
    - <u>***proof:***</u>
        
        $$
        \begin{align}
        p(x|y,z) 
        & = \frac{p(y,z|x)p(x)}{p(y,z)} \\
        & = \frac{p(y,z,x)}{p(y,z)} \\
        & = \frac{p(y|z,x)p(z,x)}{p(y|z)p(z)} \\
        & = \frac{p(y|z,x)p(x|z)p(z)}{p(y|z)p(z)} \\
        & = \frac{p(y|x,z)p(x|z)}{p(y|z)}\\ 
        
        \end{align}
        $$
        
    
    <aside>
    💡 **Bayes rule** constructs the basic structure of the **Bayes filter**
    
    </aside>
    
3. Theorem of total probability
    
    if $y \in$  event space, then the following equations established
    
    $$
    \begin{align}
    & p(x) = \sum_y{p(x|y)p(y)} \\
    & p(x) = \int{p(x|y)p(y)}dy
    \end{align}
    $$
    

## Robot Environment Interaction

- **Robot States**
    
    $$
    \begin{align}
    x_{t_1:t_2}=x_{t_1},x_{t_1+1},x_{t_1+2},...,x_{t_2}
    \end{align}
    $$
    
    - **Complete** state v.s. **Incomplete** state
        - **Complete**: the best predictor of the future
            
            $x_t$ 包含了過去的所有訊息($x_{t_0:t-1},u_{t_0:t-1},z_{t_0:t-1}$)，已經足夠來預測未來的狀態(state) → 符合 ***Markov chains*** 
            
        - **Incomplete**: any state is not included in the Complete state.
- **Measurement data**
    
    $$
    \begin{align}
    z_{t_1:t_2}=z_{t_1},z_{t_1+1},z_{t_1+2},...,z_{t_2}
    \end{align}
    $$
    
- **Control data**
    
    $$
    \begin{align}
    u_{t_1:t_2}=u_{t_1},u_{t_1+1},u_{t_1+2},...,u_{t_2}
    \end{align}
    $$
    

## Probabilistic Generative Laws

Robots’ states at time t($x_t$) is governed by the following equation : 

$$
\begin{align}
p(x_t|x_{0:t-1},z_{1:t-1},u_{1:t})
\end{align}
$$

<aside>
💡 透過過去的(states, measurements, controls), 來估計目前狀態($x_t$)的機率分布

</aside>

By applying ***Markov chain***

$$
\begin{align}
& p(x_t|x_{0:t-1},z_{1:t-1},u_{1:t-1}) \quad & \Rightarrow\quad 
&p(x_t|x_{t-1},u_{t}) \\
& p(z_t|x_{0:t},z_{1:t-1},u_{1:t})  \quad & \Rightarrow \quad & p(z_t|x_{t})
\end{align}
$$

Define

$p(x_t|x_{t-1},u_{t}) :=$  ***state transition probability***

$p(z_t|x_{t}):=$ ***measurement probability***

<aside>
💡 ***state transition probability*** 和 ***measurement probability*** 可以用來完整描述機器人的以及環境的動態

</aside>

## Belief

**Belief** means the **states** that is inferred by the **robot** from **datas**

$$
\begin{align}
& bel(x_t) \quad & \Rightarrow\quad 
&p(x_t|z_{1:t},u_{1:t}) \\
&  \bar{bel}(x_t) \quad & \Rightarrow \quad &p(x_t|z_{1:t-1},u_{1:t})
\end{align}
$$

<aside>
💡 **belief** 表示從資料(measurements, controls)中算出的狀態(state)

</aside>

- $x_t, u_t,z_t$ evolution relationship:
    
    ![[assets/Untitled.png]]
    

## Bayes Filters

***Bayes Filters*** is an algorithm to calculate the **belief** from **measurement**$(z_t)$ and **control data**$(u_t)$

- **Pseudocode**
    
    $$
    \begin{align*}
    & Bayes\_filter(bel(x_{t−1}), u_t, z_t): \\
    & \quad for \ all \ x_t : \\
    & \quad \quad \bar{bel}(xt) =\int
    p(x_t | u_t, x_{t−1}) bel(x_{t−1}) dx_{t−1} \\
    & \quad \quad bel(xt) = η p(z_t | x_t) \bar{bel}(x_t)\\
    & \quad endfor \\
    & \quad return \ bel(x_t)
    \end{align*}
    $$
    
    - <u>***proof:***</u>
        - Two assumptions
            1. state $(x_t)$ is **complete**
            2. controls $(u_t)$ is chosen randomly (?)
        1. Apply **Bayes rule** to the target posterior($bel(x_t)$)
            
            $$
            \begin{align}
            bel(x_t)
            & =p(x_t|z_{1:t},u_{1:t})=\frac{p(z_t|x_t,z_{1:t-1},u_{1:t})p(x_t|z_{1:t-1},u_{1:t})}{\underbrace{p(z_t|z_{1:t-1},u_{1:t})}_{\frac{1}{\eta}}} \\
            & = \eta\cdot p(z_t|x_t,z_{1:t-1},u_{1:t})p(x_t|z_{1:t-1},u_{1:t})
            \end{align}
            $$
            
        2. With the assumption $x_t$ is **complete,** the following equations are established
            
            $$
            \begin{align}
            & bel(x_t)
            =p(x_t|z_{1:t},u_{1:t})= \eta\cdot \underbrace{p(z_t|x_t,z_{1:t-1},u_{1:t})}_{p(z_t|x_t)}\underbrace{p(x_t|z_{1:t-1},u_{1:t})}_{\bar{bel}(x_t)} \\
            & bel(x_t) = \eta \cdot p(z_t|x_t)\bar{bel}(x_t)
            \end{align}
            $$
            
        3. By the **Theorem of total probability, $\bar{bel}(x_t)$** can be expanded as follow
            
            $$
            \begin{align}
            \bar{bel}(x_t)
            & =p(x_t|z_{1:t-1},u_{1:t}) \\
            & =\int{p(x_t|x_{t-1},z_{1:t-1},u_{1:t})p(x_{t-1}|z_{1:t-1},u_{1:t})}dx_{t-1}
            \end{align}
            $$
            
        4. Again, with the assumption $x_t$ is **complete,** the following equations are established
            
            $$
            \begin{align}
            \bar{bel}(x_t)
            
            & =\int{\underbrace{p(x_t|x_{t-1},z_{1:t-1},u_{1:t})}_{p(x_t|x_{t-1},u_t)}p(x_{t-1}|z_{1:t-1},u_{1:t})}dx_{t-1} \\
            & = \int p(x_t|x_{t-1},u_t)p(x_{t-1}|z_{1:t-1},u_{1:t})dx_{t-1}
            \end{align}
            $$
            
        5. with the assumption controls $(u_t)$ is chosen randomly $u_t$ can be omitted.(?)
            
            $$
            \begin{align}
            \bar{bel}(x_t)
            & = \int p(x_t|x_{t-1},u_t)p(x_{t-1}|z_{1:t-1},u_{1:t})dx_{t-1} \\
            & = \int p(x_t|x_{t-1},u_t)\underbrace{p(x_{t-1}|z_{1:t-1},u_{1:t-1})}_{bel(x_{t-1})}dx_{t-1} \\
            & = \int p(x_t|x_{t-1},u_t)bel(x_{t-1})dx_{t-1}
            \end{align}
            $$
            
        6. Finally, we obtain the **Bayes Filters algorithm**
            
            $$
            \begin{align}
            \begin{align*}
            & \bar{bel}(x_t) = \int p(x_t|x_{t-1},u_t)bel(x_{t-1})dx_{t-1} \\
            & bel(x_t) = \eta \cdot p(z_t|x_t)\bar{bel}(x_t) \\
            \end{align*}
            \end{align}
            $$
            

This algorithm requires three probability distributions

1. $p(x_t|x_{t-1},u_{t})$ → ***state transition probability***
2. $p(z_t|x_{t})$ → ***measurement probability***
3. $p(x_0)$ → ***initial belief***

---

# Kalman Filter

---

## Resources

- [https://www.youtube.com/playlist?list=PLn8PRpmsu08pzi6EMiYnR-076Mh-q3tWr](https://www.youtube.com/playlist?list=PLn8PRpmsu08pzi6EMiYnR-076Mh-q3tWr)
- **视觉SLAM十四讲 Lec. 10**

## Part1: Why use Kalman Filters

- What is Kalman filter
    - get the unknown state from known parameters
    - Optimal estimation algorithm
- [video link](https://www.youtube.com/watch?v=mwn8xhgNpFY&list=PLn8PRpmsu08pzi6EMiYnR-076Mh-q3tWr&index=1)

## Part2: State Observers

- state observers can help us understand how the Kalman filter work
- Estimated states are shown with a hat:

$$
\hat{x}
$$

- Diagram

![[assets/Untitled 1.png]]

![[assets/Untitled 2.png]]

- Algorithm
    
    define  $e_{obs}$
    
    $$
    e_{obs}=x-\hat{x} \\
    
    $$
    
    And
    
    $$
    \begin{align*}
    & \dot{x}=Ax+Bu \\
    & \dot{\hat{x}}=A\hat{x}+Bu+K(y-\hat{y})
    \end{align*}
    
    $$
    
    subtract each other will get
    
    $$
    \dot{e_{obs}} = (A-KC)e_{obs}
    $$
    
    This is a **Matrix differential equation** and we can get
    
    $$
    e_{obs}(t) = e^{(A-KC)t}e_{obs}(0)
    $$
    
    $$
    \begin{align*}
    & y=Cx \\
    & \hat{y}=C\hat{x}
    \end{align*}
    $$
    
    $$
    y-\hat{y}=Ce_{obs}
    $$
    
    if (A-KC) < 0, then  $e_{obs}\rightarrow0$ as $t\rightarrow\infty$, which means 
    
    $$
    y-\hat{y} = 0\\
    x-\hat{x} = 0
    $$
    
    From the other point of view, if eigenvalues of (A-KC) < 0, the system will be stable, which means  $e_{obs}\rightarrow0$ as $t\rightarrow\infty$.
    
- we can use the **Kalman filter** to choose the gain **K**
- [video link](https://www.youtube.com/watch?v=4OerJmPpkRg&list=PLn8PRpmsu08pzi6EMiYnR-076Mh-q3tWr&index=3)

## Part3: **Optimal State Estimator**

- diagram
    
    ![[assets/Untitled 3.png]]
    
    $w_k \in N(0,\sigma)$ : process noises
    
    $v_k \in N(0,\sigma)$ : measurement noises 
    
- calculate the product of  $y_k \ and \ \hat{x}_k$, which are also in gaussian distribution
    
    ![[assets/Untitled 4.png]]
    
- [video link](https://www.youtube.com/watch?v=ul3u2yLPwU0&list=PLn8PRpmsu08pzi6EMiYnR-076Mh-q3tWr&index=3&t=308s)

## Part4: **Optimal State Estimator Algorithm**

- Kalman filter is a type of **state observer**
    - Kalman filter : for stochastic system
    - state observer : for deterministic system
- Kalman filter vs state observer
    - discrete state observer
        
        $$
        \begin{align*}
        & \hat{x}_k=A\hat{x}_{k-1}+Bu_{k-1}+K(y_{k-1}-C\hat{x}_{k-1})
        \end{align*}
        $$
        
    - discrete Kalman filter
        
        $$
        \begin{align*}
        & \hat{x}_k=A\hat{x}_{k-1}+Bu_k+K_k(y_k-C(A\hat{x}_{k-1}+Bu_k))
        \end{align*}
        $$
        
- Kalman filter derivation
    
    $\hat{x}_k^- :=$  Priori Estimate( predicted state estimate)
    
    $\hat{x}_k :=$  Posteriori Estimate
    
    $$
    \begin{align*}
    & \hat{x}_k=\underbrace{A\hat{x}_{k-1}+Bu_k}_{\hat{x}_k^-}+K_k(y_k-C(\underbrace{A\hat{x}_{k-1}+Bu_k}_{\hat{x}_k^-})) \\
    &
    \hat{x}_k=\underbrace{\hat{x}_k^-}_{predict}+\underbrace{K_k(y_k-C\hat{x}_k^-)}_{update} \\
    \end{align*}
    $$
    
    <aside>
    💡 We can simplify the problem to how to get the best $K_k$
    
    </aside>
    
    - Kalman filter is a two-step process(with initialization)
        
        <u>***Initialization***</u>
        
        $$
        \hat{x}_0,Q,R,P_0
        $$
        
        - <u>***Remarks***</u>
            - $Q, R$ can be obtained from Statistics
            - $P_0$ can be assigned randomly, and it will converge at last
            - How to choose states ($x$) is pretty important
        
        <u>***Prediction***</u>
        
        $$
        \begin{align*}
        & \hat{x}_k^- = A\hat{x}_{k-1}+Bu_k \\
        & P_k^- = AP_{k-1}A^T+Q
        \end{align*}
        $$
        
        <u>***Update***</u>
        
        $$
        \begin{align*}
        & K_k = \frac{P_k^-C^T}{CP_k^-C^T+R} \\
        & \hat{x}_k=\hat{x}_k^-+K_k(y_k-C\hat{x}^-_k) \\
        & P_k = (I-K_kC)P_k^-
        \end{align*}
        $$
        
        - <u>***Notations***</u>
            - $Q:$ Covariance matrix of estimation process noise
            - $R:$ Covariance matrix of measurement noise
            - $P:$ Covariance matrix of estimation state
            - $K:$Kalman gain
- Kalman filter is a method to implement the **sensor fusion**
- [video link](https://www.youtube.com/watch?v=VFXf1lIZ3p8&list=PLn8PRpmsu08pzi6EMiYnR-076Mh-q3tWr&index=4)