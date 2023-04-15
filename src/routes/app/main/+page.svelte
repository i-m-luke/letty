<!-- EMPTY PAGE FOR RENDERING PURPOSE -->

<script lang="ts">
	import { goto } from '$app/navigation';
	import Tree from '$lib/components/Tree.svelte';
	import { transformData } from './$page-logic';
	import type PageData from './PageData';
	import type PageLoadData from './PageLoadData';

	import { isMobile } from '$lib/store';

	export let data: PageLoadData;
	const tData: PageData = transformData(data);

	const nodeOnClickAction = (id: number) => goto(`/app/main/prompt-${id}`);
</script>

{#if $isMobile}
	<!-- 
        TŘEBA VYJMOUT DO VLASTNÍ KOMPONENT
        TREE VALUE BINDING SE BUDE ŘEŠIT PRAVDĚPODOBNĚ SKRZE STORE
    -->
	<span>PROMPT TREE:</span>
	<Tree {nodeOnClickAction} nodeInfoCollection={tData.treeNodeInfoCollection} />
{/if}
