<script>
  let { name = 'check', size = '1.5rem' } = $props();
  import icons from '@/icons/icons.svg?url';
</script>

<svg viewBox="0 0 24 24" class="icon" style="--this-size: {size}">
  <use href={icons + '#' + name}></use>
</svg>

<style>
  .icon {
    --this-size: var(--icon-size, 1.5rem);

    width: var(--this-size);
    height: var(--this-size);
  }
</style>
