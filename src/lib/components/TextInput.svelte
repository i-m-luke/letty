<script lang="ts">
   import BaseInput from "./BaseInput.svelte";
   export let value: string = "";
   export let label: string = "";
</script>

<BaseInput {label}>
   <input class="border-2 border-black rounded" bind:value />
</BaseInput>
