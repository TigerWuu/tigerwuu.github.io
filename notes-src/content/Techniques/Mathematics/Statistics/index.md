---
title: "Statistics"
tags: [topic]
---

[[Techniques/Mathematics/Statistics/統計推斷核心：MLE 與 Fisher Information|**統計推斷核心：MLE 與 Fisher Information**]]

- Unbiased estimator
    - The best unbiased estimator (MVUE) satisfies the following criterion
        1. Unbiasedness: 估計量的期望值等於真實參數
        2. Efficiency: 在所有無偏估計量中，其**變異數 (Variance) 最小**
- Importance sampling
    - 當我們無法從 $p(x)$ 機率分布中sample資料時，我們可以從目前找得到的機率分布$q(x)$ 中來sample 資料，並且滿足以下期望值關係式
        
        $$
        \mathbb{E}_{x \sim p}[f(x)] = \mathbb{E}_{x \sim q} \left[ \frac{f(x)p(x)}{q(x)} \right]
        $$
        
        - <u>***derivative:***</u>
            
            $$
            \begin{aligned} \mathbb{E}_{x \sim p}[f(x)] &= \int f(x) p(x) dx \\ &= \int f(x) p(x) \frac{q(x)}{q(x)} dx \\ &= \int \left( f(x) \frac{p(x)}{q(x)} \right) q(x) dx \\ &= \mathbb{E}_{x \sim q} \left[ f(x) \frac{p(x)}{q(x)} \right] \end{aligned}
            $$
            
        
        <aside>
        💡
        
        甚麼情況會有 無法從 $p(x)$sample data 的情況
        
        **$p$ (目標分佈)：** 你剛剛更新好的一個「最新版、實驗中的 AI 腦 ($p$)」。你很想知道它實際去玩遊戲或開車的表現如何。
        **$q$ (替代分佈)：** 把未經完整測試的新 AI 直接放上真實的自駕車上**太危險也太貴了**！我們手邊只有「人類駕駛」或「舊版保守 AI ($q$)」過去幾個月開車錄下來的龐大安全資料庫。
        **作法：** 我們不能直接讓 $p$ 上路抽樣，所以我們從 $q$（舊資料庫）抽取資料，然後計算 Probability Ratio，來「推測」如果換作 $p$ 來開，預期會得到什麼結果。這讓我們可以在不弄壞真車的情況下，安全地在虛擬環境中訓練新大腦。 
        
        </aside>
        
- CMA-ES
    
    https://zhuanlan.zhihu.com/p/673823340
    
    https://arxiv.org/pdf/1604.00772