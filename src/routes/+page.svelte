<script>
  import { goto } from "$app/navigation";
  import PromptBuilder from "$lib/expe/PromptBuilder.svelte";
</script>

<span>MAIN PAGE</span>
<div class="gl-container">
  <div class="container-item">
    <button on:click={() => goto("app/main")}>ENTER APP</button>
  </div>
  <div class="container-item">
    <PromptBuilder />
  </div>
</div>
