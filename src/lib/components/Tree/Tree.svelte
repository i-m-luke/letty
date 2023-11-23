<script lang="ts">
   import { TreeNode, type TreeNodeInfo, type TreeNodeInfoData } from "./";
   import type ButtonInfo from "$lib/components/ButtonInfo";
   import type { Writable } from "svelte/store";

   export let nodeInfoCollection: Writable<TreeNodeInfo[]>;
   export let nodeOnClickAction = (nodeData: TreeNodeInfoData) => {};
   export let contentNodeButtons: ButtonInfo<TreeNodeInfoData>[] = [];
   export let folderNodeButtons: ButtonInfo<TreeNodeInfoData>[] = [];
</script>

{#each $nodeInfoCollection as nodeInfo}
   <TreeNode
      {nodeOnClickAction}
      {nodeInfo}
      contentNodeAdditionalButtons={contentNodeButtons}
      folderNodeAdditionalButtons={folderNodeButtons}
   />
{/each}
