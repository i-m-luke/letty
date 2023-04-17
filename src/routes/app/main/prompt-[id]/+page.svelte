<script lang="ts">
	import { page } from '$app/stores';
	import { postSavedPrompt } from './$page-logic';

	let inputPromptName: string = 'test prompt';
	let inputPrompt: string = 'test prompt';

	const selectedNodeId = Number($page.params.id);
</script>

<main>
	<span>PROMPT NAME:</span>
	<input bind:value={inputPromptName} />
	<span>PROMPT:</span>
	<input bind:value={inputPrompt} />

	<button on:click={() => postSavedPrompt(selectedNodeId, inputPromptName, inputPrompt)}>
		SAVE PROMPT
	</button>

	<span>SELECTED NODE ID: {selectedNodeId}</span>
	<button>CLONE</button>
	<!-- Slouží pro naklonování aktuálně navoleného uzlu -->
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}
</style>
