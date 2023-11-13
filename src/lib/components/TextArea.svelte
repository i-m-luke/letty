<script lang="ts">
   import BaseInput from "./BaseInput.svelte";
   export let value: string = "";
</script>

<BaseInput>
   <textarea class="border-2 border-black rounded" bind:value />
</BaseInput>
