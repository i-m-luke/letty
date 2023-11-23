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
      removeNodeFromMultipleNodes,
      addNodeToMultipleNodes,
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

   const addBtnStyle = "fa-solid fa-circle-plus";
   const removeBtnStyle = "fa-solid fa-circle-minus";

   const threadFolderNodeButtons = [
      // ADD THREAD FOLDER BUTTON
      new ButtonInfo({
         style: addBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: ADD THREAD FOLDER/CONTENT"); // TODO: CONNECT TO DB
            const { confirmed, canceled } = createThreadDialogProxy.showModalAndWaitTillClosed();
            confirmed.then(async () => {
               const { name, type } = createThreadDialogData;
               // NOTE:
               // U fetch requestu se bude muset specifikovat, že se jedná o folder
               // V DB se bude muset vytvořit DBNodeItem
               fetchPostThread({ ...data, name: get(name) })
                  .then((res) => {
                     threadTreeState.update((current) =>
                        addNodeToMultipleNodes(
                           data._id,
                           current,
                           new TreeNodeInfo(false, get(type), get(name), {
                              _id: "TODO",
                              _folderId: data._id,
                           })
                        )
                     );
                  })
                  .catch((err) => console.error("ERROR ON THE SERVER:", err)); // NOTE: Vypisovat error do konzole asi není "production ready"
            });
            canceled.then(() => console.log("dialog canceled"));
         },
      }),

      // REMOVE THREAD FOLDER BUTTON
      new ButtonInfo({
         style: removeBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: REMOVE THREAD FOLDER/CONTENT"); // TODO CONNECT TO DB
            // NOTE: U fetch requestu se bude muset specifikovat, že se jedná o folder
            fetchDeleteThread(data)
               .then((res) => {
                  threadTreeState.update((current) => removeNodeFromMultipleNodes(data._id, current));
               })
               .catch((err) => console.error("ERROR ON THE SERVER:", err));
         },
      }),
   ];

   const threadContentNodeButtons = [
      // REMOVE THREAD BUTTON
      new ButtonInfo({
         style: removeBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: REMOVE THREAD CONTENT"); // TODO CONNECT TO DB
            fetchDeletePrompt(data)
               .then((res) => {
                  threadTreeState.update((current) => removeNodeFromMultipleNodes(data._id, current));
               })
               .catch((err) => console.error("ERROR ON THE SERVER:", err));
         },
      }),
   ];

   //#endregion

   //#region prompt buttons

   const promptFolderNodeButtons = [
      // ADD PROMPT FOLDER BUTTON
      new ButtonInfo({
         style: addBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: ADD PROMPT FOLDER/CONTENT"); // TODO CONNECT TO DB
            const { confirmed, canceled } = createPromptDialogProxy.showModalAndWaitTillClosed();
            confirmed.then(() => {
               const { name, type } = createPromptDialogData;
               // NOTE: U fetch requestu se bude muset specifikovat, že se jedná o folder
               fetchPostPrompt({ ...data, name: get(name) })
                  .then((res) => {
                     promptTreeState.update((current) =>
                        addNodeToMultipleNodes(
                           data._id,
                           current,
                           new TreeNodeInfo(false, get(type), get(name), {
                              _id: "TODO",
                              _folderId: data._id,
                           })
                        )
                     );
                  })
                  .catch((err) => console.error("ERROR ON THE SERVER:", err));
            });
            canceled.then(() => console.log("dialog canceled"));
         },
      }),
      // REMOVE PROMPT FOLDER BUTTON
      new ButtonInfo({
         style: removeBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: REMOVE PROMPT FOLDER/CONTENT"); // TODO CONNECT TO DB
            // NOTE: U fetch requestu se bude muset specifikovat, že se jedná o folder
            fetchDeletePrompt(data)
               .then((res) => {
                  promptTreeState.update((current) => removeNodeFromMultipleNodes(data._id, current));
               })
               .catch((err) => console.error("ERROR ON THE SERVER:", err));
         },
      }),
   ];

   const promptContentNodeButtons = [
      // ADD PROMPT BUTTON
      new ButtonInfo({
         style: addBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => {
            console.log("TODO: REMOVE PROMPT CONTENT"); // TODO CONNECT TO DB
            fetchDeletePrompt(data)
               .then((res) => {
                  promptTreeState.update((current) => removeNodeFromMultipleNodes(data._id, current));
               })
               .catch((err) => console.error("ERROR ON THE SERVER:", err));
         },
      }),
   ];

   //#endregion
</script>

<div class="w-full grid place-items-center">
   <div>
      {#if $threadTreeState.length > 0}
         <span>THREADING:</span>
         <Tree
            nodeOnClickAction={(nodeData) => goto(`${routes.static.thread}${nodeData._id}`)}
            nodeInfoCollection={threadTreeState}
            contentNodeButtons={threadContentNodeButtons}
            folderNodeButtons={threadFolderNodeButtons}
         />
      {/if}

      {#if $promptTreeState.length > 0}
         <span>PROMPTING:</span>
         <Tree
            nodeOnClickAction={(nodeData) => goto(`${routes.static.prompt}${nodeData._id}`)}
            nodeInfoCollection={promptTreeState}
            contentNodeButtons={promptContentNodeButtons}
            folderNodeButtons={promptFolderNodeButtons}
         />
      {/if}
   </div>
</div>

<CreateDialog dialogProxy={createThreadDialogProxy} data={createThreadDialogData} />
<CreateDialog dialogProxy={createPromptDialogProxy} data={createPromptDialogData} />
