<script lang="ts">
   import { page } from "$app/stores";
   import PromptBuilder from "./PromptBuilder.svelte";
   import type PromptSegmentState from "./PromptSegmentState";
   import { fetchPOST } from "./$page-logic";
   import { writable, type Writable } from "svelte/store";

   let inPromptName: string = "test prompt";
   let inPromptText: string = "test prompt";
   let isBuilderVisible: boolean = false;

   const promptBuilderState: Writable<PromptSegmentState[]> = writable([]);
</script>

<main>
   <div>
      <span>PROMPT NAME:</span>
      <input bind:value={inPromptName} />
      <span>PROMPT:</span>
      <input bind:value={inPromptText} />

      <button on:click={() => fetchPOST($page.params.id, inPromptName, inPromptText)}>
         SAVE PROMPT
      </button>

      <span>SELECTED NODE ID: {$page.params.id}</span>
      <button>CLONE</button>
   </div>
   <div>
      <button on:click={() => (isBuilderVisible = !isBuilderVisible)}>
         PROMPT BUILDER: {isBuilderVisible ? "opened" : "closed"}
      </button>
      {#if isBuilderVisible}
         <PromptBuilder state={promptBuilderState} />
      {/if}
   </div>
   <div>
      <button>{"<< RUN PROMPT >>"}</button>
   </div>
</main>

<style>
   main {
      display: flex;
      flex-direction: column;
   }
</style>
