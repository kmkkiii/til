---
title: Cloudflare Pagesのプロダクション環境に認証を設定する
date: 2024-08-11
tags:
  - Cloudflare Pages
  - Cloudflare Zero Trust
published: false
---
Cloudflare Zero Trustで認証を設定する。
Freeプランがあるが、支払い方法の設定が必要。

## 手順

- Cloudflare Zero TrustのサイドメニューからAccess > Applicationsにアクセスし、認証を設定するアプリケーションを選択してEditボタンを押す。
- Add a Policyボタンを押してポリシー追加画面へ
- ポリシー名とアクションを設定
- ルール設定
  - 今回は`Loging Methods`と`One-time PIN`を指定
- Add a Policyボタンで追加し、Save application