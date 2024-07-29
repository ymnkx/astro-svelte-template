<script>
  let count = 0;

  const handleClick = (event) => {
    count += 1;
  };
</script>

<button on:click={handleClick} class="btn">
  count: {count}
</button>

<style lang="scss">
  .btn {
    padding: 0.25lh 1em;
    background-color: var(--color-white);
    border: 1px solid #ccc;
    border-radius: var(--radius-midium);
  }
</style>
