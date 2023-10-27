<script>
   import { goto } from "$app/navigation";
   import routes from "$routes";
</script>

<span>MAIN PAGE</span>
<div class="gl-container">
   <div class="container-item">
      <button on:click={() => goto(routes.static.app)}>ENTER APP</button>
   </div>
</div>
