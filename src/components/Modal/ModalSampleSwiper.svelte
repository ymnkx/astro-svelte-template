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
    // console.log('index:a', index);
    // currentIndex = index;
  };
</script>

<div>
  <Button onclick={() => openModal(0)} label={`Open Modal(1)`} />
  <Button onclick={() => openModal(2)} label={`Open Modal(3)`} />
  <Button onclick={() => openModal(4)} label={`Open Modal(5)`} />
</div>

<Modal bind:showModal>
  <Button onclick={() => openModal(3)} label={`Open Modal(4)`} />
  <CarouselForModal
    id="js-modal-coswiper-sample"
    props={{ loop: true, spaceBetween: 10, slidesPerView: 1, pagination: true }}
    {currentIndex}
    {onIndexChange}
  />
</Modal>
