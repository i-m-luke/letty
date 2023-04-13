<script lang="ts">
	import type TreeNodeInfo from './TreeNodeInfo';
	import TreeNode from './TreeNode.svelte';

	export let nodeInfoCollection: TreeNodeInfo[];
	export let value: number;
</script>

{#each nodeInfoCollection as nodeInfo}
	<TreeNode bind:value {nodeInfo} />
{/each}
