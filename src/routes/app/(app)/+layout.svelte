<script lang="ts">
   import type LayoutLoadData from "./LayoutLoadData";
   import AppMainTree from "./(AppMainTree)/AppMainTree.svelte";
   import styles from "$styles";
   import Background from "./Background.svelte";
   export let data: LayoutLoadData;

   const { mainPanel: mainPanelStyle } = styles.class;
</script>

<main class="bg-white h-screen">
   <!-- pozadí -->
   <div class="w-full h-full">
      <Background />
   </div>
   <div class="absolute z-index-1 top-0 left-0 w-full min-h-1/2 p-12 flex flex-col space-y-2">
      <!-- upper-menu-panel -->
      <div class="flex flex-row gap-1">
         <div class={styles.build(mainPanelStyle, "w-4 min-w-fit py-2")}>
            <a href="./"><div class="fa-solid fa-user" /></a>
         </div>
         <div class={styles.build(mainPanelStyle, "w-4 min-w-fit py-2")}>
            <a href="/app/settings"><div class="fa-solid fa-gear" /></a>
         </div>
      </div>

      <!-- mid-panel -->
      <div class="h-full flex flex-row space-x-4">
         <!-- left-panel -->
         <div class="min-w-[fit-content]">
            <div class={mainPanelStyle}>
               <AppMainTree promptTreeNodeInfos={data.promptTreeState} threadTreeNodeInfos={data.threadTreeState} />
            </div>
         </div>

         <!-- main-panel -->
         <div class={styles.build(mainPanelStyle, "w-full")}>
            <div class="p-4 rounded">
               <!-- WORKSPACE SLOT -->
               <slot />
               <!-- WORKSPACE SLOT -->
            </div>
         </div>
      </div>
   </div>
</main>
