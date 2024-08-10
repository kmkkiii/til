---
title: Pages CMSでTILのコンテンツを管理する
date: 2024-08-10
tags:
  - Pages CMS
published: true
---
CMSとして`Pages CMS`を採用した

https://pagescms.org/

GitHubリポジトリにあるTILのmarkdownコンテンツを管理できる

メディアも管理可能

## 設定

```yml:.pages.yml
content:
  - name: posts
    label: Posts
    path: src/content/til
    type: collection
    fields:
      - { name: title, label: Title, type: string }
      - { name: date, label: Date, type: string }
      - { name: tags, label: Tags, type: string, list: true }
      - { name: published, label: Published, type: boolean}
      - { name: body, label: Body, type: rich-text }
```

## セルフホスティング

GitHub リポジトリへのフルアクセスが必要になるため、一応Cloudflare Pagesでセルフホスティングしている

ドキュメントにやり方が載っている
ビルド設定だけ記載がないので、フレームワーク プリセットで`Vue`を選択して、ビルドコマンドが`npm run build`、ビルド出力ディレクトリが`/dist`に設定することを忘れずに

https://pagescms.org/docs/development/#deploy-on-cloudflare

## 参考

https://speakerdeck.com/ikumatadokoro/koredezui-hou-nisitai-astrotoli-tixiang-kau-6du-mu-noge-ren-buroguzai-kai-fa?slide=38