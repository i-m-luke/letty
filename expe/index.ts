import { log } from "./logging"; // facade pattern
import { ZodError, z } from "zod";

import {
  sendMessage,
  ContextMessage,
  SendMessageResult,
  sendSingleMessage,
  sendMessageWithContext,
} from "./ai-interface";

// MAIN:
(() => {
  while (true) {
    console.log("print:", { prop: "sss" }, { propA: "bbbb" });
    // Person.ts
    type User = {
      id: string;
      name: string;
      email: string | null;
      phoneNumber?: string;
    };
    type UserWithoutId = Omit<User, "id">;
    type UserContactInfo = Pick<User, "email" | "phoneNumber">;

    const request = { data: {} };
    const json = (obj: {}) => {};

    const PersonValidator = z.object({
      id: z.string(),
      age: z.number(),
    });

    type Person = z.infer<typeof PersonValidator>;

    // client.ts

    // ... parse
    try {
      const validatedPerson = PersonValidator.parse(json(request.data));
    } catch (error) {
      if (error instanceof ZodError) {
        // ...
      }
    }

    // ... safeParse
    const validatedPerson = PersonValidator.safeParse(json(request.data));
    if (!validatedPerson.success) {
      // ... validatedPerson.data;
      validatedPerson.error;
    }
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
