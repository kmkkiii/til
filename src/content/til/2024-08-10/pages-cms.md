---
title: Pages CMSでTILのコンテンツを管理する
date: 2024-08-10
tags:
  - Pages CMS
published: true
---
このサイトのCMSとして`Pages CMS`を採用した。

https://pagescms.org/

GitHubリポジトリにあるTILのmarkdownコンテンツを管理できる。 メディアも管理可能。

## 設定

管理するコンテンツの設定をymlで書ける。 Astroのcontent collectionでzodスキーマが定義してあるため、 フロントマターとして出力するフィールドの型が違うとビルドエラーになるがこちらでも型指定ができて安心。

```yml:.pages.yml
content:
  - name: posts
    label: Posts
    path: src/content/til
    type: collection
    filename: "{hour}-{minute}-{second}-{primary}.md"
    view:
      fields: [ title, date, tags, published ]
      primary: title
      sort: [ date ]
      default: { sort: date, order: desc }
    fields:
      - { name: title, label: Title, type: string }
      - { name: date, label: Date, type: date }
      - { name: tags, label: Tags, type: string, list: true }
      - { name: published, label: Published, type: boolean}
      - { name: body, label: Body, type: rich-text }
```

## セルフホスティング

GitHub リポジトリへのフルアクセスが必要になるため、一応Cloudflare Pagesでセルフホスティングしている。

ドキュメントにやり方が載っているので大体そのまま進めればOK。 Cloudflareのビルド設定だけ記載がないので、フレームワーク プリセットで`Vue`を選択して、ビルドコマンドを`npm run build`、ビルド出力ディレクトリを`/dist`に設定するのを忘れずに。

https://pagescms.org/docs/development/#deploy-on-cloudflare

## 微妙なところ

Pages CMSでmarkdownファイルを編集する際にURLがmarkdown記法のテキストリンクに変換されてしまうこと。

`zenn-markdown-html`を使用しており、リンクは基本的にリンクカード埋め込みにしたい...

## 参考

https://speakerdeck.com/ikumatadokoro/koredezui-hou-nisitai-astrotoli-tixiang-kau-6du-mu-noge-ren-buroguzai-kai-fa?slide=38