<script lang="ts">
   import TextOutput from "$lib/components/TextOutput.svelte";
   import type QAItem from "./QAItem";

   export let qaItems: QAItem[];
   let toTokensValue: string;
</script>

<TextOutput bind:value={toTokensValue} />

<span />
{#each qaItems as { question, answer }}
   <div class="container-item">
      <!-- <TextOutput text={answer} />
      <TextOutput text={question} /> -->
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
