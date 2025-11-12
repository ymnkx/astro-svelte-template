<script lang="ts">
  import Button from '@/components/Button/Button.svelte';
  import Modal from '@/components/Modal/Modal.svelte';
  import CarouselForModal from '@/components/CarouselEmbla/CarouselForModal.svelte';

  let carousel: CarouselForModal;
  let showModal = $state(false);
  const openModal = (n = 0, jump = false) => {
    showModal = true;
    carousel?.scrollTo(n, jump);
  };
</script>

<div>
  <Button onclick={() => openModal(0, true)}>{`Open Modal(1)`}</Button>
  <Button onclick={() => openModal(2, true)}>{`Open Modal(3)`}</Button>
  <Button onclick={() => openModal(4, true)}>{`Open Modal(5)`}</Button>
</div>

<Modal bind:showModal>
  <Button
    onclick={() => {
      carousel?.scrollTo(3);
    }}>{`Open Modal(4)`}</Button
  >
  <CarouselForModal bind:this={carousel} />
</Modal>
