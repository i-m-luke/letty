<script lang="ts">
   import { isMobile } from "$lib/global-state";
   import type PageData from "./PageData";
   import type PageLoadData from "./PageLoadData";
   import AppMainTree from "./AppMainTree.svelte";
   import { transformData } from "./$page-logic";

   export let data: PageLoadData;
   const tData: PageData = transformData(data);
</script>

{#if $isMobile}
   <AppMainTree {tData} />
{/if}
