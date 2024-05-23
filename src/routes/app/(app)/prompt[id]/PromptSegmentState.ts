import type { ChatCompletionRequestMessageRoleEnum } from "./ChatCompletionRequestMessageRoleEnum";

type PromptSegmentState = {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
};

export default PromptSegmentState;
