<script lang="ts">
   import { onMount } from "svelte";
   import type { DialogButtonType, DialogProxy } from "./";

   export let proxy: DialogProxy;
   let dialog: HTMLDialogElement;

   // rnm --> setDefaultValues ??
   /**
    * Empty data for the next dialog show session
    */
   export let dataReset = () => {};

   const handleDialog = (dispatchEventName: string) => () => {
      dialog.close();
      proxy.dispatchEvent(new Event(dispatchEventName));
   };

   export let buttons: { type: DialogButtonType; text: string }[];

   onMount(() => {
      proxy.init(dialog);
      dataReset();
   });
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
