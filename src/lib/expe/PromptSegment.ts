import type { ChatCompletionRequestMessageRoleEnum } from "openai";

type PromptSegmentInfo = {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
};

export default PromptSegmentInfo;
