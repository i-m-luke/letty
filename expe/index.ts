import { log } from "./logging"; // facade pattern

import {
  sendMessage,
  ContextMessage,
  SendMessageResult,
  sendSingleMessage,
  sendMessageWithContext,
} from "./ai-interface";

class Data {
  strProp: string;
  numProp: number;
  constructor(strProp: string, numProp: number) {
    this.strProp = strProp;
    this.numProp = numProp;
  }
}

const clientSideFn = () => {};

let reqData = {};
let resData = {};
const fakeAPI = {
  sendReq: (data: any) => {
    reqData = data;
  },
  getReq: () => reqData,
  sendRes: (data: any) => {
    resData = data;
  },
  getRes: () => resData,
};

const serverSideFn = () => {};

const checkObjectType = <TDataType extends object>(
  object: any,
  testObject: TDataType
) => {
  const objectEntries = Object.entries(object);
  for (const [testKey, testValue] of Object.entries(testObject)) {
    if (
      objectEntries.find(([key, value]) => {
        return key === testKey && typeof value === typeof testValue;
      }) === undefined
    ) {
      return false;
    }
  }

  return true;
};

const convert = <TType>(obj: any) => {
  const converted = obj as TType;
  console.log(converted);
  return converted;
};

// MAIN:
(() => {
  while (true) {
    console.log(checkObjectType<Data>({ prop: ".." }, new Data("", 0)));
    console.log(checkObjectType<Data>(new Data("", 0), new Data("", 0)));
    const obj: Data = convert<Data>({ someProp: "" });
    console.log("obj:" + obj);
    console.log(obj.numProp);
    console.log(obj.strProp);
  }
})();

debugger;

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
