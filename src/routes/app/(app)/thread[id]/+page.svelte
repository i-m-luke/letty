<script lang="ts">
   import QADisplay from "./QADisplay.svelte";
   import type QAItem from "./QAItem";
   import QArea from "./QArea.svelte";

   // TODO: REWORK
   // TODO: Fixnout update UI (data se po kliku na uzel nemění)
   let qaItems: QAItem[] = [];
</script>

<div class="container">
   <form>
      <QADisplay {qaItems} />
      <QArea />

      <!-- page.server.ts bude form action "sendMessage", která bude využívat funkce z "src/ai-interface" -->
      <button formAction="/app?/send-message">{"<< SEND MESSAGE >>"}</button>
   </form>
</div>

<style>
   .container {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
   }
</style>
