<script lang="ts">
   import { onMount } from "svelte";
   import type { DialogProxy } from "./";
   import { validate } from "uuid";

   export let proxy: DialogProxy;
   let dialog: HTMLDialogElement;
   $: {
      proxy.init(dialog);
   }
</script>

<dialog bind:this={dialog}>
   <div class="root">
      <slot />
      <button on:click={() => dialog.close()}>{"<< close >>"}</button>
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
