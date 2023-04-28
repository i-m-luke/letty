<script lang="ts">
  import { ChatCompletionRequestMessageRoleEnum } from "openai";
  import type PromptSegmentInfo from "./PromptSegment";
  import Select from "$lib/components/Select.svelte";

  export let group: PromptSegmentInfo;
  let role: ChatCompletionRequestMessageRoleEnum = ChatCompletionRequestMessageRoleEnum.User;
  let content: string = "";

  $: group = { role, content };

  const roleOptions = [
    { text: ChatCompletionRequestMessageRoleEnum.System, data: ChatCompletionRequestMessageRoleEnum.System },
    { text: ChatCompletionRequestMessageRoleEnum.Assistant, data: ChatCompletionRequestMessageRoleEnum.Assistant },
    { text: ChatCompletionRequestMessageRoleEnum.User, data: ChatCompletionRequestMessageRoleEnum.User },
  ];
</script>

<Select label={"role"} options={roleOptions} value={role} />
<label>
  content:
  <input bind:value={content} />
</label>
