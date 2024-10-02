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
    <div id={tabList[0].id}>
      タブUIの汎用化は難しい。<br />Svelt5ではslotが非推奨になるらしいし、一旦保留にする。<br
      />仕組み自体は簡単だし、汎用化はいらないかも。
    </div>
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

  .tab-menu_list {
    display: flex;
  }

  .tab-menu_button {
    flex: 1;
    padding: 0.125lh 1.5rem;
    margin-inline-start: -1px;
    border: 1px solid var(--color-border);

    &[aria-selected='true'] {
      background-color: var(--color-gray-1000);
    }
  }

  .tab-menu_panel {
    padding: 0.5lh 1.5rem;
    margin-block-start: -1px;
    background-color: rgb(0 0 0 / 5%);
    border: 1px solid var(--color-border);
  }
</style>
