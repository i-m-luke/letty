<!-- EMPTY PAGE FOR RENDERING PURPOSE -->

<script lang="ts">
	import { goto } from '$app/navigation';
	import Tree from '$lib/components/Tree.svelte';

	const nodeOnClickAction = (id: number) => goto(`/app/main/show-prompt-${id}`);

	const isMobile: boolean = true;
</script>

<!-- 
    TŘEBA VYJMOUT DO VLASTNÍ KOMPONENT
    TREE VALUE BINDING SE BUDE ŘEŠIT PRAVDĚPODOBNĚ SKRZE STORE

    {#if isMobile}
        <div class="left-container">
            <span>PROMPT TREE:</span>
            <Tree {nodeOnClickAction} {nodeInfoCollection} />
        </div>
    {/if}
-->
