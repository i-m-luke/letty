import type { CreateChatCompletionResponse } from "openai";

export type CompletionParams = {
  model: string;
  temperature: number | null;
};

export type ContextMessage = {
  content: string;
};

export type SendMessageOpts = {
  contextMessages?: ContextMessage[];
  model?: string;
  temperature?: number | null;
};

export type SendMessageResult = {
  response: string | undefined;
  data: CreateChatCompletionResponse;
};
