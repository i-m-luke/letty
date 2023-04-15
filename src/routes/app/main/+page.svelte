<!-- EMPTY PAGE FOR RENDERING PURPOSE -->

<script lang="ts">
	import type PageData from './PageData';
	import type PageLoadData from './PageLoadData';
	import { goto } from '$app/navigation';
	import { isMobile } from '$lib/store';
	import { transformData } from './$page-logic';
	import PromptTree from './PromptTree.svelte';

	export let data: PageLoadData;
	const tData: PageData = transformData(data);

	const nodeOnClickAction = (id: number) => goto(`/app/main/prompt-${id}`);
</script>

{#if $isMobile}
	<PromptTree nodeInfoCollection={tData.treeNodeInfoCollection} />
{/if}
