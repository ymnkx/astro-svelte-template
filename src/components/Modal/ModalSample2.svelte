<script lang="ts">
  import Button from '../Button/Button.svelte';
  import Modal from './Modal.svelte';
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  let showModal = false;
  let mySlider: Splide;

  const openModal = (n = 0) => {
    showModal = true;
    setTimeout(() => {
      mySlider.splide.refresh();
      const { Move } = mySlider.splide.Components;
      Move.jump(n);
      mySlider.go(n);
    });
  };
</script>

<div>
  <Button onclick={() => (showModal = true)} label={`Open Modal`} />
  <Button onclick={() => openModal(2)} label={`Open Modal(3)`} />
  <Button onclick={() => openModal(4)} label={`Open Modal(5)`} />
</div>
<Modal bind:showModal>
  <Splide
    bind:this={mySlider}
    aria-label="sample carousel"
    options={{
      // type: 'loop',
      perPage: 1,
      start: 0,
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
</Modal>

<style lang="scss">
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30rem;
    max-width: 100%;
    aspect-ratio: 1/1;
    font-size: 5vw;
    background-color: orangered;
  }
</style>
