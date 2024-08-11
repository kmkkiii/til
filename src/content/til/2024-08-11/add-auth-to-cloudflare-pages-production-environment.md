---
title: Cloudflare Pagesのプロダクション環境に認証を設定する
date: 2024-08-11
tags:
  - Cloudflare Pages
  - Cloudflare Zero Trust
published: true
---
Cloudflare Zero Trustで認証を設定する。 Freeプランがあるが、支払い方法の設定が必要。

前提：Cloudflare Pagesの管理タブでプレビュー環境へのアクセスポリシーを設定済みであること

## 手順

Cloudflare Zero TrustのサイドメニューからAccess > Applicationsにアクセスし、認証を設定するアプリケーションを選択してEditボタンを押す。

### ドメイン設定

*   Overviewタブを選択するとサブドメインのみが対象になっているため、Add domainでメインドメインを追加してSave application
    

### ポリシー追加

*   Add a Policyボタンを押してポリシー追加画面へ
    
*   任意のポリシー名とアクションに`Block`を設定
    
*   ルール設定
    
    *   今回は`Loging Methods`と`One-time PIN`を指定
        
*   Add a Policyボタンで追加し、ポリシー一覧画面でSave application
    

以上の設定でプロダクション環境にアクセスするとCloudflare Zero Trustの認証画面が表示される。 Allow Membersポリシーで設定されているメールアドレスを入力するとPINコードをメールで受け取ることができるので入力してログイン。

プレビュー環境へのアクセスポリシー設定で追加されるAllow Membersが設定されていれば、設定されたメールアドレス以外にはPINコードが送られないようになっている。