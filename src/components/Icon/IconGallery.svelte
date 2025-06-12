<script>
  import Icon from './Icon.svelte';

  // 表示したいアイコン名のリスト
  const icons = ['check', 'chevron-right', 'x-mark', 'code-bracket', 'exclamation-circle'];
</script>

<div class="gallery">
  {#each icons as name}
    <div class="item">
      <div class="icon">
        <Icon {name} />
      </div>
      <div class="name">{name}</div>
    </div>
  {/each}
</div>

<style>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
  }

  .icon {
    margin-bottom: 8px;
    font-size: 32px;
  }

  .name {
    font-size: 12px;
    color: #666666;
    text-align: center;
    word-break: break-all;
  }
</style>
