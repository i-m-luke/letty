<script lang="ts">
	import type TreeNodeInfo from '$lib/components/TreeNodeInfo';
	import Tree from '$lib/components/Tree.svelte';
	import { goto } from '$app/navigation';

	export let nodeInfoCollection: TreeNodeInfo[];
	let selectedNodeId: number;
</script>

<span>PROMPT TREE:</span>
<Tree
	nodeOnClickAction={() => goto(`/app/main/prompt-${selectedNodeId}`)}
	{nodeInfoCollection}
	bind:selectedNodeId
/>
