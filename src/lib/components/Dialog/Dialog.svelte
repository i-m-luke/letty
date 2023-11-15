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
   export let title: string = "";

   const dialogStyle = styles.build(
      styles.class.mainPanel,
      "bg-[rgba(255,255,255,0.4)] m-0 fixed min-h-fit inset-x-[30%] rounded-t-none rounded-bl-2xl rounded-br-2xl"
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
   <div class="h-full justify-even items-center flex flex-col space-y-2">
      <!-- TODO: Udělat title jako group, ale v italic a větším font-size -->
      {#if title !== ""} <span class="text-[2rem] font-normal italic">{":: " + title + " ::"}</span> {/if}
      <slot />
      <div class="w-max-1/4 p-2 grid grid-flow-col justify-stretch space-x-24">
         {#each buttons as { type, text }}
            <Button on:click={handleDialog(type.toString())} {text} />
         {/each}
      </div>
   </div>
</dialog>

<style>
   @keyframes backdrop {
      0% {
         backdrop-filter: blur(0);
      }

      100% {
         backdrop-filter: blur(0.9px);
      }
   }

   @keyframes dialog {
      0% {
         opacity: 0;
         top: -50%;
      }

      50% {
         opacity: 0.6;
      }

      100% {
         opacity: 1;
         top: 0;
      }
   }

   /* TODO: Bude součástí transition */
   dialog::backdrop {
      backdrop-filter: blur(0.9px);
      animation: backdrop 0.25s linear;
   }

   dialog {
      animation: dialog 0.75s ease;
   }
</style>
