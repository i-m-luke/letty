<!-- MOVE TO COMPONENTS ??? -->

<script lang="ts">
	import { goto } from '$app/navigation';
	import { activeTreeMode } from '$lib/store';
	import Tree from '$lib/components/Tree.svelte';
	import { TreeMode } from '$lib/enums';
	import type LayoutData from './LayoutData';

	export let tData: LayoutData;
	let selectedNodeId: number;

	$: nodeInfoCollection =
		$activeTreeMode === TreeMode.Prompt
			? tData.promptTreeNodeInfoCollection
			: tData.threadTreeNodeInfoCollection;
	$: url = $activeTreeMode === TreeMode.Prompt ? '/app/main/prompt-' : '/app/main/thread-';
</script>

<span>{$activeTreeMode} TREE:</span>

<!-- Nepoužít nodeOnClickAction event.target? -->

<Tree nodeOnClickAction={() => goto(`${url}${selectedNodeId}`)} {nodeInfoCollection} bind:selectedNodeId />
