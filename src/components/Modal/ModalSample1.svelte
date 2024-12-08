<script lang="ts">
  import Button from '../Button/Button.svelte';
  import Modal from './Modal.svelte';
  let showModal = false;
</script>

<Button on:click={() => (showModal = true)} label={`Open Modal`} />
<Modal bind:showModal>
  <h2>modal adjective mod·al \ˈmō-dəl\</h2>
  <p>This is a sample modal with a carousel. Use the buttons to open the modal at different slide indexes.</p>
</Modal>
