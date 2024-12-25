<script>
  import { fade, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { matchMediaController } from '@/scripts/matchMediaController';
  import { ScrollController } from '@/scripts/scrollController';
  import { onMount } from 'svelte';
  import linkList from '@/data/links.ts';

  const _scrollController = ScrollController();
  const breakpoint = '40em';

  let { selectedUrl = '' } = $props();
  let isOpen = $state(false);
  let isDisabled = $state(undefined);

  const change = (flag) => {
    console.log('change', flag);
    isOpen = flag;
    isDisabled = flag;
  };

  const close = () => {
    isOpen = false;
    _scrollController.release();
  };

  const open = () => {
    isOpen = true;
    _scrollController.lock();
  };

  const btnClick = () => {
    if (isDisabled) return;
    if (isOpen) close();
    else open();
  };

  const returnFocus = () => {
    if (isDisabled) return;
    document.querySelector('[data-role="control"]').focus();
  };

  onMount(() => {
    _scrollController.init();
    if (breakpoint) {
      matchMediaController().init({
        condition: '(min-width: ' + breakpoint + ')',
        callback: (match) => {
          change(match);
        },
      });
    }

    window.addEventListener(
      'keydown',
      (event) => {
        if (event.defaultPrevented) return;
        if (event.key === 'Esc' || event.key === 'Escape') {
          event.preventDefault();
          if (!isDisabled && isOpen) {
            close();
          }
        }
      },
      true,
    );
  });
</script>

<div class="global-navigation" class:-disabled={isDisabled}>
  {#if isDisabled}
    <ul class="global-navigation_pc" aria-hidden={!isOpen} data-role="navi">
      {#each linkList as item}
        <li>
          <a href={item.href} class="global-navigation_link" aria-current={item.href === selectedUrl}>
            {item.label}
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    {#if isOpen}
      <div
        class="global-navigation_bg"
        transition:fade={{ delay: 0, duration: 300, easing: quintOut }}
        aria-hidden={!isOpen}
        onclick={close}
      ></div>
    {/if}
    {#if isDisabled !== undefined}
      <button
        class="global-navigation_control"
        type="button"
        aria-label="menu"
        aria-expanded={isOpen}
        data-role="control"
        onclick={btnClick}
      >
        {#if isOpen}
          <span>close</span>
        {:else}
          <span>menu</span>
        {/if}
      </button>
    {/if}
    {#if isOpen}
      <ul
        class="global-navigation_sp"
        aria-hidden={!isOpen}
        data-role="navi"
        transition:scale={{ delay: 50, duration: 300, start: 1.1, easing: quintOut }}
      >
        {#each linkList as item}
          <li>
            <a href={item.href} class="global-navigation_link" aria-current={item.href === selectedUrl}>
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
      <button
        class="global-navigation_trap"
        type="button"
        data-role="trap"
        aria-label="global navigation trap"
        onfocus={returnFocus}
      ></button>
    {/if}
  {/if}
</div>

<style lang="scss">
  .global-navigation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    &.-disabled {
      position: relative;
      width: auto;
    }
  }

  .global-navigation_bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vi;
    height: 100vh;
    background-color: rgb(255 255 255 / 90%);
    backdrop-filter: blur(10px);

    .global-navigation.-disabled & {
      display: none;
    }
  }

  .global-navigation_pc {
    position: relative;
    display: none;
    gap: 1rem;
    align-items: center;

    .global-navigation.-disabled & {
      display: flex;
    }
  }

  .global-navigation_sp {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    width: 100vi;
    height: 100vh;
    pointer-events: none;

    & a {
      pointer-events: visible;
    }

    .global-navigation.-disabled & {
      display: none;
    }
  }

  .global-navigation_control {
    position: absolute;
    top: 0;
    right: var(--space-inline);
    padding-block: 0.5lh;
  }

  .global-navigation_trap {
    width: 0;
    height: 0;
    padding: 0;
    border: 0;
    opacity: 0;
  }

  .global-navigation_link {
    text-transform: capitalize;

    &[aria-current='true'] {
      text-decoration: none;
    }
  }
</style>
