# コーディングルール

このプロジェクトのコーディングルールとCursor AI設定について説明するにゃ。

## 📁 ルールファイル構成

### `.cursor/rules/` ディレクトリ

- `core.mdc` - 基本的なプロジェクトルール（常時適用）
- `astro-svelte.mdc` - Astro/Svelteコンポーネント開発ルール
- `typescript.mdc` - TypeScript開発ルール
- `css-scss.mdc` - CSS/SCSS スタイリングルール

## 🛠 技術スタック

- **フレームワーク**: Astro + Svelte 5
- **言語**: TypeScript（必須）
- **スタイル**: SCSS + CSS変数
- **品質管理**: ESLint + Prettier + Stylelint + Markuplint
- **デザインシステム**: Style Dictionary（デザイントークン）

## 📋 基本ルール

### ファイル・ディレクトリ命名

```
src/
├── components/       # 再利用可能コンポーネント
│   └── Button/      # PascalCase
│       ├── Button.svelte
│       └── Button.stories.ts
├── blocks/          # ページ固有ブロック
├── scripts/         # ユーティリティ（camelCase）
└── layouts/         # レイアウト
```

### コーディングスタイル

- **TypeScript**: `any`禁止、アロー関数優先、named export推奨
- **Svelte 5**: `$props()`, `$state()`, `$derived()`活用
- **SCSS**: BEM記法、CSS変数、デザイントークン使用
- **コメント**: 日本語推奨

## 🔧 開発環境設定

### 必須ツール

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# コード品質チェック
npm run lint

# スタイル自動整形
npm run format
```

### VSCode/Cursor 推奨拡張

- Astro
- Svelte for VS Code
- TypeScript Importer
- SCSS IntelliSense
- ESLint
- Prettier

## 📝 コンポーネント作成例

### Svelteコンポーネント

```svelte
<script lang="ts">
  interface Props {
    title: string;
    variant?: 'primary' | 'secondary';
  }

  let { title, variant = 'primary' }: Props = $props();
  let classList = $derived(`btn -${variant}`);
</script>

<button class={classList}>
  {title}
</button>

<style lang="scss">
  @use '@/styles/_develop/+.scss' as *;

  .btn {
    // スタイル定義
  }
</style>
```

### Astroコンポーネント

```astro
---
interface Props {
  title: string;
  size?: 'small' | 'medium' | 'large';
}
const { title, size = 'medium' } = Astro.props;
---

<div class={`component -${size}`}>
  <h2>{title}</h2>
  <slot />
</div>

<style lang="scss">
  @use '@/styles/_develop/+.scss' as *;

  .component {
    // スタイル定義
  }
</style>
```

## ✅ チェックリスト

### 新規コンポーネント作成時

- [ ] TypeScript interface定義
- [ ] props validation
- [ ] SCSS使用（`@use '@/styles/_develop/+.scss' as *;`）
- [ ] CSS変数活用
- [ ] レスポンシブ対応
- [ ] アクセシビリティ考慮

### コミット前

- [ ] `npm run lint`でエラーなし
- [ ] `npm run format`で整形済み
- [ ] TypeScriptエラーなし
- [ ] 日本語コメント追加

## 🚀 パフォーマンス

- CSS変数でテーマ切り替え
- Container Queriesでレスポンシブ
- GPU加速アニメーション
- 適切なセレクタ使用

## 🎯 品質管理

### 自動チェック

- **ESLint**: JavaScript/TypeScript品質
- **Prettier**: コード整形
- **Stylelint**: SCSS品質
- **Markuplint**: HTML品質

### 手動チェック

- セマンティックHTML
- アクセシビリティ対応
- パフォーマンス最適化
- コードレビュー

---

**困ったときは**: このルールファイルを参照するか、チームメンバーに相談してくださいにゃ！
