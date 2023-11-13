<script lang="ts">
   export let label = "";
</script>

<div class="flex flex-row items-center space-x-2">
   {#if label !== undefined || ""}<label for="input">{label}</label>{/if}
   <slot id="input" />
</div>
