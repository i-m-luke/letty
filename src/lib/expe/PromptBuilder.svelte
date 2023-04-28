<!-- 
    TODO:
      - Parametry (= dosazování hodnot do message (bude v podstatě interpolace stringu))
      - Řetězení promptů (= response na prompt se použije jako message dalšího)
      - ChatCompletion builder

    NOTEs: Obsah bude komponenty bude přesunut do +page.svelte (bude route)
-->

<script lang="ts">
  import type PromptSegmentInfo from "./PromptSegment";
  import PromptSegment from "./PromptSegment.svelte";
  import { v4 as uuid } from "uuid";

  let promptSegmentInfo: PromptSegmentInfo;
  let promptSegmentComponents = [uuid(), uuid()];
</script>

<button on:click={() => (promptSegmentComponents = [...promptSegmentComponents, uuid()])}>
  {"<< ADD NEW SEGMENT >>"}
</button>

{#each promptSegmentComponents as component}
  <PromptSegment bind:group={promptSegmentInfo} />
{/each}
