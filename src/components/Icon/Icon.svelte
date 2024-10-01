<script>
  export let name = 'check';
  export let size = '1.5rem';
  const baseUrl = import.meta.env.BASE_URL;
</script>

<svg viewBox="0 0 24 24" class="icon" style="--this-size: {size}">
  <use href={`${baseUrl}assets/svg/icons.svg#${name}`}></use>
</svg>

<style>
  .icon {
    --this-size: var(--icon-size, 1.5rem);

    width: var(--this-size);
    height: var(--this-size);
  }
</style>
