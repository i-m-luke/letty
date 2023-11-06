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
   import CreatePromptDialog from "./CreatePromptDialog.svelte";
   import CreateThreadDialog from "./CreateThreadDialog.svelte";
   import CreateDialogData from "./CreateDialogData";

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
            const { confirmed, canceled } = createThreadDialogProxy.showModalAndWaitTillClosed();
            confirmed.then(() => {
               const { name, type } = createThreadDialogData;
               fetchAndUpdateTreeFn(data, get(name), get(type), threadTreeState, fetchPostThread);
            });
            canceled.then(() => console.log("dialog canceled"));
         },
      }),
      new ButtonInfo("REMOVE", {
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: REMOVE THREAD FOLDER"); // TODO
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
            fetchDeleteThread(data); // TODO
         },
      }),
   ];

   //#endregion

   //#region prompt buttons

   const promptFolderNodeAdditionalButtons = [
      new ButtonInfo("ADD", {
         onClickAction: (data: TreeNodeInfoData) => {
            const { confirmed, canceled } = createPromptDialogProxy.showModalAndWaitTillClosed();
            confirmed.then(() => {
               const { name, type } = createPromptDialogData;
               fetchAndUpdateTreeFn(data, get(name), get(type), promptTreeState, fetchPostPrompt);
            });
            canceled.then(() => console.log("dialog canceled"));
         },
      }),
      new ButtonInfo("REMOVE", {
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: REMOVE PROMPT FOLDER"); // TODO
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
