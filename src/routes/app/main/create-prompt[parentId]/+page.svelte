<script lang="ts">
	import { postSavedPrompt } from '../../script';
	import { selectedNodeId } from '$lib/store'; // ASI BY BYLO LEPŠÍ ŘEŠIT PŘES ROUTE PARAMETR

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

	<span>SELECTED NODE ID: {selectedNodeId}</span>
</main>
