import type { ChatCompletionRequestMessageRoleEnum } from "openai";

type PromptSegmentState = {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
};

export default PromptSegmentState;
