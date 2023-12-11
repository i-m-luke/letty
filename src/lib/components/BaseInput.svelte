<script lang="ts">
   export let label: string;
</script>

<div class="flex flex-row space-x-2">
   {#if label}<span>{label}</span>{/if}
   <div class={`bg-[rgba(255,255,255,0.3)] border-thin border-white rounded-md`}>
      <slot />
   </div>
</div>
