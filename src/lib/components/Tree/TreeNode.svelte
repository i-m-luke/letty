<script lang="ts">
   import type { TreeNodeInfo } from "./";
   import type ButtonInfo from "$lib/components/ButtonInfo";

   type TNodeData = $$Generic;

   export let nodeInfo: TreeNodeInfo<TNodeData>;
   export let nodeOnClickAction: (nodeData: TNodeData) => void = () => {};
   export let additionalButtons: ButtonInfo[] = [];

   let isOpen: boolean = false;

   $: isLeafNode = nodeInfo.childNodes.length < 1;
   $: nodeState = isLeafNode ? "(leaf node)" : isOpen ? "(opened)" : "(closed)";

   const toggleIsOpen: () => void = () => (isOpen = !isOpen);
   const nodeOnClickEvent = (): void => {
      toggleIsOpen();
      nodeOnClickAction(nodeInfo.data as TNodeData);
   };
</script>

<div class="node-container">
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
               <!-- Inputs function as input to the form -->
               {#each Object.entries(nodeInfo.data) as [name, value]}
                  <!-- PROČ SE VYPISUJE POUZE "_id" a ne např. "name"? -->
                  <input hidden={true} {name} {value} />
               {/each}
            {/if}
         </span>

         {#each additionalButtons as { text, onClickAction, formActionName }}
            <button
               type={formActionName != undefined ? "submit" : "button"}
               formaction={formActionName ?? ""}
               on:click={onClickAction ?? function () {}}
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
