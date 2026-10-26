---
title: "Data Structure"
tags: [concept]
---

## Linkedlist

- Fast and slow pointers
https://algorithm.yuanbin.me/zh-tw/basics_data_structure/linked_list.html

## Tree

https://medium.com/cyen6/%E8%B3%87%E6%96%99%E7%B5%90%E6%A7%8B%E7%AD%86%E8%A8%98-tree-2603a518a021

- DFS vs. BFS
    
    graph search : binary tree could be kind of a graph
    
    https://medium.com/%E7%A8%8B%E5%BC%8F%E4%B9%BE%E8%B2%A8/binarytree-%E5%BB%A3%E5%BA%A6%E6%90%9C%E5%B0%8Bbfs-vs-%E6%B7%B1%E5%BA%A6%E6%90%9C%E5%B0%8Bdfs-ad51a9ca5d68
    
    BFS: queue
    
    DFS: stack
    
    - Multi-Source BFS
- Binary tree
    - Binary search tree (BST)
        
        https://medium.com/@Kadai/%E8%B3%87%E6%96%99%E7%B5%90%E6%A7%8B%E5%A4%A7%E4%BE%BF%E7%95%B6-binary-search-tree-3c40be3204e
        
        1. 以左邊節點 ( left node ) 作為根的子樹 ( sub-tree ) 的所有值都小於根節點 ( root )
        2. 以右邊節點 ( right node ) 作為根的子樹 ( sub-tree ) 的所有值都大於根節點 ( root )
        3. 任意節點 ( node ) 的左、右子樹也分別符合 BST 的定義
        4. 不存在任何鍵值 ( key/value ) 相等的節點。
        - Balanced BST
            - Red-black tree
            - AVL tree
    - Binary heap
        
        https://medium.com/starbugs/%E4%BE%86%E5%BE%81%E6%9C%8D%E8%B3%87%E6%96%99%E7%B5%90%E6%A7%8B%E8%88%87%E6%BC%94%E7%AE%97%E6%B3%95%E5%90%A7-%E6%90%9E%E6%87%82-binary-heap-%E7%9A%84%E6%8E%92%E5%BA%8F%E5%8E%9F%E7%90%86-96768ea30d3f
        
        <aside>
        💡
        
        vs. BST : 比較時Binary heap比較好用
        
        </aside>
        
        <aside>
        💡
        
        array vs. tree: 用tree 較直觀但是insert 要使用BFS，且使用pointer 存取較慢
        
        </aside>
        
        1.  root 的值是裡面最大的，接下來 insert 的值只要按照這個規則即可，不用管左右邊。

## Dynamic Programming

- Kadane’s algorithm
    
    https://ithelp.ithome.com.tw/m/articles/10273675
    

## Backtracking

- Combination
    
    https://medium.com/appworks-school/%E9%80%B2%E5%85%A5%E9%81%9E%E8%BF%B4-recursion-%E7%9A%84%E4%B8%96%E7%95%8C-%E5%9B%9B-27d86b9fbd1d
    

## Graph

- Adjacency list
- Adjacency matrix