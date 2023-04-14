<script lang="ts">
	import type TreeNodeInfo from './TreeNodeInfo';

	export let nodeInfo: TreeNodeInfo;
	export let value: number;

	let isOpen = false;
	const isLeafNode = nodeInfo.children.length < 1;
	$: nodeState = isLeafNode ? '(leaf node)' : isOpen ? '(opened)' : '(closed)';

	const toggleIsOpen: () => void = () => (isOpen = !isOpen);
	const nodeOnClickEvent: () => void = () => {
		toggleIsOpen();
		value = nodeInfo.objectId;
	};
</script>

<div class="node-container">
	<div class="parent-node">
		{#if !nodeInfo.isRootNode}
			<div class="connection-container">
				<div class="connection" />
			</div>
		{/if}
		<span on:click={nodeOnClickEvent} on:keypress={nodeOnClickEvent}>
			{`${nodeInfo.text} ${nodeState}`}
		</span>
	</div>
	{#if isOpen}
		<div class="child-nodes">
			{#each nodeInfo.children as childNode}
				<svelte:self bind:value nodeInfo={childNode} />
			{/each}
		</div>
	{/if}
</div>

<style>
	span {
		transition: 0.5s linear;
	}

	span:hover {
		color: yellow;
		cursor: pointer;
	}

	.node-container,
	.child-nodes {
		display: flex;
		flex-direction: column;
	}

	.child-nodes {
		margin-left: 24px;
	}

	.parent-node {
		display: flex;
		flex-direction: row;
	}

	.connection-container {
		width: 2%;
	}

	.connection {
		position: relative;
		right: 0px;
		width: 50%;
		height: 50%;
		border: 1px solid black;
		border-width: 0px 0px 1px 1px;
	}
</style>
