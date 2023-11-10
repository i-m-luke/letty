<script lang="ts">
   import type LayoutLoadData from "./LayoutLoadData";
   import AppMainTree from "./(AppMainTree)/AppMainTree.svelte";

   export let data: LayoutLoadData;
</script>

<main class="h-screen flex flex-col font-serif">
   <div class="">
      <a href="/app/settings" class="text-a font-a">SETTINGS</a>
      <span>HELLO</span>
   </div>

   <div class="h-full flex flex-row">
      <div class="basis-1/6 p-2">
         <div class="bg-blue-100 p-2 border-2 rounded">
            <AppMainTree promptTreeState={data.promptTreeState} threadTreeState={data.threadTreeState} />
         </div>
      </div>

      <div class="basis-5/6 bg-blue-50 mt-2 p-2 border-2 rounded">
         <div class="bg-blue-100">
            <!-- WORKSPACE SLOT -->
            <slot />
            <!-- WORKSPACE SLOT -->
         </div>
      </div>
   </div>
</main>
