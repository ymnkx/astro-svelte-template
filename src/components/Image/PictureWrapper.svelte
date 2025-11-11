<script lang="ts">
  import type { ImageMetadata } from 'astro';
  let {
    img,
    alt,
    loading = 'lazy',
  }: {
    img: { md: ImageMetadata; sp: ImageMetadata };
    alt: string;
    loading?: 'lazy' | 'eager' | undefined;
  } = $props();
</script>

<picture>
  <source
    media="(min-width: 48em)"
    srcset={img.md.src}
    width={img.md.width}
    height={img.md.height}
  />
  <img
    src={img.sp.src}
    width={img.sp.width}
    height={img.sp.height}
    {alt}
    {loading}
  />
</picture>
