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
      fetchDeleteThreadFolder,
      fetchDeletePromptFolder,
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
            const { confirmed, canceled } = createThreadDialogProxy.showModalAndWaitTillClosed();
            confirmed.then(() => {
               const { name, type } = createThreadDialogData;
               // TODO: Podle "type" bude nutné provést buď fetch pro folder nebo pro content
               fetchPostThread({ parentId: data._id, name: get(name), messages: [] })
                  .then((res) => {
                     if (res.success) {
                        threadTreeState.update((current) =>
                           addNodeToMultipleNodes(
                              data._id,
                              current,
                              new TreeNodeInfo(false, get(type), res.data.name, {
                                 _id: res.data._id,
                                 _folderId: data._id,
                              })
                           )
                        );
                     } else {
                        // ... process issues (e.g. display invalid data in dialog)
                        console.log(res.issues);
                     }
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
            // TODO: Mazání folders není hotové!
            console.log("TODO: REMOVE THREAD FOLDER/CONTENT");
            fetchDeleteThreadFolder({ _id: data._id, parentId: data._folderId })
               .then((res) => {
                  console.log("TODO");
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
            fetchDeleteThread({ _id: data._id, parentId: data._folderId })
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
            const { confirmed, canceled } = createPromptDialogProxy.showModalAndWaitTillClosed();
            confirmed.then(() => {
               const { name, type } = createPromptDialogData;
               // TODO: Podle "type" bude nutné provést buď fetch pro folder nebo pro content
               fetchPostPrompt({ parentId: data._id, name: get(name), text: "" })
                  .then((res) => {
                     if (res.success) {
                        promptTreeState.update((current) =>
                           addNodeToMultipleNodes(
                              data._id,
                              current,
                              new TreeNodeInfo(false, get(type), res.data.name, {
                                 _id: res.data._id,
                                 _folderId: data._id,
                              })
                           )
                        );
                     } else {
                        // ... process issues (e.g. display invalid data in dialog)
                        console.log(res.issues);
                     }
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
            // TODO: Mazání folders není hotové!
            console.log("TODO: REMOVE PROMPT FOLDER/CONTENT");
            fetchDeletePromptFolder({ parentId: data._folderId, _id: data._id })
               .then((res) => {
                  console.log("TODO");
               })
               .catch((err) => console.error("ERROR ON THE SERVER:", err));
         },
      }),
   ];

   const promptContentNodeButtons = [
      // REMOVE PROMPT BUTTON
      new ButtonInfo({
         style: removeBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => {
            fetchDeletePrompt({ parentId: data._folderId, _id: data._id })
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
         <span class="underline">THREADING:</span>
         <Tree
            nodeOnClickAction={(nodeData) => goto(`${routes.static.thread}${nodeData._id}`)}
            nodeInfoCollection={threadTreeState}
            contentNodeButtons={threadContentNodeButtons}
            folderNodeButtons={threadFolderNodeButtons}
         />
      {/if}

      {#if $promptTreeState.length > 0}
         <span class="underline">PROMPTING:</span>
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
