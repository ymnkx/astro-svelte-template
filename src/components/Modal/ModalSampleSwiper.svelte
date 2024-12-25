<script lang="ts">
  import { register } from 'swiper/element/bundle';
  register();
  const spaceBetween = 10;

  import Button from '../Button/Button.svelte';
  import Modal from './Modal.svelte';
  import { onMount } from 'svelte';
  let showModal = false;
  let swiperElement: any;

  const openModal = (n = 0) => {
    showModal = true;
    swiperElement.swiper.slideTo(n);
  };

  onMount(() => {
    swiperElement = document.querySelector('#js-swiper-sample');
  });
</script>

<div>
  <Button onclick={() => (showModal = true)} label={`Open Modal`} />
  <Button onclick={() => openModal(2)} label={`Open Modal(3)`} />
  <Button onclick={() => openModal(4)} label={`Open Modal(5)`} />
</div>
<Modal bind:showModal>
  <div class="wrapper">
    <swiper-container
      id="js-swiper-sample"
      space-between={spaceBetween}
      centered-slides={true}
      slidesPerView={1}
      pagination={{
        hideOnClick: false,
      }}
    >
      <swiper-slide><div class="item">1</div></swiper-slide>
      <swiper-slide><div class="item">2</div></swiper-slide>
      <swiper-slide><div class="item">3</div></swiper-slide>
      <swiper-slide><div class="item">4</div></swiper-slide>
      <swiper-slide><div class="item">5</div></swiper-slide>
    </swiper-container>
  </div>
</Modal>

<style lang="scss">
  .wrapper {
    width: 100%;
  }

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
