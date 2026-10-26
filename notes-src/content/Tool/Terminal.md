---
title: "Terminal"
tags: [concept]
---

- File
    
    install download
    
    - unzip
    - dpkg
        
        ```bash
        dpkg -i <program>.deb
        ```
        
    - curl
    - wget
    
    write
    
    - tee
    
    find word
    
    - grep
        
        ```bash
        grep -r “word” <file>
        ```
        
    
- Remote
    - ssh
    - scp
- text editor
    - vim
    - tmux
- search
    - find  path -type d -name “search name”
- history
    - store in .bash_history
    - write into file when terminal is shut down
        
        workaround
        
        ```bash
        # 即時寫入 history
        PROMPT_COMMAND="history -a; history -n; $PROMPT_COMMAND"
        
        # 允許追加，不覆蓋舊記錄
        shopt -s histappend
        
        # 增加可儲存的行數
        HISTSIZE=10000
        HISTFILESIZE=20000
        ```
        
    - execute history command
        
        ```bash
        ! <history num>
        ```