<script lang="ts">
   import type PromptSegmentState from "./PromptSegmentState";
   import { Select } from "$lib/components/Select";
   import { ChatCompletionRequestMessageRoleEnum } from "./ChatCompletionRequestMessageRoleEnum";

   export let state: PromptSegmentState;
   let role: ChatCompletionRequestMessageRoleEnum = ChatCompletionRequestMessageRoleEnum.User;
   let content: string = "";

   $: state.role = role;
   $: state.content = content;

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
