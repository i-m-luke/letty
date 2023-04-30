<script lang="ts">
   import { TreeNode, type TreeNodeInfo } from "./";

   export let selectedNodeId: string = "";
   export let nodeInfoCollection: TreeNodeInfo[];
   export let nodeOnClickAction = () => {};
</script>

{#each nodeInfoCollection as nodeInfo}
   <TreeNode bind:value={selectedNodeId} {nodeOnClickAction} {nodeInfo} />
{/each}
