import { json } from "@sveltejs/kit";
import type { RouteParams } from "./$types";
import type { Response as _Response } from "$types";
import {
  RequestType,
  DeleteRequestSchema,
  PostRequestSchema,
  type PostRequest,
} from "./Request";
import type { DeleteRequest, DeleteRequestData } from "./Request";
import {
  NewPromptSchema,
  type NewPrompt,
  type Prompt,
  type NewThread,
  type Thread,
  NewThreadSchema,
} from "$types";
import { z } from "zod";

export const POST = async ({ request }) =>
  json(handlePOST(PostRequestSchema.parse(await request.json())));

export async function DELETE({ request, params }) {
  handleDELETE(DeleteRequestSchema.parse(await request.json()), params);
  return json({}, { status: 201 });
}

const handlePOST = (request: PostRequest): _Response => {
  switch (request.type) {
    case RequestType.Prompt:
      return handlePostPromptReq(request.data);
    case RequestType.Thread:
      return handlePostThreadReq(request.data);
    default:
      throw new Error("ERROR ON SERVER SIDE");
  }
};

const handleDELETE = (request: DeleteRequest, params: RouteParams) => {
  const { type, data } = request;
  switch (type) {
    case RequestType.Prompt:
      handleDeletePromptReq(data, params); // TODO: return item was removed successfully?
      break;
    case RequestType.Thread:
      handleDeleteThreadReq(data, params); // TODO: return item was removed successfully?
      break;
    default:
      throw new Error("Error while handling POST request");
  }
};

// IMPURE CODE:

const NewPromptEntriesSchema = NewPromptSchema.omit({ name: true }).extend({
  name: z.string().min(1),
});

const handlePostPromptReq = (data: NewPrompt): _Response => {
  const newPrompt = NewPromptSchema.parse(data); // object shape check
  const entriesCheck = NewPromptEntriesSchema.safeParse(newPrompt);

  // ... some DB stuff
  const prompt: Prompt = {
    ...newPrompt,
    _id: "...id",
    text: "",
  };

  console.log("Prompt POST handled. Data: ", data);
  return entriesCheck.success
    ? { success: true, data: prompt }
    : {
        success: false,
        issues: entriesCheck.error.errors.map((err) => err.message),
      };
};

const NewThreadEntriesSchema = NewThreadSchema.omit({ name: true }).extend({
  name: z.string().min(1),
});

const handlePostThreadReq = (data: NewThread): _Response => {
  const newThread = NewThreadSchema.parse(data); // object shape check
  const entriesCheck = NewThreadEntriesSchema.safeParse(newThread);

  // ... some DB stuff
  const thread: Thread = {
    ...newThread,
    _id: "...id",
    messages: [],
  };

  console.log("Thread POST handled. Data:", data);
  return entriesCheck.success
    ? { success: true, data: thread }
    : {
        success: false,
        issues: entriesCheck.error.errors.map((err) => err.message),
      };
};

// ... but accessing DB makes it also inpure, so whatever
const handleDeletePromptReq = (data: DeleteRequestData, params: RouteParams) => {
  /* ... store some data */
  console.log("Prompt DELETE handled. Data: ", data);
};

const handleDeleteThreadReq = (data: DeleteRequestData, params: RouteParams) => {
  /* ... store some data */
  console.log("Thread DELETE handled. Data:", data);
};
