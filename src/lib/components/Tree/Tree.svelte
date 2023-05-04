<script lang="ts">
   import { TreeNode, type TreeNodeInfo } from "./";
   import type AdditionalButtonInfo from "$lib/components/AdditionalButtonInfo";

   export let nodeInfoCollection: TreeNodeInfo[];
   export let nodeOnClickAction = (nodeInfo: TreeNodeInfo) => {};
   export let additionalButtons: AdditionalButtonInfo[] = [];
</script>

{#each nodeInfoCollection as nodeInfo}
   <TreeNode {nodeOnClickAction} {nodeInfo} {additionalButtons} />
{/each}
