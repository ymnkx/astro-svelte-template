<script lang="ts">
  let { showModal = $bindable(false), children } = $props();
  let dialog = $state<HTMLDialogElement>();
  let isClosing = $state(false);

  $effect(() => {
    if (dialog && showModal) dialog.showModal();
  });

  const closeModal = () => {
    isClosing = true;
    setTimeout(() => {
      dialog?.close();
      isClosing = false;
    }, 300);
  };

  const closeWithEsc = (e: KeyboardEvent) => {
    if (e.key === 'Esc' || e.key === 'Escape') {
      closeModal();
    }
  };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialog}
  onclose={() => (showModal = false)}
  onclick={(e) => e.target === dialog && closeModal()}
  onkeydown={closeWithEsc}
  class={isClosing ? '-is-closing' : ''}
>
  <div class="inner">
    {@render children?.()}
    <!-- svelte-ignore a11y_autofocus -->
    <button autofocus onclick={closeModal}>close modal</button>
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

    @starting-style {
      &,
      &::backdrop {
        opacity: 0;
      }
    }
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

  dialog[open].-is-closing {
    animation: move-back var(--this-duration) var(--this-easing);
    animation-fill-mode: forwards;
  }

  @keyframes move-back {
    from {
      opacity: 1;
      transform: translateY(0);
    }

    to {
      opacity: 0;
      transform: translateY(-16px);
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

  dialog[open].-is-closing::backdrop {
    animation: fade-back var(--this-duration) var(--this-easing);
    animation-fill-mode: forwards;
  }

  @keyframes fade-back {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .inner {
    max-width: 30rem;
    padding: 1em;
  }
</style>
