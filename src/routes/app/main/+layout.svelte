<script lang="ts">
	import type TreeNodeInfo from '$lib/components/TreeNodeInfo';
	import type LayoutLoadData from './LayoutLoadData';
	import Tree from '$lib/components/Tree.svelte';
	import { transformPrompmtInfoToNodeInfo } from './script';
	import { goto } from '$app/navigation';

	export let data: LayoutLoadData;

	const nodeInfoCollection: TreeNodeInfo[] = transformPrompmtInfoToNodeInfo(data.promptInfoCollection);
	let selectedNodeId: number = nodeInfoCollection[0].objectId;

	// const anotherTransformedStuff: TreeNodeInfo[] = transformPrompmtInfoToNodeInfo(data.promptInfoCollection);
	// let transformedStuffId: number = anotherTransformedStuff[0].objectId;

	const nodeOnClickAction = (id: number) => goto(`/app/main/show-prompt-${id}`);

	const isMobile: boolean = false; // TODO: Vyřešit nějak skrze build-in feature (asi někden a $app/environment)
</script>

<main>
	<div class="upper-container">
		<a href="/app/settings">SETTINGS</a>
	</div>

	<div class="main-container">
		{#if isMobile}
			<!-- ZOBRAZIT LIŠTU S TLAČÍTKEM TREE (aby bylo možno se dostat zpět na strom)  -->
		{/if}

		{#if !isMobile}
			<div class="left-container">
				<span>PROMPT TREE:</span>
				<Tree {nodeOnClickAction} {nodeInfoCollection} />
			</div>
		{/if}

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
