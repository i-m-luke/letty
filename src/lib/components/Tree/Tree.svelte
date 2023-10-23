<script lang="ts">
   import { TreeNode, type TreeNodeInfo } from "./";
   import type ButtonInfo from "$lib/components/ButtonInfo";

   type TNodeData = $$Generic;

   export let nodeInfoCollection: TreeNodeInfo<TNodeData>[];
   export let nodeOnClickAction = (nodeData: TNodeData) => {};
   export let additionalButtons: ButtonInfo<TNodeData>[] = [];
</script>

{#each nodeInfoCollection as nodeInfo}
   <TreeNode {nodeOnClickAction} {nodeInfo} {additionalButtons} />
{/each}
