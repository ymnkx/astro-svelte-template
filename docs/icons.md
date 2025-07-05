## Icon管理

Iconは、複数のIconをまとめた「スプライト画像」に変換して使用します。各Iconのsvgファイルを指定のフォルダに入れ、コマンドでスプライトファイルを生成します。<br/>

```bash
npm run svgsprite
```

| 名前                   | パス                   |
| ---------------------- | ---------------------- |
| 各Icon の SVGデータ    | `/src/icons/**.svg`    |
| 変換したスプライト画像 | `/src/icons/icons.svg` |

### 使用方法

アイコンは、スプライト画像からidで指定します。
たとえば、`/src/icons/sample.svg` をスプライト画像に変換後、以下のように呼び出すことができます。<br/>

```html
<svg viewBox="0 0 24 24">
  <use href="/assets/svg/icons.svg#sample"></use>
</svg>
```

上記のコードを含んだIconコンポーネント（`/src/components/Icon.svelte`）を用意してます。

```html
<Icon name="arrow" />
```

```html
<Icon name="code-bracket" size="2rem" />
```

### 備考

- 上記のように、svgのuseを使用して呼び出すことで、CSSのcolorで色の変更が可能です。
- アイコンは、余白を含めた同一サイズで管理しましょう。
