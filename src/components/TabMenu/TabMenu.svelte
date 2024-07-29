<script>
  const tabList = [
    { id: 'tab-a', label: 'tab A' },
    { id: 'tab-b', label: 'tab B' },
    { id: 'tab-c', label: 'tab C' },
  ];
  let selectedTab = tabList[0].id;
</script>

<div class="tab-menu_list">
  {#each tabList as tab}
    <button
      type="button"
      class="tab-menu_button"
      role="tab"
      aria-selected={selectedTab === tab.id}
      aria-controls={tab.id}
      on:click={() => {
        selectedTab = tab.id;
      }}
    >
      {tab.label}
    </button>
  {/each}
</div>
<div class="tab-menu_panel">
  {#if selectedTab === tabList[0].id}
    <div id={tabList[0].id}>tab A content</div>
  {/if}
  {#if selectedTab === tabList[1].id}
    <div id={tabList[1].id}>tab B content</div>
  {/if}
  {#if selectedTab === tabList[2].id}
    <div id={tabList[2].id}>tab C content</div>
  {/if}
</div>

<style lang="scss">
  // .tab-menu {}

  .tab-menu_button {
    padding: 0.125lh 1.5rem;
    background-color: var(--color-white);

    &[aria-selected='true'] {
      background-color: #ffc0c0;
    }
  }
</style>
