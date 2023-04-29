<script lang="ts">
   import { ChatCompletionRequestMessageRoleEnum } from "openai";
   import type { PromptSegmentState } from "./";
   import Select from "$lib/components/Select.svelte";
   import type { Writable } from "svelte/store";

   export let state: Writable<PromptSegmentState>;
   let role: ChatCompletionRequestMessageRoleEnum = ChatCompletionRequestMessageRoleEnum.User;
   let content: string = "";

   $: $state = { role, content };

   const roleOptions = [
      {
         text: ChatCompletionRequestMessageRoleEnum.System,
         data: ChatCompletionRequestMessageRoleEnum.System,
      },
      {
         text: ChatCompletionRequestMessageRoleEnum.Assistant,
         data: ChatCompletionRequestMessageRoleEnum.Assistant,
      },
      {
         text: ChatCompletionRequestMessageRoleEnum.User,
         data: ChatCompletionRequestMessageRoleEnum.User,
      },
   ];
</script>

<Select bind:value={role} label={"role"} options={roleOptions} />
<label>
   content:
   <input bind:value={content} />
</label>
