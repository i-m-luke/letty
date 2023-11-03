<script lang="ts">
   import Dialog from "$lib/components/Dialog/Dialog.svelte";
   import { DialogButtonType, type DialogProxy } from "$lib/components/Dialog";
   import { TextInput, TextInputType } from "$lib/components/TextInput";
   import type CreatePromptDialogData from "./CreatePromptDialogData";

   export let dialogProxy: DialogProxy;
   export let data: CreatePromptDialogData;

   const { name } = data;

   const dataReset = () => {
      name.set("");
   };
</script>

<Dialog
   bind:proxy={dialogProxy}
   buttons={[
      { type: DialogButtonType.Confirm, text: "ADD" },
      { type: DialogButtonType.Cancel, text: "CLOSE" },
   ]}
   {dataReset}
>
   <TextInput type={TextInputType.Text} bind:value={$name} label="NAME:" />
   <style>
      form {
         display: flex;
         flex-direction: column;
      }
   </style>
</Dialog>
