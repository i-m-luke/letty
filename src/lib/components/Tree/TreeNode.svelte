<script lang="ts">
   import type { TreeNodeInfo } from "./";
   import type ButtonInfo from "$lib/components/ButtonInfo";

   type TNodeData = $$Generic;

   export let nodeInfo: TreeNodeInfo<TNodeData>;
   export let nodeOnClickAction: ((nodeData: TNodeData) => void) | (() => void) = () => {};
   export let additionalButtons: ButtonInfo<TNodeData>[] = [];

   let isOpen: boolean = false;
   let data: TNodeData = nodeInfo.data as TNodeData;

   $: isLeafNode = nodeInfo.childNodes.length < 1;
   $: nodeState = isLeafNode ? "(leaf node)" : isOpen ? "(opened)" : "(closed)";

   const toggleIsOpen: () => void = () => (isOpen = !isOpen);
   const nodeOnClickEvent = (): void => {
      toggleIsOpen();
      nodeOnClickAction(data);
   };
</script>

<div class="node-container">
   <!-- use:enhance způsobuje, že po provedení form akce se odstraní nodeInfo (objekt je prázdný) -->
   <form method="POST">
      <div class="parent-node">
         {#if !nodeInfo.isRoot}
            <div class="connection-container">
               <div class="connection" />
            </div>
         {/if}

         <span on:click={nodeOnClickEvent} on:keypress={nodeOnClickEvent}>
            <span> {`${nodeInfo.text} ${nodeState}`}</span>
            {#if nodeInfo.data != undefined}
               <input hidden={true} name="nodeData" value={JSON.stringify(data)} />
            {/if}
         </span>

         {#each additionalButtons as { text, onClickAction, formActionName }}
            <button
               type={formActionName != undefined ? "submit" : "button"}
               formaction={formActionName}
               on:click={() => onClickAction(data)}
            >
               {text}
            </button>
         {/each}
      </div>
   </form>
   {#if isOpen}
      <div class="child-nodes">
         {#each nodeInfo.childNodes as childNode}
            <svelte:self {nodeOnClickAction} nodeInfo={childNode} {additionalButtons} />
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
