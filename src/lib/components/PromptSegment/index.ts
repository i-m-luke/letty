import _PromptSegment from "./PromptSegment.svelte";
import type { ChatCompletionRequestMessageRoleEnum } from "openai";

export const PromptSegment = _PromptSegment;

export type PromptSegmentState = {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
};
