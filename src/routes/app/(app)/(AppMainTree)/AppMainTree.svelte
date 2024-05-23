<script lang="ts">
   import routes from "$routes";
   import { goto } from "$app/navigation";
   import { Tree, TreeNodeInfo, type TreeNodeInfoData } from "$lib/components/Tree";
   import ButtonInfo from "$lib/components/ButtonInfo";
   import { DialogButtonType } from "$lib/components/Dialog";
   import CreateDialog from "./CreateDialog.svelte";
   import Dialog from "$lib/components/Dialog.svelte";
   import { ViewModel } from "./ViewModel";

   export let threadTreeNodeInfos: TreeNodeInfo[];
   export let promptTreeNodeInfos: TreeNodeInfo[];

   const viewModel = new ViewModel({ threadTreeState: threadTreeNodeInfos, promptTreeState: promptTreeNodeInfos });
   const {
      threadTreeState,
      promptTreeState,
      createThreadDialogProxy,
      createThreadDialogData,
      createPromptDialogProxy,
      createPromptDialogData,
      sureToDeleteDialogProxy,
   } = viewModel;

   //#region thread buttons

   const addBtnClassName = "fa-solid fa-plus button";
   const removeBtnClassName = "fa-solid fa-trash";
   const removeBtnStyle = "font-size: 0.9rem";

   const threadFolderNodeAddButton = new ButtonInfo({
      className: addBtnClassName,
      onClickAction: (data: TreeNodeInfoData) => viewModel.addItemToThreadFolderNode(data),
   });

   const threadTreeRootNodeButtons = [threadFolderNodeAddButton];
   const threadFolderNodeButtons = [
      threadFolderNodeAddButton,
      // THREAD FOLDER NODE REMOVE BUTTON
      new ButtonInfo({
         className: removeBtnClassName,
         style: removeBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => viewModel.removeThreadFolderNode(data),
      }),
   ];

   const threadContentNodeButtons = [
      // THREAD NODE REMOVE BUTTON
      new ButtonInfo({
         className: removeBtnClassName,
         style: removeBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => viewModel.removeThreadContentNode(data),
      }),
   ];

   //#endregion

   //#region prompt buttons

   const promptFolderNodeAddButton = new ButtonInfo({
      className: addBtnClassName,
      onClickAction: (data: TreeNodeInfoData) => viewModel.addItemToPromptFolderNode(data),
   });

   const promptTreeRootNodeButtons = [promptFolderNodeAddButton];
   const promptFolderNodeButtons = [
      promptFolderNodeAddButton,
      // PROMPT FOLDER NODE REMOVE BUTTON
      new ButtonInfo({
         className: removeBtnClassName,
         style: removeBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => viewModel.removePromptFolderNode(data),
      }),
   ];

   const promptContentNodeButtons = [
      // PROMPT NODE REMOVE BUTTON
      new ButtonInfo({
         className: removeBtnClassName,
         style: removeBtnStyle,
         onClickAction: (data: TreeNodeInfoData) => viewModel.removePromptContentNode(data),
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
