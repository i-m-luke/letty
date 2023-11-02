<script lang="ts">
   import { TextInputType } from "./";
   import Input from "./Input.svelte";
   import TextArea from "./TextArea.svelte";

   export let type: TextInputType;
   export let label: string;
   export let value: string;

   const getComponent = () => {
      switch (type) {
         case TextInputType.Text:
            return Input;
         case TextInputType.TextArea:
            return TextArea;
      }
   };
</script>

<div class="root">
   {#if label !== undefined || ""}<span>{label}</span>{/if}
   <svelte:component this={getComponent()} bind:value />
</div>

<style>
   .root {
      display: flex;
      flex-direction: row;
   }
</style>
