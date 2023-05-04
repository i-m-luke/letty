import { log } from "./logging"; // facade pattern
import ThreadDOA from "../src/lib/DOA/ThreadDOA";
import PromptDOA from "../src/lib/DOA/PromptDOA";
import { MongoClient } from "mongodb";

const DB_URL = "mongodb://127.0.0.1:27017/";
const DB_NAME = "QA";

import {
  sendMessage,
  ContextMessage,
  SendMessageResult,
  sendSingleMessage,
  sendMessageWithContext,
} from "./ai-interface";

const client = new MongoClient(DB_URL + DB_NAME);

export const startDatabase = (): Promise<MongoClient> => {
  log("Starting mongo database...");
  return client.connect();
};

startDatabase();
const promptDOA = new PromptDOA(client.db());
const threadDOA = new ThreadDOA(client.db());

const logResult = (response: SendMessageResult) => {
  log("RESPONSE: " + response.response);
  log("TOKENS: " + response.data.usage?.total_tokens);
  log("COST (KČ): " + Number(response.data.usage?.total_tokens) * 0.00132);
};

// NOTE: Pro vscode debugging použít expe skript
const main = async () => {
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

  sendSingleMessage(messageInputElemText);
  sendMessageWithContext(
    messageInputElemText,
    selectedContextMessages.map((cMessage) => cMessage.content)
  );

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

main();
