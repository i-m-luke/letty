import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessageRoleEnum,
} from "openai";

import type {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
} from "openai";
import { convertToObject } from "typescript";

const CHATGPT_API_KEY = "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";
const config = new Configuration({
  apiKey: CHATGPT_API_KEY,
});

const openAiApi = new OpenAIApi(config);

type CompletionParams = {
  model: string;
  temperature: number | null;
};

type ContextMessage = {
  content: string;
};

type SendMessageOpts = {
  contextMessages?: ContextMessage[];
  model?: string;
  temperature?: number | null;
};

// default completion params
const defaultCompletionParams: CompletionParams = {
  model: "gpt-3.5-turbo",
  temperature: 0,
};

const sendMessage = async (message: string, opts?: SendMessageOpts) => {
  const {
    model = defaultCompletionParams.model,
    temperature = defaultCompletionParams.temperature,
    contextMessages,
  } = {
    ...opts,
  };

  const messages: ChatCompletionRequestMessage[] = [];

  if (contextMessages) {
    const safeContextMessages = [...contextMessages];
    const reqContextMessages: ChatCompletionRequestMessage[] =
      safeContextMessages.map((message) => {
        return {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: message.content,
        };
      });

    messages.push(
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content:
          "Answer question based on your knowledge but also related to given context",
      },
      ...reqContextMessages
    );
  }

  messages.push({
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: message,
  });

  const completion = await openAiApi.createChatCompletion({
    model,
    temperature,
    messages,
  });

  return {
    response: completion.data.choices[0].message?.content,
    data: completion.data,
  };
};

const clientCodeAsync = async () => {
  const messageInputElemText = "Help me to choose a new car";
  const selectedContextMessages: ContextMessage[] = [
    {
      content: "I have a car",
    },
    {
      content: "My car brand is Seat",
    },
    {
      content: "I like blue color",
    },
  ];

  // with context:
  // const response = await sendMessage(messageInputElemText, {
  //   contextMessages: selectedContextMessages,
  // });

  // without context:
  const response = await sendMessage(messageInputElemText);

  console.log("RESPONSE: " + response.response);
  console.log("TOKENS: " + response.data.usage?.total_tokens);
  console.log(
    "COST (KČ): " + Number(response.data.usage?.total_tokens) * 0.00132
  );

  // store new message to db
};

clientCodeAsync();
