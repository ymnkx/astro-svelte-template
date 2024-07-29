<script>
  export let name = 'sample';
  const baseUrl = import.meta.env.BASE_URL;
</script>

<svg viewBox="0 0 24 24" class="icon">
  <use href={`${baseUrl}assets/svg/icons.svg#${name}`}></use>
</svg>

<style>
  .icon {
    --this-size: var(--icon-size, 1.5rem);

    display: inline-block;
    width: var(--this-size);
    height: var(--this-size);
    vertical-align: top;
  }
</style>
