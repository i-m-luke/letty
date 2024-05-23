<script>
   import { goto } from "$app/navigation";
   import routes from "$routes";
</script>

<div class="w-screen h-screen grid place-items-center bg-slate-900">
   <div class="h-1/2">
      <p class="big-text text-teal-200"><i>/letty/:</i> let your prompts come true</p>
      <div class="grid place-items-center">
         <button class="text text-teal-400" on:click={() => goto(routes.static.app)}>&gt &gt E N T E R &lt &lt</button>
      </div>
   </div>
</div>

