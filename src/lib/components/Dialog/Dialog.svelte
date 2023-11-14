<script lang="ts">
   import { onMount } from "svelte";
   import type { DialogButtonType, DialogProxy } from "./";
   import Button from "../Button.svelte";
   import styles from "$styles";

   export let proxy: DialogProxy;
   let dialog: HTMLDialogElement;

   // rnm --> setDefaultValues ??
   /**
    * Empty data for the next dialog show session
    */
   export let dataReset = () => {};
   export let buttons: { type: DialogButtonType; text: string }[];

   const dialogStyle = styles.build(
      styles.color.primary,
      "absolute inset-x-1/2 p-4 border-2 border-black rounded -translate-y-1/2 -translate-x-1/2"
   );

   const handleDialog = (dispatchEventName: string) => () => {
      dialog.close();
      proxy.dispatchEvent(new Event(dispatchEventName));
   };

   onMount(() => {
      proxy.init(dialog);
      dataReset();
   });
</script>

<dialog class={dialogStyle} bind:this={dialog} on:close={dataReset}>
   <!--  -->
   <div class="flex flex-col place-items-center space-y-2">
      <slot />
      <div class="w-full grid grid-flow-col justify-stretch space-x-2">
         {#each buttons as { type, text }}
            <Button on:click={handleDialog(type.toString())} {text} />
         {/each}
      </div>
   </div>
</dialog>

<style>
   dialog::backdrop {
      backdrop-filter: blur(1.25px);
   }
</style>
