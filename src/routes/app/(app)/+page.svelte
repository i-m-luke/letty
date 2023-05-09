<script lang="ts">
   import { isMobile } from "$lib/global-state";
   import type LayoutLoadData from "./LayoutLoadData";
   import AppMainTree from "./AppMainTree.svelte";

   export let data: LayoutLoadData;
</script>

{#if $isMobile}
   <AppMainTree promptTreeState={data.promptTreeState} threadTreeState={data.threadTreeState} />
{/if}
