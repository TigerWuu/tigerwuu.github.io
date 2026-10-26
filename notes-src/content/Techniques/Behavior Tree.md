---
title: "Behavior Tree"
tags: [concept]
---

https://www.behaviortree.dev/docs/intro

- Callback
    - Running
    - Success
    - Failure

- Tree Node
    
    <aside>
    💡
    
    Priority: from left node to right node
    
    </aside>
    
    ![[assets/image.png]]
    
    - ControlNode: contains **1 to N children**.
        - SequenceNode → if the leaf node returns **success**, go to the next leaf node, if the leaf node returns **failure**, return **failure** to the root node.
        - FallbackNode → if the leaf node returns **failure**, go to the next leaf node, if the leaf node returns **success**, return **success** to the root node.
    - DecoratorNode: contain **only 1 child**
        - Inverter → return the reversed result
        - ForceSuccess → failure/success, return success; running, return running
        - RetryUntilSuccessfulNode
        - KeepRunningUntilFailureNode → the child return running or success, it return running to parent, if the child return failure, it returns failure to parent
    - ConditionNode: **no child**
    - ActionNode: **no child**
- Compact vs explicit representation in XML
    
    ```jsx
    	<!--Compact-->
    	<SaySomething               name="action_hello" message="Hello World"/>
    	<!--Explicit-->
    	<Action ID="SaySomething"   name="action_hello" message="Hello World"/>
    ```
    
- Example
    
    ![[assets/image 1.png]]
    
- Blackboard and ports
    - Blackboard
        - store key-value pair
    - ports
        - Input port: read key-value from the blackboard
        - Output port: write key-value into the blackboard
    - Remapping port of subtree
        
        ```jsx
          <BehaviorTree ID="PickAndDrop">
            <Sequence>
              <Script code=" retract_pose:='0;panda_link0;-0.34;-0.3;0.6;1.0;0.0;0.0;0.0' " />
              <SubTree ID="MoveTo" name="Retract Pose 1" target="{retract_pose}"/>
              <SubTree ID="Pick"/>
              <SubTree ID="MoveTo" name="Retract Pose 2" target="{retract_pose}"/>
              <SubTree ID="Drop"/>
            </Sequence>
          </BehaviorTree>
          <!--{pregrasp_pose} and {grasp_pose} are keys-->
          <!--The value of {pregrasp_pose} and {grasp_pose} are hardcoded in node GetGraspHardcoded-->
          <BehaviorTree ID="Pick">
            <Sequence>
              <GetGraspHardcoded pregrasp="{pregrasp_pose}" grasp="{grasp_pose}"/>
              <SubTree ID="MoveTo" target="{pregrasp_pose}"/>
              <Grip pose="0.04"/>
              <SubTree ID="MoveTo" target="{grasp_pose}"/>
              <Grip pose="0.02"/>
            </Sequence>
          </BehaviorTree>
          <!--{target} is remapped to target from subTree "MoveTo"-->
          <BehaviorTree ID="MoveTo">
            <Sequence>
        	    <!-- trajectory is output port to write trajecotr-->
              <Plan target_ik="{target}" trajectory="{trajectory_msg}"/>
              <Move trajectory="{trajectory_msg}"/>
            </Sequence>
          </BehaviorTree>
        ```