---
title: Summer Plan
---

# Summer Plan

MLsys
Agentic RL infra
1.结论 open source 分domain rl 然后最后opd infra没有很多可以跑通的 先搭好infra 然后可以进真的data以及recipe会是对open  source很大的贡献
2.大家之前infra还是优化single turn偏多 然后multiturn aka agentic rollout 结合rl 还有很大优化空间 特别是verifiable reward需要很长时间拿到的时候（比如terminal bench里面nanogpt训练的例子） 这时候trainner比较容易idea 以及serving engine kv cache是否要保留的问题
这里也可以ospd
3.opd的时候不用domain时间不均匀的问题 对infra是挑战 以及domain 内部rollout长短不一 math都有很大long tail agent 只会更大
4.关于balance async rl 场景下 rl中trainner和rollout 机器orchestration配比的时候 如果想做到一样的吞吐 需要做elastic 原因是rollout会越来越长 也会越来越慢（agent turn数量增加）
sync rl colocate 有switch开销 分开放浪费
5.每个大厂的选择 kimi/glm还是sync (co locate) rl 国内比较训练稳定的还是sync rl 然后tecent async并且精度问题没解决 因为先训着再说 openai fully async
Tml reinforce
6.关于rl 框架 大家一般就是缝合 fsdp/Megatron +vllm/sglang 然后加上weight transfer design 以及ray的scheduling（可以去掉） 后面两者是大家不一样的地方 前面两个大家都搞不定
7.model ladder： qwen 2 4 9 27 35都有base  然后235没放base 然后glm 100b有base 然后就deepseek 400b有base kimi 2.5之后都没base了 可以从小的开始
但是base 估计要sft
8.sandbox 最好用的是modal 听说很好用 api简单 但是我感觉各家对于sandbox带来infra挑战没有很大研究
9.还有一些 想起来再说。。



10.关于 data  opensouce swe比较多 deep research 也比较多 math就比较常规 其他就是kernel bench和terminal bench
另外office finance bench算是比较rising的domain hunyun有在训
11.opd infra slime和miles都有 skyrl都有 但是glm没有把真正用到的放出来 然后专门做opd的是kdflow
12.精度问题 比 async更容易训崩 然后 精度有时候更多是debug或者ci通过的作用 还没有很多scientific研究



programbench opus 4.8
但是开源很差

nementrobase 30b


固定harness openhands cc
数据 确定ok

sft 需要thinking open source 按照program bench 构造方式
minimax ood很差

rl 和stf data一样


harbor skyrl train只support terminus 2比较弱harness 只有 bash 但是可以promt

examples/train_integrations/harbor/run_codecontest_fully_async.sh

hanfei改了一个swe的 但是没跑过curve
也用harbor

三到五turn

codeconyext


R2E 可以转到 harbor skyrl就可以支持 terminus 2 harness


为啥不能任意harness
 tokenizer 

decode a detokennize a 不一定identical

换行换行 tokenize 然后之后 apply logits 变成一个换行 

keep in tokenizer space 而不是text 需要proxy


skyrl text2sql search r1比较tool


open soirce比较好的shiyi那个


nemontron rl 可能有好的一键跑


prime rl lora mulyi tenat oss 但是也没有一个research papee

slime 只有infta 没有 data
verl 很难用 难以fully async 很难用别的harness

https://github.com/verl-project/verl-recipe/tree/main 这个可能有recipe


miles 正在支持kl 0 可能

https://github.com/radixark/miles/blob/main/examples/true_on_policy/README.md


https://arxiv.org/abs/2602.14293
kernel posttrain

kernel bench玩起来很好

minicpm glm tech report

sandbox is a problem 公司资源竞争



nementron search或者qwen / kernel bench/ shiyi/ polar agent/ micheal deepswe 有那个bug 没有collect回来/ rllm deepresearch 花钱/ swerl 没有open source self play asyc 没开源/slime 自己deepresearch recipe/skyrl swe terminal bench/ echo terminal agent/miles有swebench job