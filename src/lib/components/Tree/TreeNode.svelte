<script lang="ts">
   import { fade } from "svelte/transition";
   import { TreeNodeType, type TreeNodeInfo, type TreeNodeInfoData } from "./";
   import type ButtonInfo from "$lib/components/ButtonInfo";
   import styles from "$styles";

   export let nodeInfo: TreeNodeInfo;
   export let nodeOnClickAction: ((nodeData: TreeNodeInfoData) => void) | (() => void) = () => {};
   export let contentNodeButtons: ButtonInfo<TreeNodeInfoData>[] = [];
   export let folderNodeButtons: ButtonInfo<TreeNodeInfoData>[] = [];
   export let rootNodeButtons: ButtonInfo<TreeNodeInfoData>[] = [];

   let { type } = nodeInfo;
   let isOpen: boolean = false;
   $: data = nodeInfo.data;
   $: folderClassName = isOpen ? "fa-solid fa-folder-open" : "fa-solid fa-folder";

   const buttons: ButtonInfo<TreeNodeInfoData>[] = (() => {
      switch (type) {
         case TreeNodeType.Folder:
            return folderNodeButtons;
         case TreeNodeType.Content:
            return contentNodeButtons;
         case TreeNodeType.Root:
            return rootNodeButtons;
         default:
            throw new Error("Invalid TreeNodeType");
      }
   })();

   const toggleIsOpen: () => void = () => (isOpen = !isOpen);
   const nodeOnClickEvent =
      type === TreeNodeType.Content
         ? (): void => {
              nodeOnClickAction(data);
           }
         : toggleIsOpen;
</script>

<div class="node-container">
   <div class="flex flex-row justify-start space-x-2">
      {#if type !== TreeNodeType.Root}
         <div class="connection-container">
            <div class="connection" />
         </div>
      {/if}

      {#if type === TreeNodeType.Folder || type === TreeNodeType.Root}
         <span class={folderClassName} />
      {/if}

      <span on:click={nodeOnClickEvent} on:keypress={nodeOnClickEvent} class="underline">{nodeInfo.text}</span>

      {#each buttons as { text, className, style, onClickAction, formActionName }}
         <button
            class={styles.build(className ?? "", "text-transparent bg-clip-text bg-cyan-800")}
            style={style ?? ""}
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
            <svelte:self {nodeOnClickAction} nodeInfo={childNode} {contentNodeButtons} {folderNodeButtons} {rootNodeButtons} />
         {/each}
      </div>
   {/if}
</div>

<style>
   span {
      transition: 0.3s ease-in-out;
   }

   span:hover {
      color: rgb(119, 125, 168);
      cursor: pointer;
   }

   button {
      transition: 0.3s ease-in-out;
   }

   button:hover {
      color: rgb(119, 125, 168);
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
