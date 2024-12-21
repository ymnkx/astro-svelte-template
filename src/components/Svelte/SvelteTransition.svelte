<script>
  import { fade, fly, slide, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import SvelteStack from './SvelteStack.svelte';

  let isFade = $state(false);
  let isFly = $state(false);
  let isSlide = $state(false);
  let isScale = $state(false);
</script>

<SvelteStack>
  <div class="item">
    <button
      type="button"
      onclick={() => {
        isFade = !isFade;
      }}>FADE</button
    >
    {#if isFade}
      <div transition:fade={{ delay: 0, duration: 300 }}>fades in and out</div>
    {/if}
  </div>
  <div class="item">
    <button
      type="button"
      onclick={() => {
        isFly = !isFly;
      }}>FLY</button
    >
    {#if isFly}
      <div transition:fly={{ delay: 0, duration: 300, x: 100 }}>fly in and out</div>
    {/if}
  </div>
  <div class="item">
    <button
      type="button"
      onclick={() => {
        isSlide = !isSlide;
      }}>SLIDE</button
    >
    {#if isSlide}
      <div transition:slide={{ delay: 0, duration: 300 }}>slide in and out</div>
    {/if}
  </div>
  <div class="item">
    <button
      type="button"
      onclick={() => {
        isScale = !isScale;
      }}>SCALE</button
    >
    {#if isScale}
      <div class="item">
        <div
          transition:scale={{ delay: 0, duration: 300, opacity: 0, start: 0.5, easing: quintOut }}
          style="display: inline-block"
        >
          scale in and out
        </div>
      </div>
    {/if}
  </div>
</SvelteStack>

<style lang="scss">
  .item {
    text-align: center;
  }
</style>
