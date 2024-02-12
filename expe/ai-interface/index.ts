// TODO: Zapouzdřit do třídy

import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessageRoleEnum,
} from "openai";

import type {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
} from "openai";

import {
  CompletionParams,
  SendMessageOpts,
  SendMessageResult,
  ContextMessage,
} from "./types";
export { CompletionParams, SendMessageOpts, SendMessageResult, ContextMessage };

const CHATGPT_API_KEY = "TODO"; // TODO: latest key revoked

const config = new Configuration({
  apiKey: CHATGPT_API_KEY,
});
const openAiApi = new OpenAIApi(config);

// default completion params
const defaultCompletionParams: CompletionParams = {
  model: "gpt-3.5-turbo",
  temperature: 0,
};

export const performChatCompletion = (request: CreateChatCompletionRequest) => {
  return openAiApi.createChatCompletion(request);
};

export const sendMessage = async (
  message: string,
  opts?: SendMessageOpts
): Promise<SendMessageResult> => {
  const {
    model = defaultCompletionParams.model,
    temperature = defaultCompletionParams.temperature,
    contextMessages,
  } = {
    ...opts,
  };

  const messages: ChatCompletionRequestMessage[] = [];

  if (contextMessages && contextMessages.length) {
    messages.push(
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content:
          "Answer question based on your knowledge but also related to given context",
      },
      ...contextMessages.map((message) => {
        return {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: message.content,
        };
      })
    );
  }

  messages.push({
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: message,
  });

  const completion = await performChatCompletion({
    model,
    temperature,
    messages,
  });

  return {
    response: completion.data.choices[0].message?.content,
    data: completion.data,
  };
};

export const sendSingleMessage = async (message: string) => {
  return await sendMessage(message);
};

export const sendMessageWithContext = async (
  message: string,
  contextMessages: string[]
) => {
  return await sendMessage(message, {
    contextMessages: contextMessages.map((cMessage) => {
      return { content: cMessage };
    }),
  });
};
