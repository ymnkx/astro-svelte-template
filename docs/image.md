## 画像

Astro と Svelte のコンポーネントで画像を使用するにあたり、デフォルトの方法は以下とします。

- webp変換は手動で行う。
- srcフォルダにある画像をimportする（画像コンポーネントを用意してある）
  - src、width、heightを使用する。
  - Build時にハッシュ化。
- 状況に合わせて、例外としてstro画像や@sveltejs/enhanced-img、Public画像を使用する。

### 画像コンポーネント

- AstroでもSvelteでも使用できるSvelte製の「画像コンポーネント」を用意してます。

```
---
import SampleSrcImage from '@/image/sample.webp';
import SampleSrcImageSp from '@/image/sample_sp.webp';
import SampleSrcImagePc from '@/image/sample_pc.webp';
---

<ImageWrapper img={SampleSrcImage} alt="画像のせつめい" />
<PictureWrapper img={{ sp: SampleSrcImageSp, md: SampleSrcImagePc }} alt="画像のせつめい" />
```

### webp変換

コマンドを使用して、jpg画像やpng画像をwebp画像に変換します。
変換コマンドは `/scripts/convertWebp.js` に記述しています。カスタムしたい場合はこちらを編集してください。
（Viteプラグイン化を検討中です）

```bash
npm run convert-webp
```

| 名前   | ディレクトリ     | ファイル形式 |
| ------ | ---------------- | ------------ |
| 変換前 | /convert/input/  | jpg, png     |
| 変換後 | /convert/output/ | webp         |
