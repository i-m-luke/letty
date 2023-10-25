<script lang="ts">
   import { TreeNode, type TreeNodeInfo, type TreeNodeInfoData } from "./";
   import type ButtonInfo from "$lib/components/ButtonInfo";

   export let nodeInfoCollection: TreeNodeInfo[];
   export let nodeOnClickAction = (nodeData: TreeNodeInfoData) => {};
   export let additionalButtons: ButtonInfo<TreeNodeInfoData>[] = [];
</script>

{#each nodeInfoCollection as nodeInfo}
   <TreeNode {nodeOnClickAction} {nodeInfo} {additionalButtons} />
{/each}
