<script lang="ts">
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css';
  import { onMount } from 'svelte';
  let mySlider: Splide;

  onMount(() => {
    // console.log(mySlider.splide.Components.Move);
    // mySlider.go(2);
    const { Move, Controller } = mySlider.splide.Components;
    Move.jump(2);
    // Controller.setIndex(2);
    mySlider.go(2); // paginationやarrowsを更新するため
  });
</script>

<div class="container">
  <Splide
    bind:this={mySlider}
    aria-label="お気に入りの写真"
    options={{
      rewind: true,
      type: 'loop',
      perPage: 1,
    }}
  >
    <SplideSlide>
      <div class="item">1</div>
    </SplideSlide>
    <SplideSlide>
      <div class="item">2</div>
    </SplideSlide>
    <SplideSlide>
      <div class="item">3</div>
    </SplideSlide>
    <SplideSlide>
      <div class="item">4</div>
    </SplideSlide>
    <SplideSlide>
      <div class="item">5</div>
    </SplideSlide>
  </Splide>
</div>

<style lang="scss">
  .container {
    width: 100%;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 3/1;
    font-size: 5vw;
    background-color: lightblue;
  }
</style>
