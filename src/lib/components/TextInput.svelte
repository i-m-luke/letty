<script lang="ts">
   import BaseInput from "./BaseInput.svelte";
   export let value: string = "";
   export let label: string = "";
</script>

<BaseInput {label}>
   <input class="bg-transparent" bind:value />
</BaseInput>
