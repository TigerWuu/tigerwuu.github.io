---
title: "(2024)Octo: An Open-Source Generalist Robot Policy"
tags: [paper]
---

- website
    
    https://octo-models.github.io/
    

# Background knowledge

- Action chunk transformer  → [[Concepts/Transformer|Transformer]]
- Diffusion policy  → [[Techniques/Machine Learning/Diffusion model|Diffusion model]]
- AdamW
- Cosine schedule

# Scenario

Aim to lay the **groundwork** for developing open-source, widely applicable, generalist policies for robotic manipulation.

- **groundwork→ Octo**

# Theory & Technique

- Contributions
    1. Octo, a transformer-based policy pretrained on the largest robot manipulation dataset to date: 800k robot demonstrations from the Open X-Embodiment dataset. Octo is the first GRP that can be effectively finetuned to new observations and action spaces, and the first
    generalist robot manipulation policy that is fully open-source, including the training pipeline, model checkpoints, and data.
- Design
    1. dataset- open-X embodiment
        - remove the data without image streams
        - remove the datasets that are too repetitive
        - remove the datasets that have low resolution
        - separate the datasets into **more diverse** and **less diverse**
            
            → double the weights of the more diverse datasets
            
        - zero pad any missing camera channels
        - regularize the action into +1 and -1
        - randomly zero out the language instruction or goal image to enable Octo to be conditioned on either language or goal image.
    2. training objective
        1. transformer backbone + DDPM 

# Simulation & Experiment

- out-of-the-box
    
    ![[assets/image 104.png]]
    

# Representative Schematic

![[assets/image 105.png]]

![[assets/image 106.png]]