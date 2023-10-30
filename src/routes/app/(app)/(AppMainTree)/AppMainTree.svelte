<script lang="ts">
   import routes from "$routes";
   import type { Writable } from "svelte/store";
   import { goto } from "$app/navigation";
   import Tree, { TreeNodeInfo, type TreeNodeInfoData } from "$lib/components/Tree";
   import ButtonInfo from "$lib/components/ButtonInfo";
   import { fetchPostThread, fetchPostPrompt, fetchDeleteThread, fetchDeletePrompt, removeNodeFromSingleNode } from "./$logic";
   import { addNodeToMultipleNodes } from "./$logic";

   import Dialog from "$lib/components/Dialog.svelte";
   import { TextInput, TextInputType } from "$lib/components/TextInput";

   let createPromptDialog: HTMLDialogElement;

   export let threadTreeState: Writable<TreeNodeInfo[]>;
   export let promptTreeState: Writable<TreeNodeInfo[]>;

   function showDialogAndBlockTillClosed(dialog: HTMLDialogElement) {
      dialog.showModal();
      return new Promise((resolve) => {
         dialog.addEventListener("close", resolve, { once: true });
      });
   }

   //#region thread buttons

   const threadFolderNodeAdditionalButtons = [
      new ButtonInfo("ADD", {
         onClickAction: (data: TreeNodeInfoData) => {
            showDialogAndBlockTillClosed(createPromptDialog).then(() => {
               // TODO: Provést fetch až podle toho, zda byl dialog potvrzen OK
               // Promise by mohl vracet ConfirmOption a další data (např. vyplněné hodnoty)
               // Avšak na serveru by se po potvrzení měla provést validace dat ...
               fetchPostPrompt(data)
                  .then((res) => {
                     threadTreeState.update((current) =>
                        current.map((node) =>
                           addNodeToMultipleNodes(data._id, node, new TreeNodeInfo(false, res.name, { _id: res._id }))
                        )
                     );
                  })
                  .catch((err) => console.log(err));
            });
         },
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

<button on:click={() => createPromptDialog.showModal()}>SHOW DIALOG</button>
<Dialog bind:dialog={createPromptDialog} on:close={() => {}}>
   <TextInput type={TextInputType.Text} value="" label="NAME:" />
   <button
      on:click={() => {
         // ... provede se fetch (form actions nepůjde použít)
         createPromptDialog.close();
      }}
      >OK
   </button>

   <style>
      form {
         display: flex;
         flex-direction: column;
      }
   </style>
</Dialog>
