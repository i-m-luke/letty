import { json } from "@sveltejs/kit";
import { z } from "zod";
import type { RouteParams } from "./$types";
import type { Response as _Response } from "$types";
import { RequestType, DeleteRequestSchema, PostRequestSchema } from "./Request";
import type { DeleteRequest, DeleteRequestData, PostRequest } from "./Request";
import { NewPromptSchema, NewThreadSchema } from "$types";
import type { NewPrompt, Prompt, NewThread, Thread } from "$types";
import db from "$db";
import PromptDAO from "$lib/DAO/PromptDAO";
import TheradDAO from "$lib/DAO/ThreadDAO";

const promptDAO = new PromptDAO(db);
const threadDAO = new TheradDAO(db);

export const POST = async ({ request }) =>
  json(await handlePOST(PostRequestSchema.parse(await request.json())));

export const DELETE = async ({ request, params }) =>
  json(await handleDELETE(DeleteRequestSchema.parse(await request.json()), params), {
    status: 201,
  });

const handlePOST = async (request: PostRequest): Promise<_Response> => {
  switch (request.type) {
    case RequestType.Prompt:
      return handlePostPromptReq(request.data);
    case RequestType.Thread:
      return handlePostThreadReq(request.data);
    default:
      throw new Error("ERROR ON SERVER SIDE");
  }
};

const handleDELETE = async (request: DeleteRequest, params: RouteParams) => {
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

const handlePostPromptReq = async (data: NewPrompt): Promise<_Response> => {
  const newPrompt = NewPromptSchema.parse(data); // object shape check
  const entriesCheck = NewPromptEntriesSchema.safeParse(newPrompt);

  // ... some DB stuff
  const prompt: Prompt = await promptDAO.insert(data);
  // TODO: Add prompt ID to promptFolders (promptFoldersDAO.update will update data.itemsIds)

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

const handlePostThreadReq = async (data: NewThread): Promise<_Response> => {
  const newThread = NewThreadSchema.parse(data); // object shape check
  const entriesCheck = NewThreadEntriesSchema.safeParse(newThread);

  // ... some DB stuff
  const thread: Thread = await threadDAO.insert(data);
  // TODO: Add thread ID to threadFolders (threadFoldersDAO.update will update data.itemsIds)

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
