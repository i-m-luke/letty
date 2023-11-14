<script lang="ts">
   import Dialog from "$lib/components/Dialog/Dialog.svelte";
   import { DialogButtonType, type DialogProxy } from "$lib/components/Dialog";
   import TextInput from "$lib/components/Input.svelte";
   import { TreeNodeType } from "$lib/components/Tree";
   import type CreateDialogData from "./CreateDialogData";
   import Group from "$lib/components/Group.svelte";

   export let dialogProxy: DialogProxy;
   export let data: CreateDialogData;

   const { name, type } = data;

   const dataReset = () => {
      name.set("");
      type.set(TreeNodeType.Content);
   };

   const radioStyle = "flex-1 flex flex-col items-center";
</script>

<Dialog
   bind:proxy={dialogProxy}
   buttons={[
      { type: DialogButtonType.Confirm, text: "ADD" },
      { type: DialogButtonType.Cancel, text: "CLOSE" },
   ]}
   {dataReset}
>
   <div class="flex flex-col space-y-2">
      <Group name="TYPE">
         <div class="flex flex-row">
            <div class={radioStyle}>
               <span>content</span>
               <input type="radio" bind:group={$type} value={TreeNodeType.Content} />
            </div>
            <div class={radioStyle}>
               <span>folder</span>
               <input type="radio" bind:group={$type} value={TreeNodeType.Folder} />
            </div>
         </div>
      </Group>
      <TextInput bind:value={$name} label="NAME:" />
   </div>
</Dialog>
