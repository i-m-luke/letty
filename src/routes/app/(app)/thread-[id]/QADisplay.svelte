<script lang="ts">
   import type QAItem from "./QAItem";

   export let qaItems: QAItem[];
</script>

{#each qaItems as { question, answer }}
   <div class="container-item">
      <span class="item answer">A: {answer}</span>
      <span class="item question">Q: {question}</span>
   </div>
{/each}

<style>
   .answer {
      background-color: yellowgreen;
   }

   .question {
      position: relative;
      float: right;
   }

   .container-item {
      display: flex;
      flex-direction: column;
      border: 1px solid black;
   }
</style>
