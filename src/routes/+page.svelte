<script>
   import { goto } from "$app/navigation";
   import { onMount } from "svelte";
</script>

<span>MAIN PAGE</span>
<div class="gl-container">
   <div class="container-item">
      <button on:click={() => goto("/app")}>ENTER APP</button>
   </div>
</div>
