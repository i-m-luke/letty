<script lang="ts">
   import type LayoutLoadData from "./LayoutLoadData";
   import AppMainTree from "./(AppMainTree)/AppMainTree.svelte";

   export let data: LayoutLoadData;
</script>

<main>
   <div class="upper-container">
      <a href="/app/settings">SETTINGS</a>
   </div>

   <div class="root-container">
      <div class="side-container">
         <AppMainTree promptTreeState={data.promptTreeState} threadTreeState={data.threadTreeState} />
      </div>

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
