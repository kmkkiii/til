---
title: GraphQL Codegenでenumをオブジェクトリテラルで生成する
date: 2024-07-17
tags:
  - GraphQL Codegen
published: true
---
graphql-codegen の`enumsAsConst`設定なるものを知った。 非推奨の enum ではなく、オブジェクトリテラルで生成してくれる。

```ts
// オブジェクトリテラル
const Position = {
	Top: 0,
	Right: 1,
	Bottom: 2,
	Left: 3,
} as const;
```

client preset は現状未対応だった。

https://github.com/dotansimha/graphql-code-generator/pull/9981

## enumsAsType

`enumsAsConst`の代わりに enum を Union 型で生成してくれる`enumsAsType`が使えそう

## 参考

https://typescriptbook.jp/reference/values-types-variables/enum/enum-problems-and-alternatives-to-enums
