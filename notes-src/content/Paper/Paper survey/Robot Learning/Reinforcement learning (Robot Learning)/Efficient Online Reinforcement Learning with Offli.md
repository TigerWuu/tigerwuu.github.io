---
title: "Efficient Online Reinforcement Learning with Offline Data (RLPD)"
tags: [paper]
---

- website
    
    [https://github.com/ikostrikov/rlpd](https://github.com/ikostrikov/rlpd)
    

# Background knowledge

- Layer normalization
- update-to-data (UTD) ratio  → [[Concepts/Update-to-Data Ratio|Update-to-Data Ratio]]
- random ensemble distillation
- random shift augmentation

# Scenario

# Theory & Technique

- Contributions
- Common design choice
    - Symmetric sampling
    - Layer normalization
        - bound the extrapolation of network → ood actions
        - not constrain the policy to remain close to the offline data

# Representative Schematic

- Overview
    
    ![[assets/image 123.png]]
    

# Simulation & Experiment

![[assets/image 124.png]]

# My Two Cents

1. dense reward to sparse reward
2. depends on the data quality
3. spend too much time on data collection !!!