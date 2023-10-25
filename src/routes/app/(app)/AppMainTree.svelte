<script lang="ts">
   import type { PromptData, ThreadData } from "$types";
   import type { Writable } from "svelte/store";
   import { goto } from "$app/navigation";
   import Tree, { TreeNodeInfo, type TreeNodeInfoData } from "$lib/components/Tree";
   import ButtonInfo from "$lib/components/ButtonInfo";
   import { fetchPostThread, fetchPostPrompt, fetchDeleteThread, fetchDeletePrompt } from "./$page-logic";

   export let threadTreeState: Writable<TreeNodeInfo[]>;
   export let promptTreeState: Writable<TreeNodeInfo[]>;

   const addNodeToNode = (targetNodeId: string, node: TreeNodeInfo, nodeToAdd: TreeNodeInfo): TreeNodeInfo => {
      return node.data._id === targetNodeId
         ? { ...node, childNodes: [...node.childNodes, nodeToAdd] }
         : { ...node, childNodes: node.childNodes.map((node) => addNodeToNode(targetNodeId, node, nodeToAdd)) };
   };

   //#region thread

   const threadFolderNodeAdditionalButtons = [
      new ButtonInfo("ADD", {
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: ADD THREAD"); // TODO
            const tempNewTreeNodeInfo = new TreeNodeInfo(false, "NEW NODE", { _id: "NO ID" });
            const newThreadTreeNodes = $threadTreeState.map((node) => addNodeToNode(data._id, node, tempNewTreeNodeInfo));
            threadTreeState.set(newThreadTreeNodes); // TODO: Vyřešit, aby se přerendroval strom!!!
         },
      }),
      new ButtonInfo("REMOVE", {
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: REMOVE THREAD FOLDER"); // TODO
         },
      }),
   ];

   const threadContentNodeAdditionalButtons = [
      new ButtonInfo("REMOVE", {
         onClickAction: (data: TreeNodeInfoData) => {
            fetchDeleteThread(data); // TODO
         },
      }),
   ];

   //#endregion

   //#region prompt

   const promptFolderNodeAdditionalButtons = [
      new ButtonInfo("ADD", {
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: ADD PROMPT"); // TODO
         },
      }),
      new ButtonInfo("REMOVE", {
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: REMOVE PROMPT FOLDER"); // TODO
         },
      }),
   ];

   const promptContentNodeAdditionalButtons = [
      new ButtonInfo("REMOVE", {
         onClickAction: (data: TreeNodeInfoData) => {
            fetchDeletePrompt(data); // TODO
         },
      }),
   ];

   //#endregion
</script>

{#if $threadTreeState.length > 0}
   <span>THREADING:</span>
   <Tree
      nodeOnClickAction={(nodeData) => goto(`/app/thread${nodeData._id}`)}
      nodeInfoCollection={$threadTreeState}
      contentNodeAdditionalButtons={threadContentNodeAdditionalButtons}
      folderNodeAdditionalButtons={threadFolderNodeAdditionalButtons}
   />
{/if}

{#if $promptTreeState.length > 0}
   <span>PROMPTING:</span>
   <Tree
      nodeOnClickAction={(nodeData) => goto(`/app/prompt${nodeData._id}`)}
      nodeInfoCollection={$promptTreeState}
      contentNodeAdditionalButtons={promptContentNodeAdditionalButtons}
      folderNodeAdditionalButtons={promptFolderNodeAdditionalButtons}
   />
{/if}
