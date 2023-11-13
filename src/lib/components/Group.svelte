<script lang="ts">
   export let name: string;
</script>

<div class="relative mt-2">
   <div
      class="absolute grid place-items-center max-w-xs min-w-min inset-x-1/3 -top-3 px-2 bg-white border-2 border-black border-dotted rounded shadow-full-white"
   >
      <span>{name}</span>
   </div>
   <div class="p-3 pt-5 border-2 border-black rounded">
      <slot />
   </div>
</div>
