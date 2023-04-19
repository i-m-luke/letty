<script lang="ts">
	import type TreeNodeInfo from './TreeNodeInfo';
	import TreeNode from './TreeNode.svelte';

	export let selectedNodeId: string = '';
	export let nodeInfoCollection: TreeNodeInfo[];
	export let nodeOnClickAction = () => {};
</script>

{#each nodeInfoCollection as nodeInfo}
	<TreeNode bind:value={selectedNodeId} {nodeOnClickAction} {nodeInfo} />
{/each}
