---
title: "統計推斷核心：MLE 與 Fisher Information"
tags: [concept]
---

# **Log Likelihood**

似然函數衡量在給定參數 $\theta$ 下，觀測到數據 $X = \{x_1, \dots, x_n\}$ 的可能性。

- **定義 (Likelihood)**: $L(\theta) = \prod_{i=1}^{n} P(x_i | \theta)$
- **定義 (Log Likelihood)**: $\ell(\theta) = \log L(\theta) = \sum_{i=1}^{n} \log P(x_i | \theta)$💡 **為什麼使用 Log?**
1. **計算簡化**：將相乘變為相加，方便求導。
2. **數值穩定**：避免多個機率相乘導致的數值下溢（Underflow）。
3. **單調性**：不改變極值點的位置。

# **Score Function**

對數似然函數對參數的一階導數。
• **定義**:$s(\theta) = \nabla_\theta \ell(\theta) = \frac{\partial \log L(\theta)}{\partial \theta}$
• **物理意義**: 表示似然函數在 $\theta$ 處的「斜率」與「方向」。
• **性質**:
    ◦ 在 MLE 估計值處，$s(\hat{\theta}_{MLE}) = 0$。
    ◦ **期望值**: $E[s(\theta)] = 0$。

# **Maximum Likelihood Estimation (MLE)**

一種估計模型參數的準則。
• **核心思想**: 尋找一個 $\theta$ 使得觀測數據出現的機率最大化。
• **數學表示**:$\hat{\theta}_{MLE} = \arg\max_{\theta} \ell(\theta)$
• **求解步驟**:
    1. 列出對數似然函數 $\ell(\theta)$。
    2. 求對 $\theta$的一階導數（Score Function）。
    3. 令 $s(\theta) = 0$ 並解方程。
    4. 檢查二階導數（Hessian）是否小於 0（確認為極大值）。

# **Fisher Information Matrix (費雪信息矩陣)**

衡量數據中包含關於參數 $\theta$ 的「資訊量」。
• **定義 (矩陣形式)**:$I(\theta) = E \left[ s(\theta) s(\theta)^T \right] = -E \left[ \frac{\partial^2 \ell(\theta)}{\partial \theta \partial \theta^T} \right]$
• **關鍵理解**:
    ◦ **曲率相關**: 它是對數似然函數的「二階導負數的期望值」。
    ◦ **直觀意義**:
        ▪ 若 $I(\theta)$ 越大 → 似然曲線越尖銳 → 參數估計越精確。
        ▪ 若 $I(\theta)$ 越小 → 似然曲線越平緩 → 參數估計的不確定性越高。
• **Cramér-Rao Lower Bound**: 任何無偏估計量的變異數，其下限為 Fisher Information 的倒數 $Var(\hat{\theta}) \ge \frac{1}{I(\theta)}$。

**總結關係圖概念數學表達角色**

| **概念** | **數學表達** | **角色** |
| --- | --- | --- |
| **Log Likelihood** | $\ell(\theta)$ | **目標函數**：衡量擬合程度 |
| **Score Function** | $\ell'(\theta)$ | **優化工具**：指出參數調整方向 |
| **MLE** | $\ell'(\theta)=0$ 的解 | **最終結果**：找到的最佳參數 |
| **Fisher Information** | $E[-\ell''(\theta)]$ | **信心評估**：衡量估計的可靠性 |