---
title: "Autoregressive"
tags: [concept]
---

## Autoregressive Policy Training

Goal:
Learn a policy that models the conditional probability of an action sequence.

# \[
P(a_1,a_2,\dots,a_H | s)

\prod_{t=1}^{H} P(a_t | a_{<t}, s)
\]

---

### Step 1: Collect Demonstration Data

Dataset consists of trajectories:

\[
(s_1,a_1),(s_2,a_2),...,(s_H,a_H)
\]

or

\[
\tau = [a_1,a_2,...,a_H]
\]

---

### Step 2: Construct Training Sequences

For each timestep \(t\), create:

Input:
\[
(s, a_1, a_2, ..., a_{t-1})
\]

Target:
\[
a_t
\]

---

### Step 3: Train Model to Predict Next Action

Model:

\[
a_t = f_\theta(s, a_{<t})
\]

Loss:

For continuous actions (MSE):

\[
L = \|f_\theta(s,a_{<t}) - a_t\|^2
\]

For discrete actions (cross entropy):

\[
L = -\log P_\theta(a_t | s,a_{<t})
\]

---

### Step 4: Teacher Forcing

During training the model always receives:

\[
a_{<t}^{\text{ground truth}}
\]

instead of its own predictions.

---

### Step 5: Optimization

Minimize the expected loss:

# \[
\mathcal{L}

\mathbb{E}*{(s,\tau)\sim D}
\sum*{t=1}^{H}
L(a_t,f_\theta(s,a_{<t}))
\]