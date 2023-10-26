<script lang="ts">
   import type { TreeNodeInfo, TreeNodeInfoData } from "./";
   import type ButtonInfo from "$lib/components/ButtonInfo";

   export let nodeInfo: TreeNodeInfo;
   export let nodeOnClickAction: ((nodeData: TreeNodeInfoData) => void) | (() => void) = () => {};
   export let contentNodeAdditionalButtons: ButtonInfo<TreeNodeInfoData>[] = [];
   export let folderNodeAdditionalButtons: ButtonInfo<TreeNodeInfoData>[] = [];

   let isOpen: boolean = false;
   let data: TreeNodeInfoData = nodeInfo.data;
   let childNodes: TreeNodeInfo[] = nodeInfo.childNodes;

   $: nodeState = nodeInfo.isFolder && isOpen ? "(opened)" : "(closed)";

   const additionalButtons: ButtonInfo<TreeNodeInfoData>[] = nodeInfo.isFolder
      ? folderNodeAdditionalButtons
      : contentNodeAdditionalButtons;

   const toggleIsOpen: () => void = () => (isOpen = !isOpen);
   const nodeOnClickEvent = nodeInfo.isFolder
      ? toggleIsOpen
      : (): void => {
           nodeOnClickAction(data);
        };
</script>

<div class="node-container">
   <div class="parent-node">
      {#if !nodeInfo.isRoot}
         <div class="connection-container">
            <div class="connection" />
         </div>
      {/if}

      <span on:click={nodeOnClickEvent} on:keypress={nodeOnClickEvent}> {`${nodeInfo.text} ${nodeState}`}</span>

      {#each additionalButtons as { text, onClickAction, formActionName }}
         <button type="button" formaction={formActionName} on:click={() => onClickAction(data)}>
            {text}
         </button>
      {/each}
   </div>

   {#if isOpen}
      <div class="child-nodes">
         {#each childNodes as childNode}
            <svelte:self {nodeOnClickAction} nodeInfo={childNode} {contentNodeAdditionalButtons} {folderNodeAdditionalButtons} />
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
