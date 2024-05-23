<script lang="ts">
   import type PromptSegmentState from "./PromptSegmentState";
   import PromptSegment from "./PromptSegment.svelte";
   import { ChatCompletionRequestMessageRoleEnum } from "./ChatCompletionRequestMessageRoleEnum";
   import type { Writable } from "svelte/store";

   export let state: Writable<PromptSegmentState[]>;

   const createPromptSegmentState = (): PromptSegmentState => {
      return { role: ChatCompletionRequestMessageRoleEnum.User, content: "" };
   };

   const addNewSegment = () => ($state = [...$state, createPromptSegmentState()]);
</script>

<button on:click={addNewSegment}>
   {"<< ADD NEW SEGMENT >>"}
</button>

{#each $state as state}
   <PromptSegment {state} />
{/each}
