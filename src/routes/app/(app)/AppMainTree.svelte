<script lang="ts">
   import type { PromptData, ThreadData } from "$types";
   import type { Writable } from "svelte/store";
   import { goto } from "$app/navigation";
   import Tree, { TreeNodeInfo } from "$lib/components/Tree";
   import ButtonInfo from "$lib/components/ButtonInfo";
   import { fetchPostThread, fetchPostPrompt, fetchDeleteThread, fetchDeletePrompt } from "./$page-logic";

   // TODO:
   // Předělat tak, aby node obsahovalo pouze NodeData: { _id: string }
   // Node nemusí mít data jako messages, prompt, atd.
   export let threadTreeState: Writable<TreeNodeInfo<ThreadData>[]>;
   export let promptTreeState: Writable<TreeNodeInfo<PromptData>[]>;

   const threadTreeNodeAdditionalButtons = [
      // NOTE: Aby bylo možné vytvořit thread/prompt, je nutné znát ID folder!
      new ButtonInfo("ADD", {
         onClickAction: (data: ThreadData) => {
            fetchPostThread(data);
         },
      }),
      new ButtonInfo("REMOVE", {
         onClickAction: (data: ThreadData) => {
            fetchDeleteThread(data);
         },
      }),
   ];

   const promptTreeNodeAdditionalButtons = [
      // NOTE: Aby bylo možné vytvořit thread/prompt, je nutné znát ID folder!
      new ButtonInfo("ADD", {
         onClickAction: (data: PromptData) => {
            fetchPostPrompt(data);
         },
      }),
      new ButtonInfo("REMOVE", {
         onClickAction: (data: PromptData) => {
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
