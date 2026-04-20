<script lang="ts">
  import { onMount } from 'svelte';
  import { smoothScrollInPage } from '@/scripts/smoothScroll';
  const { linkList } = $props();
  let selectedId = $state();
  let sections: Array<HTMLAnchorElement> = [];

  const setIntersectionObserver = () => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.target.id === sections[1].id) {
          selectedId = 'top';
          return;
        }
        if (entry.isIntersecting) {
          selectedId = entry.target.id;
        } else {
          if (sections && entry.target.id === sections[0].id) {
            selectedId = '';
          }
        }
      });
    }, observerOptions);
    sections?.forEach((item) => {
      observer.observe(item);
    });
  };

  const setSmoothScroll = () => {
    setTimeout(() => {
      smoothScrollInPage({
        selector: '.page-menu',
      });
    }, 100);
  };

  onMount(() => {
    linkList.forEach((link: HTMLElement) => {
      const targetSection: HTMLAnchorElement | null = document.querySelector(`#${link.id}`);
      if (targetSection) sections.push(targetSection);
    });
    setIntersectionObserver();
    setSmoothScroll();
  });
</script>

<ul class="page-menu">
  {#each linkList as link}
    <li>
      <a href={`#${link.id}`} class="link" class:-selected={selectedId === link.id}>
        {link.label}
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
  @use '@/styles/_develop/+.scss' as *;

  .page-menu {
    text-align: right;
  }

  .link {
    color: blue;

    &.-selected {
      color: red;
    }
  }
</style>
