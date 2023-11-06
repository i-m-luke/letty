<script lang="ts">
   import Dialog from "$lib/components/Dialog/Dialog.svelte";
   import { DialogButtonType, type DialogProxy } from "$lib/components/Dialog";
   import { TextInput, TextInputType } from "$lib/components/TextInput";
   import { TreeNodeType } from "$lib/components/Tree";
   import type CreateDialogData from "./CreateDialogData";

   export let dialogProxy: DialogProxy;
   export let data: CreateDialogData;

   const { name, type } = data;

   const dataReset = () => {
      name.set("");
      type.set(TreeNodeType.Content);
   };
</script>

<!-- NOTE: 
   + Content je stejný jako pro CreateThreadDialog
   + Sjednotit do jedné komponenty a parametrizovat přes props
 -->
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
