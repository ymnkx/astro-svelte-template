<script>
  import { fade, fly, slide, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  let isFade = false;
  let isFly = false;
  let isSlide = false;
  let isScale = false;
</script>

<ul class="list">
  <li>
    <button
      type="button"
      on:click={() => {
        isFade = !isFade;
      }}>FADE</button
    >
    {#if isFade}
      <div transition:fade={{ delay: 0, duration: 300 }}>fades in and out</div>
    {/if}
  </li>

  <li>
    <button
      type="button"
      on:click={() => {
        isFly = !isFly;
      }}>FLY</button
    >
    {#if isFly}
      <div transition:fly={{ delay: 0, duration: 300, x: 100 }}>fly in and out</div>
    {/if}
  </li>

  <li>
    <button
      type="button"
      on:click={() => {
        isSlide = !isSlide;
      }}>SLIDE</button
    >
    {#if isSlide}
      <div transition:slide={{ delay: 0, duration: 300 }}>slide in and out</div>
    {/if}
  </li>

  <li>
    <button
      type="button"
      on:click={() => {
        isScale = !isScale;
      }}>SCALE</button
    >
    {#if isScale}
      <div>
        <div
          transition:scale={{ delay: 0, duration: 300, opacity: 0, start: 0.5, easing: quintOut }}
          style="display: inline-block"
        >
          scale in and out
        </div>
      </div>
    {/if}
  </li>
</ul>

<style lang="scss">
  .list {
    display: flex;
    flex-direction: column;
    gap: 1lh;
  }
</style>
