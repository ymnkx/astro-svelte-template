<script lang="ts">
  export let showModal: boolean;
  let dialog: HTMLDialogElement;
  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={() => (showModal = false)} on:click|self={() => dialog.close()}>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="inner" on:click|stopPropagation>
    <slot></slot>
    <!-- svelte-ignore a11y-autofocus -->
    <button autofocus on:click={() => dialog.close()}>close modal</button>
  </div>
</dialog>

<style lang="scss">
  dialog {
    --this-easing: cubic-bezier(0, 0, 0.2, 1);
    --this-duration: 0.3s;

    margin: auto;
    border: 0;
    border-radius: 1rem;

    &,
    &::backdrop {
      opacity: 0;

      // iOS Safari/Chrome で消える時に崩れるため、いったんコメントアウト
      // transition-timing-function: var(--this-easing);
      // transition-duration: var(--this-duration);
      // transition-property: opacity, overlay, display;
      // transition-behavior: normal, allow-discrete, allow-discrete;
    }

    &::backdrop {
      background-color: rgba(0 0 0 / 80%);
    }
  }

  dialog:modal {
    &,
    &::backdrop {
      opacity: 1;
    }

    // @starting-style {
    //   &,
    //   &::backdrop {
    //     opacity: 0;
    //   }
    // }
  }

  dialog[open] {
    animation: move var(--this-duration) var(--this-easing);
  }

  @keyframes move {
    from {
      transform: translateY(16px);
    }

    to {
      transform: translateY(0);
    }
  }

  dialog[open]::backdrop {
    animation: fade var(--this-duration) var(--this-easing);
  }

  @keyframes fade {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .inner {
    max-width: 30rem;
    padding: 1em;
  }
</style>
