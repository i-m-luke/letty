<script lang="ts">
	import type LayoutLoadData from './LayoutLoadData';
	import type LayoutData from './LayoutData';
	import Tree from '$lib/components/Tree.svelte';
	import { transformData } from './$layout-logic';
	import { goto } from '$app/navigation';
	import { isMobile } from '$lib/store';

	export let data: LayoutLoadData;
	const tData: LayoutData = transformData(data);

	const nodeOnClickAction = (id: number) => goto(`/app/main/prompt-${id}`);
</script>

<main>
	<div class="upper-container">
		<a href="/app/settings">SETTINGS</a>
	</div>

	<div class="main-container">
		{#if $isMobile}
			<!-- ZOBRAZIT LIŠTU S TLAČÍTKEM TREE (aby bylo možno se dostat zpět na strom)  -->
		{/if}

		{#if !$isMobile}
			<div class="left-container">
				<span>PROMPT TREE:</span>
				<Tree {nodeOnClickAction} nodeInfoCollection={tData.treeNodeInfoCollection} />
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
