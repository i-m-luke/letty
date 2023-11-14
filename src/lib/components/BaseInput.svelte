<script lang="ts">
   export let label = "";
</script>

<div class="flex flex-row items-center space-x-2">
   {#if label !== undefined || ""}<span>{label}</span>{/if}
   <slot />
</div>
