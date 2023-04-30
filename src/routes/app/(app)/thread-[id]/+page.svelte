<script lang="ts">
   import QADisplay from "./QADisplay.svelte";
   import type QAItem from "./QAItem";
   import QArea from "./QArea.svelte";

   let qaItems: QAItem[] = [
      { question: "some question #1", answer: "... :-)" },
      { question: "some question #2", answer: "... :-(" },
   ];
</script>

<div class="container">
   <QADisplay {qaItems} />
   <QArea />
</div>

<style>
   .container {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
   }
</style>
