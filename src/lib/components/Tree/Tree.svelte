<script lang="ts">
   import { TreeNode, type TreeNodeInfo } from "./";
   import type ButtonInfo from "$lib/components/ButtonInfo";

   export let nodeInfoCollection: TreeNodeInfo[];
   export let nodeOnClickAction = (nodeData: any) => {};
   export let additionalButtons: ButtonInfo[] = [];
</script>

{#each nodeInfoCollection as nodeInfo}
   <TreeNode {nodeOnClickAction} {nodeInfo} {additionalButtons} />
{/each}
