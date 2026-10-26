---
title: "Operating System"
tags: [concept]
---

# RT Kernel / CPU Isolation / taskset 整理

## 核心分工（一句話）

- **RT priority** 管「時間」→ 誰先跑
- **taskset -c** 管「我在哪」→ 綁在哪幾顆核心
- **CPU isolation** 管「這裡有沒有別人」→ 把核心淨空

---

## 三者定位總表

| 項目 | RT priority (chrt) | taskset -c | CPU isolation |
| --- | --- | --- | --- |
| 一句話定位 | 就算敵人來了我也先跑 | 我只待在這幾顆核心 | 這幾顆核心只准我用 |
| 管的方向 | task 之間誰先跑（時間） | 把自己框進核心（我不出去） | 把別人趕出核心（別人別進來） |
| 解決的問題 | 搶佔順序、wakeup 延遲 | 用哪幾顆核、用多少算力 | 背景雜訊 / OS jitter |
| 擋得住中斷/tick 嗎 | ❌ 擋不住 | ❌ 擋不住 | ✅ 這正是它的工作 |
| 設定時機 | 執行期 | 執行期 | 開機期（cmdline）為主 |
| 設定層級 | task / thread | 行程 | 系統 / 核心層級 |
| 主要目的 | 確定性、低延遲 | 吞吐量、資源控制 | 確定性、低延遲 |
| 典型使用者 | RT task | 計算 job（如 MKL） | RT task、DPDK |

---

## 各自的工具與參數

| 面向 | RT priority | taskset -c | CPU isolation |
| --- | --- | --- | --- |
| 主要指令 / 參數 | `chrt -f 80`（FIFO）、`chrt -r`（RR）、`chrt -d`（DEADLINE） | `taskset -c 0-7`、`taskset -c 2` | `isolcpus=`、`nohz_full=`、`rcu_nocbs=`、`irqaffinity=` |
| 數值 / 範圍 | priority 1–99（越大越優先） | CPU 清單，如 `0-3`、`2,4,6` | CPU 清單，如 `2-7` |
| 執行期微調 | `chrt -p <pri> <pid>` | `taskset -pc <cpus> <pid>` | `/proc/irq/<n>/smp_affinity`、cpuset `cpuset.cpus` |
| 能否單獨達成低延遲 | 半套（管不到中斷/tick） | 幾乎沒幫助 | 半套（沒搶佔保證） |

---

## 「有做 / 沒做」會怎樣

| 情境 | 結果 |
| --- | --- |
| 只設 RT priority 99 | 贏過一般 task，但中斷、tick、stop-machine 的離群值還在 |
| 只做 isolation | 平常很安靜，但別的 task 被綁進來就跟你平分，沒有搶佔保證 |
| 只做 taskset -c | 只是把自己框進某區，那區照舊人來人往（不是 isolation） |
| isolation + taskset + RT priority | 最完整：淨空核心 → 綁進去 → 搶佔保證，低延遲又穩定 |

---

## 三者怎麼組合（RT 系統標準流程）

| 步驟 | 做什麼 | 用什麼 |
| --- | --- | --- |
| 1. 淨空核心 | 把中斷、tick、RCU、其他 task 趕走 | `isolcpus` `nohz_full` `rcu_nocbs` `irqaffinity`（開機 cmdline） |
| 2. 把 task 送進去 | 綁到剛淨空的核心 | `taskset -c 2` |
| 3. 給搶佔保證 | 設高 RT 優先權 | `chrt -f 80` |

經典指令：

```bash
taskset -c 2 chrt -f 80 ./my_rt_task

# 前提：開機 cmdline 已把 CPU 2 用 isolcpus 等淨空

```

---

## 對照計算 job（OMP/MKL 範例）

| 指令片段 | 屬於哪一類 | 需不需要 |
| --- | --- | --- |
| `OMP_NUM_THREADS=4 MKL_NUM_THREADS=4` | 執行緒數控制（都不是上面三者） | 建議設，消除 oversubscription |
| `taskset -c 0-7` | taskset（框範圍） | 計算用途夠用 |
| RT priority (chrt) | 沒用到 | 計算 job 追吞吐量，通常不需要 |
| CPU isolation | 沒用到 | 計算 job 通常不需要（RT 追低延遲才用） |