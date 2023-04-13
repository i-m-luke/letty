<script lang="ts">
	import PromptInfo from '$lib/PromptInfo';
	import Tree from '$lib/components/Tree.svelte';
	import TreeNode from '$lib/components/TreeNode.svelte';
	import type TreeNodeInfo from '$lib/components/TreeNodeInfo';
	import type PageLoadData from './PageLoadData';
	import { transformPrompmtInfoToNodeInfo, postSavedPrompt } from './script';

	export let data: PageLoadData;
	const nodeInfoCollection: TreeNodeInfo[] = transformPrompmtInfoToNodeInfo(
		data.promptInfoCollection
	);

	let inputPrompt: string = 'test prompt';
	let selectedNodeId: number = 0;
</script>

<main>
	<div class="upper-container">
		<a href="app/settings">SETTINGS</a>
	</div>

	<div class="main-container">
		<div class="left-container">
			<span>PROMPT TREE:</span>
			<Tree bind:value={selectedNodeId} {nodeInfoCollection} />
		</div>
		<div class="right-container">
			<input bind:value={inputPrompt} />
			<button on:click={() => postSavedPrompt(new PromptInfo(101, 11, inputPrompt, 'text...', []))}>
				SAVE PROMPT
			</button>
			<span>SELECTED NODE ID: {selectedNodeId}</span>
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
