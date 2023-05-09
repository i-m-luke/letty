<script lang="ts">
   import { goto } from "$app/navigation";
   import { isMobile } from "$lib/global-state";
   import type LayoutLoadData from "./LayoutLoadData";
   import type LayoutData from "./LayoutData";
   import AppMainTree from "./AppMainTree.svelte";

   export let data: LayoutLoadData;
</script>

<main>
   <div class="upper-container">
      <a href="/app/settings">SETTINGS</a>
      {#if $isMobile}
         <span>||</span>
         <button on:click={() => goto("/app")}>SHOW TREE</button>
      {/if}
   </div>

   <div class="root-container">
      <!-- TODO: Na mobilu se tree bude skrývat a půjde jej rozbalit skrze tlačítko [ >> ] -->
      {#if !$isMobile}
         <div class="side-container">
            <AppMainTree
               promptTreeState={data.promptTreeState}
               threadTreeState={data.threadTreeState}
            />
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
