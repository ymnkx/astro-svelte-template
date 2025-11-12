<script lang="ts">
  import Icon from '@/components/Icon/Icon.svelte';

  interface Props {
    text: string;
    href: string;
    iconName?: string;
    iconPosition?: 'left' | 'right';
    target?: string;
    rel?: string;
    iconSize?: string;
  }

  let {
    text,
    href,
    iconName,
    iconPosition = 'left',
    target,
    rel,
    iconSize = '1.25rem',
  }: Props = $props();

  // 外部リンクの場合、自動でrel属性を設定
  let finalRel = $derived(
    rel || (target === '_blank' ? 'noopener noreferrer' : undefined)
  );
  let hasIcon = $derived(!!iconName);
  let iconLeft = $derived(hasIcon && iconPosition === 'left');
  let iconRight = $derived(hasIcon && iconPosition === 'right');
</script>

<a class="text-link" {href} {target} rel={finalRel}>
  {#if iconLeft}
    <span class="text-link_icon">
      <Icon name={iconName} size={iconSize} />
    </span>
  {/if}
  <span class="text-link_text">{text}</span>
  {#if iconRight}
    <span class="text-link_icon">
      <Icon name={iconName} size={iconSize} />
    </span>
  {/if}
</a>

<style lang="scss">
  .text-link {
    --this-color-text: var(--color-link, #0066cc);
    --this-color-text-hover: var(--color-link-hover, #0052a3);
    --this-gap: 0.25rem;
    --this-transition: color 0.2s ease;

    display: inline-flex;
    gap: var(--this-gap);
    align-items: center;
    color: var(--this-color-text);
    text-decoration: underline;
    text-underline-offset: 0.125rem;
    transition: var(--this-transition);

    // 外部リンクアイコンを自動表示
    &[target='_blank'] {
      &::after {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-inline-start: 0.125rem;
        content: '';
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25' /%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-size: contain;
        opacity: 0.7;
      }
    }

    @media (any-hover: hover) {
      &:hover {
        --this-color-text: var(--this-color-text-hover);
      }
    }

    &:focus {
      outline: 2px solid var(--color-focus, #0066cc);
      outline-offset: 2px;
    }
  }

  .text-link_icon {
    flex-shrink: 0;
    color: inherit;
  }

  .text-link_text {
    line-height: 1;
  }
</style>
