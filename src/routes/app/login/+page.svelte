<script lang="ts">
   import { goto } from "$app/navigation";
</script>

<input placeholder="username" />
<input type="password" placeholder="password" />
<button>SIGN IN</button>
<button>SIGN UP</button>
<button on:click={() => goto("/app")}>ENTER (temp btn)</button>
