import { log } from "./logging"; // facade pattern

import {
  sendMessage,
  ContextMessage,
  SendMessageResult,
  sendSingleMessage,
  sendMessageWithContext,
} from "./ai-interface";

class Target extends EventTarget {
  constructor() {
    super();
  }

  _onCanceled: (e: Event) => void = (e: Event) => {};
  set onCanceled(value: (e: Event) => void) {
    this.removeEventListener("A", this._onCanceled);
    this._onCanceled = value;
    this.addEventListener("A", this._onCanceled);
  }

  _onConfirmed: (e: Event) => void = (e: Event) => {};
  set onConfirmed(value: (e: Event) => void) {
    this.removeEventListener("A", this._onConfirmed);
    this._onConfirmed = value;
    this.addEventListener("A", this._onConfirmed);
  }

  execute01() {
    return {
      a: new Promise<unknown>((resolve) => {
        this.addEventListener("A", (value: unknown) => {
          resolve(value);
        });
      }),
      b: new Promise<unknown>((resolve) => {
        this.addEventListener("B", (value: unknown) => {
          resolve(value);
        });
      }),
    };
  }

  execute02() {
    const { signal: signalA, abort: abortA } = new AbortController();
    const { signal: signalB, abort: abortB } = new AbortController();
    this.addEventListener(
      "A",
      () => {
        console.log("A triggered");
        console.log(signalB.aborted);
        abortB();
      },
      { once: true, signal: signalA }
    );
    this.addEventListener(
      "B",
      () => {
        if (!signalB.aborted) {
          console.log("B triggered");
          abortA();
        }
      },
      { once: true, signal: signalB }
    );
  }

  execute03() {
    this.onCanceled = (e: Event) => console.log("A");
    this.onConfirmed = (e: Event) => console.log("B");
  }
}

const target = new Target();
target.execute03();
target.dispatchEvent(new Event("A"));
target.execute03();
target.dispatchEvent(new Event("B"));

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
