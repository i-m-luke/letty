<script lang="ts">
   export let dialog: HTMLDialogElement;
</script>

<dialog bind:this={dialog} on:close>
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
