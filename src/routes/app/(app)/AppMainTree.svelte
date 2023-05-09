<script lang="ts">
   import { goto } from "$app/navigation";
   import Tree, { TreeNodeInfo } from "$lib/components/Tree";
   import ButtonInfo from "$lib/components/ButtonInfo";
   import type { Writable } from "svelte/store";
   import { fetchPromptPOST, fetchPromptDELETE } from "./$page-logic";
   import { fetchThreadPOST, fetchThreadDELETE } from "./$page-logic";
   import type { PromptData, ThreadData } from "$types";

   export let threadTreeState: Writable<TreeNodeInfo<ThreadData>[]>;
   export let promptTreeState: Writable<TreeNodeInfo<PromptData>[]>;

   const threadTreeNodeAdditionalButtons = [
      new ButtonInfo("ADD", fetchThreadPOST),
      new ButtonInfo("REMOVE", fetchThreadDELETE),
   ];
   const promptTreeNodeAdditionalButtons = [
      new ButtonInfo("ADD", fetchPromptPOST),
      new ButtonInfo("REMOVE", fetchPromptDELETE),
   ];
</script>

<span>TREE:</span>

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
