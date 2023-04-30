<script lang="ts">
   import { page } from "$app/stores";
   import PromptBuilder from "./PromptBuilder.svelte";
   import type PromptSegmentState from "./PromptSegmentState";
   import { postSavedPrompt } from "./$page-logic";
   import { writable, type Writable } from "svelte/store";

   let inPromptName: string = "test prompt";
   let inPromptText: string = "test prompt";
   let isBuilderVisible: boolean = false;

   const selectedNodeId: string = $page.params.id;
   const promptBuilderState: Writable<PromptSegmentState[]> = writable([]);
</script>

<main>
   <div>
      <span>PROMPT NAME:</span>
      <input bind:value={inPromptName} />
      <span>PROMPT:</span>
      <input bind:value={inPromptText} />

      <button on:click={() => postSavedPrompt(selectedNodeId, inPromptName, inPromptText)}>
         SAVE PROMPT
      </button>

      <span>SELECTED NODE ID: {selectedNodeId}</span>
      <button>CLONE</button>
      <!-- Slouží pro naklonování aktuálně navoleného uzlu -->
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
