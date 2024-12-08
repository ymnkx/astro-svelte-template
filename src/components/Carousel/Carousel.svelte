<script lang="ts">
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css';
</script>

<div class="container">
  <Splide
    aria-label="お気に入りの写真"
    options={{
      type: 'loop',
      perPage: 3,
      gap: '1rem',
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
    aspect-ratio: 1/1;
    font-size: 5vw;
    background-color: lightblue;
  }
</style>
