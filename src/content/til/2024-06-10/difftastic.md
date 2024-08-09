---
title: "gitのdiffをdifftasticにする"
date: "2024-06-10"
tags: ["Git", "difftastic"]
published: true
---

git の diff を difftastic にしてみた。
delta の代替になるのか、統合して使うものなのかいまいちわかってない

https://difftastic.wilfred.me.uk/

## git 設定

```config:~/.config/git/config

[diff]
  tool = difftastic

[difftool]
  prompt = false

[difftool "difftastic"]
  cmd = difft "$LOCAL" "$REMOTE"

[pager]
  difftool = tru
```
