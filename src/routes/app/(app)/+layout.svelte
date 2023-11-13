<script lang="ts">
   import type LayoutLoadData from "./LayoutLoadData";
   import AppMainTree from "./(AppMainTree)/AppMainTree.svelte";
   import styles from "$styles";
   export let data: LayoutLoadData;

   const { colors } = styles;
   // styles.colors.primary = "";
</script>

<main class="min-h-1/2 h-auto flex flex-col">
   <!-- upper-menu-panel -->
   <div class="">
      <a href="/app/settings" class="text-a font-a">SETTINGS</a>
      <span>HELLO</span>
   </div>

   <!-- mid-panel -->
   <div class="h-full flex flex-row">
      <!-- left-panel -->
      <div class="basis-1/6 p-2">
         <div class={styles.build(colors.primary, "p-2 border-2 rounded")}>
            <AppMainTree promptTreeState={data.promptTreeState} threadTreeState={data.threadTreeState} />
         </div>
      </div>

      <!-- main-panel -->
      <div class={styles.build(colors.primary, "basis-5/6 mt-2 border-2 rounded")}>
         <div class={styles.build(colors.primary, "p-2 border-2 rounded")}>
            <!-- WORKSPACE SLOT -->
            <slot />
            <!-- WORKSPACE SLOT -->
         </div>
      </div>
   </div>
</main>
