<script lang="ts">
	import TreeNodeComponent from '../../components/TreeNodeComponent.svelte';
	import { TreeNodeInfo } from '../../components/TreeNodeInfo';
	import type AppLoadDataType from './AppLoadDataType';

	export let data: AppLoadDataType;
	const promptInfoCollection = data.promptInfoCollection;

	const nodeInfoCollection: TreeNodeInfo[] = promptInfoCollection.map(
		(promptInfo) => new TreeNodeInfo(false, promptInfo.id, promptInfo.name, [])
	);

	let inputPrompt: string = 'no value';
</script>

<div class="left-container">
	{#each nodeInfoCollection as nodeInfo}
		<TreeNodeComponent {nodeInfo} />
	{/each}
</div>

<div class="right-container">
	<input bind:value={inputPrompt} />
	<button>SAVE PROMPT</button>
</div>
