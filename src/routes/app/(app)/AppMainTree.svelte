<script lang="ts">
   import type { PromptData, ThreadData } from "$types";
   import type { Writable } from "svelte/store";
   import { goto } from "$app/navigation";
   import Tree, { TreeNodeInfo, type TreeNodeInfoData } from "$lib/components/Tree";
   import ButtonInfo from "$lib/components/ButtonInfo";
   import { fetchPostThread, fetchPostPrompt, fetchDeleteThread, fetchDeletePrompt } from "./$page-logic";

   export let threadTreeState: Writable<TreeNodeInfo[]>;
   export let promptTreeState: Writable<TreeNodeInfo[]>;

   const threadTreeNodeAdditionalButtons = [
      // NOTE: Aby bylo možné vytvořit thread/prompt, je nutné znát ID folder!
      new ButtonInfo("ADD", {
         onClickAction: (data: TreeNodeInfoData) => {
            fetchPostThread(data);
         },
      }),
      new ButtonInfo("REMOVE", {
         onClickAction: (data: TreeNodeInfoData) => {
            fetchDeleteThread(data);
         },
      }),
   ];

   const promptTreeNodeAdditionalButtons = [
      // NOTE: Aby bylo možné vytvořit thread/prompt, je nutné znát ID folder!
      new ButtonInfo("ADD", {
         onClickAction: (data: TreeNodeInfoData) => {
            fetchPostPrompt(data);
         },
      }),
      new ButtonInfo("REMOVE", {
         onClickAction: (data: TreeNodeInfoData) => {
            fetchDeletePrompt(data);
         },
      }),
   ];
</script>

{#if $threadTreeState.length > 0}
   <span>THREADING:</span>
   <Tree
      nodeOnClickAction={(nodeData) => goto(`/app/thread${nodeData._id}`)}
      nodeInfoCollection={$threadTreeState}
      additionalButtons={threadTreeNodeAdditionalButtons}
   />
{/if}

{#if $promptTreeState.length > 0}
   <span>PROMPTING:</span>
   <Tree
      nodeOnClickAction={(nodeData) => goto(`/app/prompt${nodeData._id}`)}
      nodeInfoCollection={$promptTreeState}
      additionalButtons={promptTreeNodeAdditionalButtons}
   />
{/if}
