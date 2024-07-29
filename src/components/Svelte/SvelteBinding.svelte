<script>
	let name = 'sample';
</script>

<div class="set">
  <input bind:value={name}>
  <p>{name}</p>
</div>

<style>
  .set {
    display: flex;
    gap: 1rem;
  }
</style>
