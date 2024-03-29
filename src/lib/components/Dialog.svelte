<!-- NOTE: Kvůli testům musela být soubor komponenty (Dialog.svelte) vyjmutou z index.ts (DialogProxy nešlo importovat)
Pokud se někdy podaří zprovoznit import svelte komponent, tak zvážit navrácená komponenty do index file -->

<script lang="ts">
   import { onMount } from "svelte";
   import { DialogButtonType, DialogEventType, type DialogProxy } from "./Dialog";
   import Button from "./Button.svelte";
   import styles from "$styles";

   export let proxy: DialogProxy;
   let dialog: HTMLDialogElement;

   /**
    * Empty data for the next dialog show session
    */
   export let setDefaultValues = () => {};
   export let buttons: { type: DialogButtonType; text: string }[];
   export let title: string = "";

   const btnEventTypeByBtnType = new Map<DialogButtonType, DialogEventType>([
      [DialogButtonType.Cancel, DialogEventType.Cancel],
      [DialogButtonType.Confirm, DialogEventType.Confirm],
   ]);
   const getEventType = (btnType: DialogButtonType) => {
      const eventType = btnEventTypeByBtnType.get(btnType);
      if (eventType) return eventType;
      throw new Error("Invalid button type was passed");
   };

   const dialogStyle = styles.build(
      styles.class.mainPanel,
      " m-0 fixed min-h-fit inset-x-[30%] rounded-t-none rounded-bl-2xl rounded-br-2xl bg-[rgba(255,255,255,0.1)] backdrop-blur-[7px]"
   );

   onMount(() => {
      proxy.init(dialog);
      dialog.addEventListener(DialogEventType.Show, setDefaultValues);
      dialog.addEventListener("cancel", () => proxy.dispatchEvent(new Event(DialogEventType.Cancel)));
   });
</script>

<!-- TODO - Animace při close: dialog zajede zpátky nahoru (opačná animace jako při zobrazení) -->
<dialog class={dialogStyle} bind:this={dialog}>
   <div class="h-full justify-even items-center flex flex-col space-y-2">
      {#if title !== ""}<span class="text-[2rem] font-normal italic">{":: " + title + " ::"}</span>{/if}
      <slot />
      <div class="w-full p-2 grid grid-flow-col justify-stretch space-x-20">
         {#each buttons as { type, text }}
            <Button on:click={() => proxy.dispatchEvent(new Event(getEventType(type)))} {text} />
         {/each}
      </div>
   </div>
</dialog>

<style>
   :root {
      --backdrop-blur: blur(0.7px);
      --backdrop-bg: rgba(0, 0, 0, 1);
   }

   @keyframes backdrop {
      0% {
         backdrop-filter: blur(0);
         background-color: rgba(0, 0, 0, 0);
      }

      90% {
         backdrop-filter: blur(0.7px);
         background-color: rgba(0, 0, 0, 0.04);
      }
   }

   @keyframes dialog {
      0% {
         top: -50%;
      }

      100% {
         top: 0;
      }
   }

   dialog::backdrop {
      backdrop-filter: blur(0.7px);
      background-color: rgba(0, 0, 0, 0.04);
      animation: backdrop 0.75s ease;
   }

   dialog {
      animation: dialog 0.75s ease;
   }

   .dialog-close {
      animation: dialog 0.75s reverse;
   }
</style>
