---
title: "ローカルでGitHub Actionsの動作確認ができるactの設定"
date: "2024-07-30"
tags: ["act", "GitHub Actions"]
published: true
---

https://github.com/nektos/act

毎回オプション指定しなくてもいいように HOME ディレクトリに以下の設定ファイルを追加する

```txt:~/.actrc
--container-architecture linux/amd64
--container-daemon-socket -
```

## --container-architecture linux/amd64

Apple Silicon Mac の場合は追加

## --container-daemon-socket -

Docker の エラー対策
