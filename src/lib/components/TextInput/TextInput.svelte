<script lang="ts">
   import { TextInputType } from "./";
   export let type: TextInputType;
   export let label: string;
   export let value: string;
</script>

<div class="root">
   {#if label !== undefined || ""}<span>{label}</span>{/if}
   {#if type === TextInputType.TextArea}
      <textarea {value} />
   {:else}
      <input {type} {value} />
   {/if}
</div>

<style>
   .root {
      display: flex;
      flex-direction: row;
   }
</style>
