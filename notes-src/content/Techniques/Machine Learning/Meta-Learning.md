---
title: "Meta-Learning"
tags: [concept]
---

# Slide

Meta1 (v6).pdf（PDF 講義未公開）

# Notes

- <u>***Meta-learning:***</u>
    
    learn to learn: learning a network to generate another network.
    
    ![[assets/Untitled 12.png]]
    
    human defined the structure like **network**, **initialization parameters**, and **update algorithms**
    
    → find a network to learn the **best network**, **initialization parameters**, and **update algorithms**
    
    - learn the best **initialization parameters**
        - Model pre-training
        - Maml
        - Reptile
        - **Maml** v.s **Reptile** v.s **Model pre-training**
            
            ![[assets/Untitled 13.png]]
            
    - learn the best **network** or **update algorithm** or **activation function**….
        - Using RL or genetic algorithm (not mentioned in this lecture)