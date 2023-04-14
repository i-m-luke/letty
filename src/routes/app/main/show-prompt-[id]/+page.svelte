<script lang="ts">
	import { postSavedPrompt } from './script';

	export let data;

	let inputPromptName: string = 'test prompt';
	let inputPrompt: string = 'test prompt';
</script>

<main>
	<span>PROMPT NAME:</span>
	<input bind:value={inputPromptName} />
	<span>PROMPT:</span>
	<input bind:value={inputPrompt} />

	<button on:click={() => postSavedPrompt(data.selectedNodeId, inputPromptName, inputPrompt)}>
		SAVE PROMPT
	</button>

	<span>SELECTED NODE ID: {data.selectedNodeId}</span>
	<button>CLONE</button>
	<!-- Slouží pro naklonování aktuálně navoleného uzlu -->
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}
</style>
