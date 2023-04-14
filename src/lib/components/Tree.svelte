<script lang="ts">
	import type TreeNodeInfo from './TreeNodeInfo';
	import TreeNode from './TreeNode.svelte';

	export let nodeInfoCollection: TreeNodeInfo[];
	export let nodeOnClickAction = (id: number) => {};
</script>

{#each nodeInfoCollection as nodeInfo}
	<TreeNode {nodeOnClickAction} {nodeInfo} />
{/each}
