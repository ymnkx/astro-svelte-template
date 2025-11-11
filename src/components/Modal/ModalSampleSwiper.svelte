<script lang="ts">
  import Button from '../Button/Button.svelte';
  import Modal from './Modal.svelte';
  import CarouselForModal from '../CarouselSwiper/CarouselForModal.svelte';
  let showModal = $state(false);
  let currentIndex = $state<number>(0);
  const openModal = (n = 0) => {
    currentIndex = n;
    showModal = true;
    console.log('currentIndex:a', currentIndex);
  };
  const onIndexChange = (index: number) => {
    console.log('index:a', index);
    // currentIndex = index;
  };
</script>

<div>
  <Button onclick={() => openModal(0)}>{`Open Modal(1)`}</Button>
  <Button onclick={() => openModal(2)}>{`Open Modal(3)`}</Button>
  <Button onclick={() => openModal(4)}>{`Open Modal(5)`}</Button>
</div>

<Modal bind:showModal>
  <Button onclick={() => openModal(3)}>{`Open Modal(4)`}</Button>
  <CarouselForModal
    id="js-modal-coswiper-sample"
    props={{ loop: true, spaceBetween: 10, slidesPerView: 1, pagination: true }}
    {currentIndex}
    {onIndexChange}
  />
</Modal>
