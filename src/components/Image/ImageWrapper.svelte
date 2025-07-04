<script lang="ts">
  let { img, alt, loading = 'lazy' }: { img: ImageMetadata; alt: string; loading?: 'lazy' | 'eager' | null } = $props();
</script>

<img src={img.src} width={img.width} height={img.height} {alt} {loading} />
