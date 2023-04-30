<script lang="ts">
	import { isMobile } from '$lib/global-state';
	import type PageData from './PageData';
	import type PageLoadData from './PageLoadData';
	import MainTree from './MainTree.svelte';
	import { transformData } from './$page-logic';

	export let data: PageLoadData;
	const tData: PageData = transformData(data);
</script>

{#if $isMobile}
	<MainTree {tData} />
{/if}
