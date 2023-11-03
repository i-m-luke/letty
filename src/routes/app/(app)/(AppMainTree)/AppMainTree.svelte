<script lang="ts">
   import routes from "$routes";
   import { get, type Writable } from "svelte/store";
   import { goto } from "$app/navigation";
   import { Tree, TreeNodeInfo, type TreeNodeInfoData } from "$lib/components/Tree";
   import ButtonInfo from "$lib/components/ButtonInfo";
   import {
      fetchPostThread,
      fetchPostPrompt,
      fetchDeleteThread,
      fetchDeletePrompt,
      removeNodeFromSingleNode,
      curryNodeOnClickAction as curryFetchAndTreeUpdateFn,
   } from "./$logic";
   import { addNodeToMultipleNodes } from "./$logic";
   import { DialogProxy } from "$lib/components/Dialog";
   import CreatePromptDialog from "./CreatePromptDialog.svelte";
   import CreatePromptDialogData from "./CreatePromptDialogData";
   import CreateThreadDialog from "./CreatePromptDialog.svelte";
   import CreateThreadDialogData from "./CreatePromptDialogData";

   let createThreadDialogProxy = new DialogProxy();
   let createThreadDialogData = new CreateThreadDialogData();

   let createPromptDialogProxy = new DialogProxy();
   let createPromptDialogData = new CreatePromptDialogData();

   export let threadTreeState: Writable<TreeNodeInfo[]>;
   export let promptTreeState: Writable<TreeNodeInfo[]>;

   //#region thread buttons

   const curryThreadFolderNodeAddButtonOnClickActionFn = () => {
      const onClickAction = curryFetchAndTreeUpdateFn(threadTreeState, fetchPostThread);
      return (data: TreeNodeInfoData) => {
         // rnm closed --> canceled
         const { confirmed, closed } = createThreadDialogProxy.showModalAndBlockTillClosed();
         const { name } = createThreadDialogData;
         confirmed.then(() => onClickAction(data, get(name)));
      };
   };

   const threadFolderNodeAdditionalButtons = [
      new ButtonInfo("ADD", {
         onClickAction: curryThreadFolderNodeAddButtonOnClickActionFn(),
      }),
      new ButtonInfo("REMOVE", {
         // NOTE:
         // Aby šlo uzel smazat, bude muset být známo folderNodeId
         // --> TODO: Rozšířit TreeNodeInfoData o folderNodeId
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

   //#region prompt buttons

   const curryPromptFolderNodeAddButtonOnClickActionFn = () => {
      const onClickAction = curryFetchAndTreeUpdateFn(promptTreeState, fetchPostPrompt);
      return (data: TreeNodeInfoData) => {
         const { confirmed, closed } = createPromptDialogProxy.showModalAndBlockTillClosed();
         const { name } = createPromptDialogData;
         confirmed.then(() => onClickAction(data, get(name)));
      };
   };

   const promptFolderNodeAdditionalButtons = [
      new ButtonInfo("ADD", {
         onClickAction: curryPromptFolderNodeAddButtonOnClickActionFn(),
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
      nodeOnClickAction={(nodeData) => goto(`${routes.static.thread}${nodeData._id}`)}
      nodeInfoCollection={threadTreeState}
      contentNodeAdditionalButtons={threadContentNodeAdditionalButtons}
      folderNodeAdditionalButtons={threadFolderNodeAdditionalButtons}
   />
{/if}

{#if $promptTreeState.length > 0}
   <span>PROMPTING:</span>
   <Tree
      nodeOnClickAction={(nodeData) => goto(`${routes.static.prompt}${nodeData._id}`)}
      nodeInfoCollection={promptTreeState}
      contentNodeAdditionalButtons={promptContentNodeAdditionalButtons}
      folderNodeAdditionalButtons={promptFolderNodeAdditionalButtons}
   />
{/if}

<CreateThreadDialog dialogProxy={createThreadDialogProxy} data={createThreadDialogData} />
<CreatePromptDialog dialogProxy={createPromptDialogProxy} data={createPromptDialogData} />
