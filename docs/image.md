## 画像

Astro と Svelte のコンポーネントで画像を使用するにあたり、デフォルトの方法は以下とします。

- srcフォルダにある画像をimportする。（画像コンポーネントを用意してある）
  - src、width、heightを使用する。
  - Build時にハッシュ化し、Astroインテグレーションで自動でwebp化。
- publicフォルダの画像は例外的に使用する。
  - その場合、全て手動で設定する。

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

Astroインテグレーションを使用して、ビルド時に自動でwebp化します。
インテグレーションは、 `/plugins/webp-converter.ts` に記述しています。カスタムしたい場合はこちらを編集してください。
