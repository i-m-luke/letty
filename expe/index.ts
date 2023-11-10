import { log } from "./logging"; // facade pattern

import {
  sendMessage,
  ContextMessage,
  SendMessageResult,
  sendSingleMessage,
  sendMessageWithContext,
} from "./ai-interface";

class TreeNodeInfo {
  type: "folder" | "content";
  constructor(type: "folder" | "content") {
    this.type = type;
  }
}

class ContentTreeNodeInfo extends TreeNodeInfo {
  constructor() {
    super("content");
  }
}

class FolderTreeNodeInfo extends TreeNodeInfo {
  contentNodes: string[];
  constructor() {
    super("folder");
    this.contentNodes = [];
  }
}

const node = new FolderTreeNodeInfo();
switch (node.type) {
  case "content":
    node.contentNodes;
}

type Successfull = {
  type: "Successfull";
  data: {};
};

type Error = {
  type: "Error";
  errorMessage: string;
};

type State = Successfull | Error;

const switchFn = (some: State) => {
  switch (some.type) {
    case "Successfull":
      some.data;
      break;
    case "Error":
      some.errorMessage;
      some.data; // Vypíše error, jelikož data existuje pouze při type === Successfull
      break;
  }
};

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
