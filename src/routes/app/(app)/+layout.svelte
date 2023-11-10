<script lang="ts">
   import type LayoutLoadData from "./LayoutLoadData";
   import AppMainTree from "./(AppMainTree)/AppMainTree.svelte";

   export let data: LayoutLoadData;
</script>

<main class="min-h-1/2 h-auto flex flex-col font-serif">
   <!-- upper -->
   <div class="">
      <a href="/app/settings" class="text-a font-a">SETTINGS</a>
      <span>HELLO</span>
   </div>

   <!-- main -->
   <div class="h-full flex flex-row">
      <!-- left -->
      <div class="basis-1/6 p-2">
         <div class="bg-indigo-50 p-2 border-2 rounded">
            <AppMainTree promptTreeState={data.promptTreeState} threadTreeState={data.threadTreeState} />
         </div>
      </div>

      <!-- right -->
      <div class="basis-5/6 bg-indigo-50 mt-2 border-2 rounded">
         <div class="bg-indigo-50 p-2 border-2 rounded">
            <!-- WORKSPACE SLOT -->
            <slot />
            <!-- WORKSPACE SLOT -->
         </div>
      </div>
   </div>
</main>
