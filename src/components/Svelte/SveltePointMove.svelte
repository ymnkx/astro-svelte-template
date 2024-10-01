<script>
  let m = { clientX: 0, clientY: 0, offsetX: 0, offsetY: 0 };

  const handleMove = (event) => {
    m.clientX = event.clientX;
    m.clientY = event.clientY;
    m.offsetX = event.offsetX;
    m.offsetY = event.offsetY;
  };
</script>

<div on:pointermove={handleMove} class="box">
  <p>clientX: {m.clientX}<br />clientX: {m.clientY}</p>
  <p>offsetX: {m.offsetX}<br />offsetY: {m.offsetY}</p>
</div>

<style>
  .box {
    align-content: center;
    width: 100%;
    height: 100%;
    padding: 1rem;
    background-color: var(--color-gray-700);
  }
</style>
