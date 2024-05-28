<script lang="ts">
   import { fade, slide } from "svelte/transition";
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

<div class="flex flex-col" transition:slide>
   <div class="flex flex-row space-x-2">
      <div class="grid place-items-center pb-[0.1rem]">
         {#if type === TreeNodeType.Folder || type === TreeNodeType.Root}
            <span class={styles.build(folderClassName)} />
         {:else}
            <span class="fa-solid fa-angles-right" />
         {/if}
      </div>

      <span class="hover:cursor-pointer hover:text-slate-500" on:click={nodeOnClickEvent} on:keypress={nodeOnClickEvent}
         >{nodeInfo.text}</span
      >

      {#each buttons as { text, className, style, onClickAction, formActionName }}
         <!-- TODO: Udělat komponentu IconButton? -->
         <button
            class={styles.build(className ?? "", styles.class.iconButton)}
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
      <div class="ml-5">
         {#each nodeInfo.childNodes as childNode, index}
            <!-- Animace způsobuje, že se nové přiadný uzel zobrazuje se zpožděním -->
            <!-- <div in:fade={{ delay: getDelay(index), duration: 250 }}> -->
            <svelte:self {nodeOnClickAction} nodeInfo={childNode} {contentNodeButtons} {folderNodeButtons} {rootNodeButtons} />
            <!-- </div> -->
         {/each}
      </div>
   {/if}
</div>
