# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

### 開発用コマンド
```bash
npm install               # 依存関係インストール
npm run dev              # 開発サーバー起動（localhost:3000）
npm run build            # プロダクションビルド（自動フォーマット含む）
npm run preview          # ビルドしたファイルのプレビュー
npm run lint             # ESLintによるコードチェック（src/ 内の .astro, .ts ファイル）
```

### ビルド・デプロイ用コマンド
```bash
npm run delivery         # 納品用データ生成（./build/にファイル一覧付き）
npm run format           # Prettierによるdist/内HTMLの整形
npm run check-ngword     # NGワードチェック
```

### デザインシステム
```bash
npm run style-dictionary         # 全デザイントークン生成
npm run style-dictionary:base    # ベーストークン生成
npm run style-dictionary:composite  # 複合トークン生成（詳細ログ付き）
```

## アーキテクチャ

### プロジェクト構成
- **フレームワーク**: Astro + Svelte 5
- **言語**: TypeScript（必須、`any`型禁止）
- **スタイル**: SCSS + CSS変数 + Style Dictionary（デザイントークン）
- **品質管理**: ESLint + Prettier + Stylelint + Markuplint

### ディレクトリ構成
```
src/
├── pages/       # 各ページ（Astro標準機能）
├── layouts/     # ページレイアウト（全ページで使用必須）
├── blocks/      # ページ構成要素（Blockを組み合わせてページ制作）
├── components/  # 再利用可能コンポーネント（PascalCase命名）
├── data/        # サイトデータ（project.ts等）
├── scripts/     # ユーティリティ（camelCase命名）
├── styles/      # 共通スタイル
├── types/       # 型定義
├── icons/       # SVGアイコン
└── image/       # 画像アセット
```

### パスエイリアス
```typescript
"@/*": ["src/*"]
"@components/*": ["src/components/*"]  
"@layouts/*": ["src/layouts/*"]
"~/*": ["public/*"]
"@/image": "./src/image"
"@/icons": "./src/icons"
```

## 開発ルール

### Svelteコンポーネント（Svelte 5形式）
- `$props()`, `$state()`, `$derived()` を活用
- TypeScript interface必須
- `@use '@/styles/_develop/+.scss' as *;` でスタイル読み込み

### Astroコンポーネント
- Props interfaceを定義
- `Astro.props`でprop受け取り
- `lang="scss"`でSCSSスタイル使用

### スタイリング
- BEM記法
- CSS変数とデザイントークン使用
- Container Queriesでレスポンシブ対応
- GPU加速アニメーション推奨

### TypeScript
- 厳格設定（`astro/tsconfigs/strict`拡張）
- アロー関数優先
- named export推奨
- 日本語コメント推奨

## 設定ファイル

### ビルド設定
- 出力ディレクトリ: `./dist${baseUrl}`
- アセット: `_assets/` 配下に分類
- CSS/JSは外部ファイル化
- WebP変換プラグイン使用（品質75%）
- SVGスプライト自動生成

### サイト設定
`src/data/project.ts`でサイト情報とブレークポイントを管理:
```typescript
{
  siteName, siteDescription, siteUrl, baseUrl,
  breakpoints: { sm: '0', md: '48em', lg: '75em', xlg: '90em', xxlg: '100em' }
}
```