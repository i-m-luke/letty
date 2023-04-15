<script lang="ts">
	import type LayoutLoadData from './LayoutLoadData';
	import type LayoutData from './LayoutData';
	import PromptTree from './PromptTree.svelte';
	import { transformData } from './$layout-logic';
	import { isMobile } from '$lib/store';

	export let data: LayoutLoadData;
	const tData: LayoutData = transformData(data);
</script>

<main>
	<div class="upper-container">
		<a href="/app/settings">SETTINGS</a>
	</div>

	<div class="root-container">
		{#if $isMobile}
			<!-- ZOBRAZIT LIŠTU S TLAČÍTKEM TREE (aby bylo možno se dostat zpět na strom v režimu mobilu)  -->
		{/if}

		{#if !$isMobile}
			<div class="side-container">
				<PromptTree nodeInfoCollection={tData.treeNodeInfoCollection} />
			</div>
		{/if}

		<div class="main-container">
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

	.root-container {
		display: flex;
		flex-direction: row;
		height: 100%;
	}

	.side-container {
		flex-grow: 1;
		background-color: aqua;
	}

	.main-container {
		flex-grow: 6;
		background-color: grey;
	}
</style>
