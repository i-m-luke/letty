<script lang="ts">
  import { goto } from "$app/navigation";
  import { TreeMode } from "$lib/enums";
  import { isMobile, activeTreeMode } from "$lib/store";
  import type LayoutLoadData from "./LayoutLoadData";
  import type LayoutData from "./LayoutData";
  import MainTree from "./MainTree.svelte";
  import { transformData } from "./$layout-logic";

  export let data: LayoutLoadData;
  const tData: LayoutData = transformData(data);

  $: toggleTreeModeButtonText = $activeTreeMode === TreeMode.Prompt ? "Thread" : "Prompt";
  const toggleTreeMode = () => {
    $activeTreeMode = $activeTreeMode === TreeMode.Prompt ? TreeMode.Thread : TreeMode.Prompt;
    goto("/app/main");
  };
</script>

<main>
  <div class="upper-container">
    <a href="/app/settings">SETTINGS</a>
    <span>||</span>
    <button on:click={toggleTreeMode}>SWITCH TO {toggleTreeModeButtonText}</button>
    {#if $isMobile}
      <span>||</span>
      <button on:click={() => goto("/app/main")}>SHOW TREE</button>
    {/if}
  </div>

  <div class="root-container">
    {#if !$isMobile}
      <div class="side-container">
        <MainTree {tData} />
      </div>
    {/if}

    <div class="main-container">
      <!-- WORKSPACE SLOT -->
      <slot />
      <!-- WORKSPACE SLOT -->
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .root-container {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .side-container {
    flex-grow: 1;
    background-color: aqua;
  }

  .main-container {
    flex-grow: 6;
    background-color: grey;
  }
</style>
