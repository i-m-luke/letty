<script lang="ts">
   import type LayoutData from "./LayoutData";
   import { goto } from "$app/navigation";
   import Tree from "$lib/components/Tree";
   import ButtonInfo from "$lib/components/ButtonInfo";
   import { fetchPromptPOST, fetchPromptDELETE } from "./$page-logic";
   import { fetchThreadPOST, fetchThreadDELETE } from "./$page-logic";

   export let tData: LayoutData;
   let { promptTreeNodeInfoCollection, threadTreeNodeInfoCollection } = tData;

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

{#if threadTreeNodeInfoCollection.length > 0}
   <span>THREADING:</span>
   <Tree
      nodeOnClickAction={(nodeData) => goto(`/app/thread${nodeData.id}`)}
      nodeInfoCollection={threadTreeNodeInfoCollection}
      additionalButtons={threadTreeNodeAdditionalButtons}
   />
{/if}

{#if promptTreeNodeInfoCollection.length > 0}
   <span>PROMPTING:</span>
   <Tree
      nodeOnClickAction={(nodeData) => goto(`/app/prompt${nodeData.id}`)}
      nodeInfoCollection={promptTreeNodeInfoCollection}
      additionalButtons={promptTreeNodeAdditionalButtons}
   />
{/if}
