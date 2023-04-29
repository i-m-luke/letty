import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessageRoleEnum,
} from "openai";

import type {
  ChatCompletionRequestMessage,
  CreateChatCompletionResponse,
} from "openai";
import { log } from "./logging"; // facade pattern

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

type SendMessageResult = {
  response: string | undefined;
  data: CreateChatCompletionResponse;
};

// default completion params
const defaultCompletionParams: CompletionParams = {
  model: "gpt-3.5-turbo",
  temperature: 0,
};

const sendMessage = async (
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

  if (contextMessages) {
    const safeContextMessages = [...contextMessages];
    messages.push(
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content:
          "Answer question based on your knowledge but also related to given context",
      },
      ...safeContextMessages.map((message) => {
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

const logResult = (response: SendMessageResult) => {
  log("RESPONSE: " + response.response);
  log("TOKENS: " + response.data.usage?.total_tokens);
  log("COST (KČ): " + Number(response.data.usage?.total_tokens) * 0.00132);
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

  // without context:
  const response01 = await sendMessage(messageInputElemText);
  logResult(response01);

  // with context:
  const response02 = await sendMessage(messageInputElemText, {
    contextMessages: selectedContextMessages,
  });
  logResult(response02);

  // store new message to db
};

clientCodeAsync();
