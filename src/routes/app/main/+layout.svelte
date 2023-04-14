<script lang="ts">
	import type TreeNodeInfo from '$lib/components/TreeNodeInfo';
	import type LayoutLoadData from './LayoutLoadData';
	import Tree from '$lib/components/Tree.svelte';
	import { transformPrompmtInfoToNodeInfo } from './script';

	export let data: LayoutLoadData;

	const nodeInfoCollection: TreeNodeInfo[] = transformPrompmtInfoToNodeInfo(data.promptInfoCollection);
	let selectedNodeId: number = nodeInfoCollection[0].objectId;

	// const anotherTransformedStuff: TreeNodeInfo[] = transformPrompmtInfoToNodeInfo(data.promptInfoCollection);
	// let transformedStuffId: number = anotherTransformedStuff[0].objectId;
</script>

<main>
	<div class="upper-container">
		<a href="/app/settings">SETTINGS</a>
		<a href={`/app/main/create-prompt-${selectedNodeId}`}>CREATE PROMPT</a>
	</div>

	<div class="main-container">
		<div class="left-container">
			<span>PROMPT TREE:</span>
			<Tree bind:value={selectedNodeId} {nodeInfoCollection} />
		</div>
		<div class="right-container">
			<!-- WORKSPACE SLOT -->
			<slot />
			<!-- WORKSPACE SLOT -->
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.main-container {
		display: flex;
		flex-direction: row;
		height: 100%;
	}

	.left-container {
		flex-grow: 1;
		background-color: aqua;
	}

	.right-container {
		flex-grow: 6;
		background-color: grey;
	}
</style>
