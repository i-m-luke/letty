<!-- MOVE TO COMPONENTS ??? -->

<script lang="ts">
   import { goto } from "$app/navigation";
   import { activeTreeMode } from "$lib/global-state";
   import Tree from "$lib/components/Tree";
   import { TreeMode } from "$lib/enums";
   import type LayoutData from "./LayoutData";

   export let tData: LayoutData;
   let selectedNodeId: string;

   // NOTE: Bude zaměněno za store, aby bylo možno provést update při vytvoření nového promptu/threadu
   $: nodeInfoCollection =
      $activeTreeMode === TreeMode.Prompt
         ? tData.promptTreeNodeInfoCollection
         : tData.threadTreeNodeInfoCollection;
   $: onClickActionGotoUrl = $activeTreeMode === TreeMode.Prompt ? "/app/prompt-" : "/app/thread-"; // NOTE: Vytvořit route-paths modul s constantami cest k routes ???
</script>

<span>{$activeTreeMode} TREE:</span>

<!-- Nepoužít nodeOnClickAction event.target? -->

<Tree
   nodeOnClickAction={() => goto(`${onClickActionGotoUrl}${selectedNodeId}`)}
   {nodeInfoCollection}
   bind:selectedNodeId
/>
