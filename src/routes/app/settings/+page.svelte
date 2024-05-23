<script>
   import { goto } from "$app/navigation";
   import routes from "$routes";
</script>

<div class="w-full h-screen grid place-items-center bg-slate-900">
   <div class="h-1/2">
      <p class="big-text text-teal-200">... Comming soon ...</p>
      <div class="grid place-items-center">
         <button class="small-text text-teal-400" on:click={() => goto(routes.static.app)}>&gt &gt R E T U R N &lt &lt</button>
      </div>
   </div>
</div>
