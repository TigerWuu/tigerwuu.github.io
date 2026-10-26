---
title: "ROS vs ROS2"
tags: [concept]
---

### Middeware

ROS1

XML-RPC.

**TCPROS** (Default) or **UDPROS**

ROS2

DDS

RTPS

### Build tool

<u>***ROS1***</u>

catkin make

<u>***ROS2***</u>

colcon build

### Directory hierarchy

<u>***ROS1***</u>

src

build

devel

<u>***ROS2***</u>

src

build

install

log 

### Create package

<u>***ROS1***</u>

catkin_create_pkg

<u>***ROS2***</u>

ros2 pkg create

### Command

> ros{name} → ros2 {name}
> 
- name can be run, node, topic ,…,etc

<u>***ROS1***</u>

1. `rosrun`
2. `rosnode`
3. `rostopic`
4. `roslaunch`
- `roscd`

<u>***ROS2***</u>

1. `ros2 run`
2. `ros2 node`
3. `ros2 topic`
4. `ros2 launch`
- `colcon_cd`

## Tools

1. ros bag
2. rviz
3. plotjoggler
4. rqt