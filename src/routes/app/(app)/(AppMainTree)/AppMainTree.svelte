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
      fetchAndUpdateTreeFn,
      removeNodeFromMultipleNodes,
   } from "./$logic";
   import { DialogProxy } from "$lib/components/Dialog";
   import CreateDialogData from "./CreateDialogData";
   import CreateDialog from "./CreateDialog.svelte";

   let createThreadDialogProxy = new DialogProxy();
   let createThreadDialogData = new CreateDialogData();

   let createPromptDialogProxy = new DialogProxy();
   let createPromptDialogData = new CreateDialogData();

   export let threadTreeState: Writable<TreeNodeInfo[]>;
   export let promptTreeState: Writable<TreeNodeInfo[]>;

   //#region thread buttons

   const threadFolderNodeAdditionalButtons = [
      new ButtonInfo("ADD", {
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: ADD THREAD FOLDER/CONTENT"); // TODO CONNECT TO DB
            const { confirmed, canceled } = createThreadDialogProxy.showModalAndWaitTillClosed();
            confirmed.then(() => {
               const { name, type } = createThreadDialogData;
               // NOTE:
               // U fetch requestu se bude muset specifikovat, že se jedná o folder
               // V DB se bude muset vytvořit DBNodeItem
               fetchAndUpdateTreeFn(data, get(name), get(type), threadTreeState, fetchPostThread);
            });
            canceled.then(() => console.log("dialog canceled"));
         },
      }),
      new ButtonInfo("REMOVE", {
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: REMOVE THREAD FOLDER/CONTENT"); // TODO CONNECT TO DB
            // NOTE: U fetch requestu se bude muset specifikovat, že se jedná o folder
            fetchDeleteThread(data)
               .then(() => {
                  threadTreeState.update((current) => removeNodeFromMultipleNodes(data._id, current));
               })
               .catch((err) => console.log(err));
         },
      }),
   ];

   const threadContentNodeAdditionalButtons = [
      new ButtonInfo("REMOVE", {
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: REMOVE THREAD CONTENT"); // TODO CONNECT TO DB
            fetchDeletePrompt(data)
               .then(() => {
                  promptTreeState.update((current) => removeNodeFromMultipleNodes(data._id, current));
               })
               .catch((err) => console.log(err));
         },
      }),
   ];

   //#endregion

   //#region prompt buttons

   const promptFolderNodeAdditionalButtons = [
      new ButtonInfo("ADD", {
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: ADD PROMPT FOLDER/CONTENT"); // TODO CONNECT TO DB
            const { confirmed, canceled } = createPromptDialogProxy.showModalAndWaitTillClosed();
            confirmed.then(() => {
               const { name, type } = createPromptDialogData;
               // NOTE: U fetch requestu se bude muset specifikovat, že se jedná o folder
               fetchAndUpdateTreeFn(data, get(name), get(type), promptTreeState, fetchPostPrompt);
            });
            canceled.then(() => console.log("dialog canceled"));
         },
      }),
      new ButtonInfo("REMOVE", {
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: REMOVE PROMPT FOLDER/CONTENT"); // TODO CONNECT TO DB
            // NOTE: U fetch requestu se bude muset specifikovat, že se jedná o folder
            fetchDeletePrompt(data)
               .then(() => {
                  promptTreeState.update((current) => removeNodeFromMultipleNodes(data._id, current));
               })
               .catch((err) => console.log(err));
         },
      }),
   ];

   const promptContentNodeAdditionalButtons = [
      new ButtonInfo("REMOVE", {
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: REMOVE PROMPT CONTENT"); // TODO CONNECT TO DB
            fetchDeletePrompt(data)
               .then(() => {
                  promptTreeState.update((current) => removeNodeFromMultipleNodes(data._id, current));
               })
               .catch((err) => console.log(err));
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

<CreateDialog dialogProxy={createThreadDialogProxy} data={createThreadDialogData} />
<CreateDialog dialogProxy={createPromptDialogProxy} data={createPromptDialogData} />
