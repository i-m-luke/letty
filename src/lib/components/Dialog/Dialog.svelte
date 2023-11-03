<script lang="ts">
   import { DialogButtonType, type DialogProxy } from "./";

   export let proxy: DialogProxy;
   let dialog: HTMLDialogElement;
   $: {
      proxy.init(dialog);
   }

   export let dataReset = () => {};

   const handleDialog = (dispatchEventName: string) => () => {
      dialog.close();
      proxy.dispatchEvent(new Event(dispatchEventName));
   };

   const getOnClickAction = (type: DialogButtonType) => {
      switch (type) {
         case DialogButtonType.Cancel:
            return handleDialog("close");
         case DialogButtonType.Confirm:
            return () => {
               handleDialog("confirm");
            };
      }
   };

   export let buttons: { type: DialogButtonType; text: string }[];
</script>

<dialog bind:this={dialog} on:close={dataReset}>
   <div class="root">
      <slot />
      {#each buttons as { type, text }}
         <button on:click={handleDialog(type.toString())}>{text}</button>
      {/each}
   </div>
</dialog>

<style>
   dialog::backdrop {
      backdrop-filter: blur(1.25px);
   }

   dialog {
      top: 25%;
      left: 50%;
      transform: translate(-50%, -50%);
   }

   .root {
      display: flex;
      flex-direction: column;
   }
</style>
