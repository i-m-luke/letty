<script lang="ts">
   import { fade } from "svelte/transition";
   import { TreeNodeType, type TreeNodeInfo, type TreeNodeInfoData } from "./";
   import type ButtonInfo from "$lib/components/ButtonInfo";
   import styles from "$styles";

   export let nodeInfo: TreeNodeInfo;
   export let nodeOnClickAction: ((nodeData: TreeNodeInfoData) => void) | (() => void) = () => {};
   export let contentNodeAdditionalButtons: ButtonInfo<TreeNodeInfoData>[] = [];
   export let folderNodeAdditionalButtons: ButtonInfo<TreeNodeInfoData>[] = [];

   let isFolder: boolean = nodeInfo.type === TreeNodeType.Folder;
   let isOpen: boolean = false;
   $: data = nodeInfo.data;
   $: nodeStateInText = !isFolder ? "" : isOpen ? "(opened)" : "(closed)";

   const additionalButtons: ButtonInfo<TreeNodeInfoData>[] = isFolder
      ? folderNodeAdditionalButtons
      : contentNodeAdditionalButtons;

   const toggleIsOpen: () => void = () => (isOpen = !isOpen);
   const nodeOnClickEvent = isFolder
      ? toggleIsOpen
      : (): void => {
           nodeOnClickAction(data);
        };
</script>

<div class="node-container">
   <div class="flex flex-row justify-start space-x-2">
      {#if !nodeInfo.isRoot}
         <div class="connection-container">
            <div class="connection" />
         </div>
      {/if}

      <span on:click={nodeOnClickEvent} on:keypress={nodeOnClickEvent}> {`${nodeInfo.text} ${nodeStateInText}`}</span>

      {#each additionalButtons as { text, style, onClickAction, formActionName }}
         <button
            class={styles.build(style ? style : "", "text-transparent bg-clip-text bg-cyan-800")}
            type="button"
            formaction={formActionName}
            on:click={() => onClickAction(data)}
         >
            {#if text}{text}{/if}
         </button>
      {/each}
   </div>

   {#if isOpen}
      <div class="child-nodes" in:fade={{ duration: 1000 }}>
         {#each nodeInfo.childNodes as childNode}
            <!-- TODO - Animace: Položky stromu se budou postupně zobrazovat  -->
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
