---
title: "コンテナで実行したテストのレポートにホストからアクセスするための設定"
date: 2024-07-30
tags: ["Playwright", "Docker"]
published: true
---

`playwright.config.ts`で以下のとおり設定する

```ts:playwright.config.ts
reporter: [['html', { host: '0.0.0.0', port: '9323' }]];
```
