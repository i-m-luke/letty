<!-- EMPTY PAGE FOR RENDERING PURPOSE -->

<script lang="ts">
	import type PageData from './PageData';
	import type PageLoadData from './PageLoadData';
	import MainTree from './MainTree.svelte';
	import { isMobile } from '../../../lib/store';
	import { transformData } from './$page-logic';

	export let data: PageLoadData;
	const tData: PageData = transformData(data);
</script>

{#if $isMobile}
	<MainTree {tData} />
{/if}
