<!-- 
    TODO:
      - Parametry (= dosazování hodnot do message (bude v podstatě interpolace stringu))
      - Řetězení promptů (= response na prompt se použije jako message dalšího)
      - ChatCompletion builder

    NOTEs: Obsah bude komponenty bude přesunut do +page.svelte (bude route)
-->

<script lang="ts">
   import { PromptSegment, type PromptSegmentState } from "$lib/components/PromptSegment";
   import { writable, type Writable } from "svelte/store";
   import { ChatCompletionRequestMessageRoleEnum } from "openai";

   let promptSegmentsState: Writable<PromptSegmentState>[] = [];

   const createPromptSegmentState = (): Writable<PromptSegmentState> =>
      writable({ role: ChatCompletionRequestMessageRoleEnum.User, content: "" });

   const addNewSegment = () =>
      (promptSegmentsState = [...promptSegmentsState, createPromptSegmentState()]);
</script>

<button on:click={addNewSegment}>
   {"<< ADD NEW SEGMENT >>"}
</button>

{#each promptSegmentsState as state}
   <PromptSegment {state} />
{/each}
