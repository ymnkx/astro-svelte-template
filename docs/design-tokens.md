## Design Tokens

Design Tokens とは、デザインシステムで使用する色や文字、余白、動きなどの情報のことです。

### 参考

- [Adobe](https://spectrum.adobe.com/page/design-tokens/)
- [SmartHR](https://smarthr.design/products/design-tokens/)
- [Material Design](https://m3.material.io/foundations/design-tokens/how-to-read-tokens)
- [Serendie Design System](https://serendie.design/foundations/design-tokens/)

### 分類

以下の分類を採用します。

| 名前            | 説明                                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Primitive token | • 使用する値を全て登録する。<br/>                                                                                                   |
| Alias token     | • 概念的な要素。必要に応じて設定する。<br/>                                                                                         |
| Semantic token  | • 要素に対する体系的な設定。<br/>• 各BlockやComponentの要素に設定する。<br/>• 使用する値はPrimitive TokenかAlias Tokenを呼ぶ。<br/> |

### 管理方法

デザイントークン（Primitive Token、Alias Token）をjsonファイルで管理し、Style Dictionary を使用して SCSS ファイルに変換します。
すべての値を Figma Variables で管理するのは難しく、現状、3種類のJSONファイルで管理しています。

| 名前               | 説明                                                  |
| ------------------ | ----------------------------------------------------- |
| /tokens/figma/     | • Figma Variables から出力した Tokens                 |
| /tokens/other/     | • 手動で管理する Tokens（z-indexやanimation関連など） |
| /tokens/composite/ | • 手動で管理する複合 Tokens（タイポグラフィ設定など） |

### 変換

変換は command で実行します。

```bash
npm run style-dictionary
```

| 名前                            | 説明                       | 出力形式              |
| ------------------------------- | -------------------------- | --------------------- |
| `/tokens/design-tokens.scss`    | デザイントークンのファイル | cssカスタムプロパティ |
| `/tokens/design-composite.scss` | 複合トークンのファイル     | sass mixin            |
