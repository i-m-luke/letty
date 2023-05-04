<script lang="ts">
   import { goto } from "$app/navigation";
   import Tree from "$lib/components/Tree";
   import AdditionalButtonInfo from "$lib/components/AdditionalButtonInfo";
   import { fetchPromptPOST, fetchPromptDELETE } from "./$page-logic";
   import { fetchThreadPOST, fetchThreadDELETE } from "./$page-logic";
   import type LayoutData from "./LayoutData";

   export let tData: LayoutData;
   let { promptTreeNodeInfoCollection, threadTreeNodeInfoCollection } = tData;

   const threadTreeNodeAdditionalButtons = [
      new AdditionalButtonInfo("ADD", fetchThreadPOST),
      new AdditionalButtonInfo("REMOVE", fetchThreadDELETE),
   ];
   const promptTreeNodeAdditionalButtons = [
      new AdditionalButtonInfo("ADD", fetchPromptPOST),
      new AdditionalButtonInfo("REMOVE", fetchPromptDELETE),
   ];
</script>

<span>TREE:</span>

{#if threadTreeNodeInfoCollection.length > 0}
   <span>THREADING:</span>
   <Tree
      nodeOnClickAction={(nodeInfo) => goto(`/app/thread${nodeInfo.id}`)}
      nodeInfoCollection={threadTreeNodeInfoCollection}
      additionalButtons={threadTreeNodeAdditionalButtons}
   />
{/if}

{#if promptTreeNodeInfoCollection.length > 0}
   <span>PROMPTING:</span>
   <Tree
      nodeOnClickAction={(nodeInfo) => goto(`/app/prompt${nodeInfo.id}`)}
      nodeInfoCollection={promptTreeNodeInfoCollection}
      additionalButtons={promptTreeNodeAdditionalButtons}
   />
{/if}
