<script lang="ts">
   import Dialog from "$lib/components/Dialog.svelte";
   import { DialogButtonType as DialogButtonActionType, type DialogProxy } from "$lib/components/Dialog";
   import TextInput from "$lib/components/TextInput.svelte";
   import { TreeNodeType } from "$lib/components/Tree";
   import type CreateDialogData from "./CreateDialogData";
   import GroupBox from "$lib/components/GroupBox.svelte";

   export let dialogProxy: DialogProxy;
   export let data: CreateDialogData;

   const { name, type, nameIssue } = data;

   const setDefaultValues = () => {
      name.set("");
      nameIssue.set("");
      type.set(TreeNodeType.Content);
   };

   const radioStyle = "flex-1 flex flex-col items-center";
</script>

<Dialog
   bind:proxy={dialogProxy}
   title={"What item would you like to create?"}
   buttons={[
      { type: DialogButtonActionType.Confirm, text: "ADD" },
      { type: DialogButtonActionType.Cancel, text: "CLOSE" },
   ]}
   {setDefaultValues}
>
   <div class="flex flex-col space-y-2">
      <GroupBox name="... What type?" borderIsVisible={true}>
         <div class="w-full flex flex-row justify-between gap-4">
            <div class={radioStyle}>
               <span>content</span>
               <input type="radio" bind:group={$type} value={TreeNodeType.Content} />
            </div>
            <div class={radioStyle}>
               <span>folder</span>
               <input type="radio" bind:group={$type} value={TreeNodeType.Folder} />
            </div>
         </div>
      </GroupBox>
      <GroupBox name="... What name?" borderIsVisible={true}>
         <TextInput bind:value={$name} />
         <span class="text-red-600">{$nameIssue}</span>
      </GroupBox>
   </div>
</Dialog>
