---
title: "Denoising Diffusion Probabilistic Models"
tags: [paper]
---

- resources
    
    https://blog.csdn.net/qq_40714949/article/details/126643111
    

# Background knowledge

- Negative log likelihood
- Fréchet inception distance (FID)
- U-net
- LSUN
- CIFAR10

# Scenario

Diffusion models are straightforward to define and efficient to train, but to the best of our knowledge, there has been no demonstration that they are capable of generating high quality samples. We show that diffusion models actually are capable of generating high quality samples, sometimes better than the published results on other types of generative models

# Theory & Technique

- Contributions
    1. We show that a certain parameterization of diffusion models reveals an equivalence with denoising score matching over multiple noise levels during training and with annealed Langevin dynamics during sampling. We obtained our best sample quality results using this parameterization.
- Design
    - Design a variational bound on the negative log likelihood
    - Minimize the upper bound
        
        ![[assets/image 23.png]]
        

# Simulation & Experiment

- Compare FID with other generative models

![[assets/image 24.png]]

# Representative Schematic

![[assets/image 25.png]]

- ← diffusion process
- → reverse process