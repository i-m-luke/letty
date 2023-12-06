<script lang="ts">
   import routes from "$routes";
   import { get, type Writable } from "svelte/store";
   import { goto } from "$app/navigation";
   import { Tree, TreeNodeInfo, TreeNodeType, type TreeNodeInfoData } from "$lib/components/Tree";
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
      fetchPostPromptFolder,
      fetchPostThreadFolder,
   } from "./$logic";
   import { DialogButtonType, DialogProxy } from "$lib/components/Dialog";
   import CreateDialogData from "./CreateDialogData";
   import CreateDialog from "./CreateDialog.svelte";
   import Dialog from "$lib/components/Dialog.svelte";
   import { CreateDialogEntriesIssue } from "./CreateDialogEntriesIssue";

   const createThreadDialogProxy = new DialogProxy();
   const createThreadDialogData = new CreateDialogData();

   const createPromptDialogProxy = new DialogProxy();
   const createPromptDialogData = new CreateDialogData();

   const sureToDeleteDialogProxy = new DialogProxy();

   export let threadTreeState: Writable<TreeNodeInfo[]>;
   export let promptTreeState: Writable<TreeNodeInfo[]>;

   threadTreeState.set([
      new TreeNodeInfo(TreeNodeType.Root, "THREADING", { folderId: "root", id: "" }, { childNodes: [...get(threadTreeState)] }),
   ]);

   promptTreeState.set([
      new TreeNodeInfo(TreeNodeType.Root, "PROMPTING", { folderId: "root", id: "" }, { childNodes: get(promptTreeState) }),
   ]);

   //#region thread buttons

   const addBtnClassName = "fa-solid fa-plus button";
   const removeBtnClassName = "fa-solid fa-trash";
   const removeBtnStyle = "font-size: 0.9rem";

   const threadFolderNodeAddButton = new ButtonInfo({
      className: addBtnClassName,
      onClickAction: (treeNodeData: TreeNodeInfoData) => {
         //#region TODO - REWORK:

         const beforeConfirm = async () => {
            const type = get(createThreadDialogData.type);
            const name = get(createThreadDialogData.name);
            const res = await (() => {
               switch (type) {
                  case TreeNodeType.Content:
                     return fetchPostThread({ parentId: treeNodeData.id, name });
                  case TreeNodeType.Folder:
                     return fetchPostThreadFolder({ parentId: treeNodeData.id, name });
                  default:
                     throw new Error("Invalid TreeNodeType");
               }
            })();

            if (!res.success) {
               // WARNING:
               // Pokud je poprvé navráceno false (např. špatně zadané hodnoty) a poté je navrácení true, tak se nic neprovede
               // Příčina je v tom, že se eventy po odbavení odstraní
               // TODO: process issues (e.g. display invalid data in dialog)
               // But dialog can't close ... :-/
               console.log(
                  "EMPTY NAME ISSUE:" + res.issues.find((issue) => issue.type === CreateDialogEntriesIssue.Name)?.message
               );

               return false;
            }

            const { data } = res;
            const newTreeNode = new TreeNodeInfo(type, data.name, {
               id: data._id,
               folderId: data.parentId,
            });
            threadTreeState.update((current) => addNodeToMultipleNodes(treeNodeData.id, current, newTreeNode));

            return true;
         };

         // BPSD: createThreadDialogProxy.showModalAndWaitTillClosed({ beforeConfirm });

         //#endregion

         const { confirmed } = createThreadDialogProxy.showModalAndWaitTillClosed();
         confirmed.then(async () => {
            const type = get(createThreadDialogData.type);
            const name = get(createThreadDialogData.name);
            const res = await (() => {
               switch (type) {
                  case TreeNodeType.Content:
                     return fetchPostThread({ parentId: treeNodeData.id, name });
                  case TreeNodeType.Folder:
                     return fetchPostThreadFolder({ parentId: treeNodeData.id, name });
                  default:
                     throw new Error("Invalid TreeNodeType");
               }
            })();

            if (res.success) {
               const { _id, parentId, name } = res.data;
               const newTreeNode = new TreeNodeInfo(type, name, {
                  id: _id,
                  folderId: parentId,
               });
               threadTreeState.update((current) => addNodeToMultipleNodes(treeNodeData.id, current, newTreeNode));
            } else {
               // TODO: process issues (e.g. display invalid data in dialog)
               // But dialog can't close ... :-/
               console.log(
                  "EMPTY NAME ISSUE:" + res.issues.find((issue) => issue.type === CreateDialogEntriesIssue.Name)?.message
               );
            }
         });
      },
   });

   const threadTreeRootNodeButtons = [threadFolderNodeAddButton];
   const threadFolderNodeButtons = [
      threadFolderNodeAddButton,
      // THREAD FOLDER NODE REMOVE BUTTON
      new ButtonInfo({
         className: removeBtnClassName,
         style: removeBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => {
            const { confirmed } = sureToDeleteDialogProxy.showModalAndWaitTillClosed();
            confirmed.then(() => {
               fetchDeleteThreadFolder({ _id: data.id, parentId: data.folderId })
                  .then(() => {
                     threadTreeState.update((current) => removeNodeFromMultipleNodes(data.id, current));
                  })
                  .catch((err) => console.error("ERROR WHILE FETCHING:", err));
            });
         },
      }),
   ];

   const threadContentNodeButtons = [
      // THREAD NODE REMOVE BUTTON
      new ButtonInfo({
         className: removeBtnClassName,
         style: removeBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => {
            const { confirmed } = sureToDeleteDialogProxy.showModalAndWaitTillClosed();
            confirmed.then(() => {
               fetchDeleteThread({ _id: data.id, parentId: data.folderId })
                  .then(() => {
                     threadTreeState.update((current) => removeNodeFromMultipleNodes(data.id, current));
                  })
                  .catch((err) => console.error("ERROR WHILE FETCHING:", err));
            });
         },
      }),
   ];

   //#endregion

   //#region prompt buttons

   const promptFolderNodeAddButton = new ButtonInfo({
      className: addBtnClassName,
      onClickAction: (treeNodeData: TreeNodeInfoData) => {
         const { confirmed } = createPromptDialogProxy.showModalAndWaitTillClosed();
         confirmed.then(async () => {
            const type = get(createPromptDialogData.type);
            const name = get(createPromptDialogData.name);
            const res = await (async () => {
               switch (type) {
                  case TreeNodeType.Content:
                     return fetchPostPrompt({ parentId: treeNodeData.id, name });
                  case TreeNodeType.Folder:
                     return fetchPostPromptFolder({ parentId: treeNodeData.id, name });
                  default:
                     throw new Error("Invalid TreeNodeType");
               }
            })();

            if (res.success) {
               const { _id, parentId, name } = res.data;
               const newTreeNode = new TreeNodeInfo(type, name, {
                  id: _id,
                  folderId: parentId,
               });
               promptTreeState.update((current) => addNodeToMultipleNodes(treeNodeData.id, current, newTreeNode));
            } else {
               // TODO: process issues (e.g. display invalid data in dialog)
               // But dialog can't close ... :-/
               console.log(
                  "EMPTY NAME ISSUE:" + res.issues.find((issue) => issue.type === CreateDialogEntriesIssue.Name)?.message
               );
            }
         });
      },
   });

   const promptTreeRootNodeButtons = [promptFolderNodeAddButton];
   const promptFolderNodeButtons = [
      promptFolderNodeAddButton,
      // PROMPT FOLDER NODE REMOVE BUTTON
      new ButtonInfo({
         className: removeBtnClassName,
         style: removeBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => {
            const { confirmed } = sureToDeleteDialogProxy.showModalAndWaitTillClosed();
            confirmed.then(() => {
               fetchDeletePromptFolder({ parentId: data.folderId, _id: data.id })
                  .then(() => {
                     promptTreeState.update((current) => removeNodeFromMultipleNodes(data.id, current));
                  })
                  .catch((err) => console.error("ERROR WHILE FETCHING:", err));
            });
         },
      }),
   ];

   const promptContentNodeButtons = [
      // PROMPT NODE REMOVE BUTTON
      new ButtonInfo({
         className: removeBtnClassName,
         style: removeBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => {
            const { confirmed } = sureToDeleteDialogProxy.showModalAndWaitTillClosed();
            confirmed.then(() => {
               fetchDeletePrompt({ parentId: data.folderId, _id: data.id })
                  .then(() => {
                     promptTreeState.update((current) => removeNodeFromMultipleNodes(data.id, current));
                  })
                  .catch((err) => console.error("ERROR WHILE FETCHING:", err));
            });
         },
      }),
   ];

   //#endregion
</script>

<div class="w-full grid place-items-center">
   <div>
      {#if $threadTreeState.length > 0}
         <Tree
            nodeOnClickAction={(nodeData) => goto(`${routes.static.thread}${nodeData.id}`)}
            nodeInfoCollection={threadTreeState}
            contentNodeButtons={threadContentNodeButtons}
            folderNodeButtons={threadFolderNodeButtons}
            rootNodeButtons={threadTreeRootNodeButtons}
         />
      {/if}

      {#if $promptTreeState.length > 0}
         <Tree
            nodeOnClickAction={(nodeData) => goto(`${routes.static.prompt}${nodeData.id}`)}
            nodeInfoCollection={promptTreeState}
            contentNodeButtons={promptContentNodeButtons}
            folderNodeButtons={promptFolderNodeButtons}
            rootNodeButtons={promptTreeRootNodeButtons}
         />
      {/if}
   </div>
</div>

<CreateDialog dialogProxy={createThreadDialogProxy} data={createThreadDialogData} />
<CreateDialog dialogProxy={createPromptDialogProxy} data={createPromptDialogData} />
<Dialog
   proxy={sureToDeleteDialogProxy}
   buttons={[
      { type: DialogButtonType.Confirm, text: "Yes" },
      { type: DialogButtonType.Cancel, text: "No" },
   ]}
>
   Are you sure to delete?
</Dialog>
