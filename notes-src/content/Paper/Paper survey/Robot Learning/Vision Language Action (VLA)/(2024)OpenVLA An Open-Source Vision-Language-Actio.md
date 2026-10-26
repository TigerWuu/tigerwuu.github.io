---
title: "(2024)OpenVLA: An Open-Source Vision-Language-Action Model"
tags: [paper]
---

- website
    
    https://openvla.github.io/
    

# Background knowledge

- DINOv2  → [[Techniques/Machine Learning/Vision-Language Model (VLM) Learning Roadmap (Theo|Vision-Language Model]]
- SigLIP  → [[Techniques/Machine Learning/Vision-Language Model (VLM) Learning Roadmap (Theo|Vision-Language Model]]
- Octo  → [[Paper/Paper survey/Robot Learning/Vision Language Action (VLA)/(2024)Octo An Open-Source Generalist Robot Policy|Octo]]
- RT2
- learning rate warm-up

# Scenario

Present OpenVLA, a 7B-parameter open-source vision-language-action model (VLA), trained
on 970k robot episodes from the Open X-Embodiment dataset. OpenVLA sets a new state of the art for **generalist robot manipulation policies**. It supports controlling multiple robots out of the box and can be quickly adapted to new robot domains via parameter-efficient fine-tuning.

# Theory & Technique

- Contributions
    1. OpenVLA is the first generalist VLA that is open-source and thus supports future research on VLA training, data mixtures, objectives, and inference.
    2. By combining a strong open VLM backbone with a richer robot pretraining dataset, OpenVLA outperforms RT-2-X in our experiments while being an order of magnitude smaller;
- 

# Simulation & Experiment

- 

# Representative Schematic

![[assets/image 107.png]]