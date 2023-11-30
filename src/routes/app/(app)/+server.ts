import { json } from "@sveltejs/kit";
import { z } from "zod";
import type { Folder, NewFolder, Response as _Response } from "$types";
import { RequestType, DeleteRequestSchema, PostRequestSchema } from "./Request";
import type { DeleteRequest, DeleteRequestData, PostRequest } from "./Request";
import type { PostNewPrompt, PostNewThread, Prompt, Thread } from "$types";
import db from "$db";
import PromptDAO from "$lib/DAO/PromptDAO";
import TheradDAO from "$lib/DAO/ThreadDAO";
import ThreadFoldersDAO from "$lib/DAO/ThreadFoldersDAO";
import PromptFoldersDAO from "$lib/DAO/PromptFoldersDAO";

const promptDAO = new PromptDAO(db);
const threadDAO = new TheradDAO(db);
const promptFoldersDAO = new PromptFoldersDAO(db);
const threadFoldersDAO = new ThreadFoldersDAO(db);

export const POST = async ({ request }) =>
  json(await handlePOST(PostRequestSchema.parse(await request.json())));

export const DELETE = async ({ request }) =>
  json(await handleDELETE(DeleteRequestSchema.parse(await request.json())), {
    status: 201,
  });

const handlePOST = async (request: PostRequest): Promise<_Response> => {
  switch (request.type) {
    case RequestType.Prompt:
      return handlePostPromptReq(request.data);
    case RequestType.Thread:
      return handlePostThreadReq(request.data);
    case RequestType.ThreadFolder:
      return handlePostThreadFolder(request.data);
    case RequestType.PromptFolder:
      return handlePostPromptFolder(request.data);
    default:
      throw new Error("ERROR ON SERVER SIDE");
  }
};

const handleDELETE = async (request: DeleteRequest) => {
  const { type, data } = request;
  switch (type) {
    case RequestType.Prompt:
      handleDeletePromptReq(data); // TODO: return item was removed successfully?
      break;
    case RequestType.Thread:
      handleDeleteThreadReq(data); // TODO: return item was removed successfully?
      break;
    default:
      throw new Error("Error while handling POST request");
  }
};

// IMPURE CODE:
const NewPromptEntriesSchema = z.object({ name: z.string().min(1) });
const handlePostPromptReq = async (data: PostNewPrompt): Promise<_Response> => {
  const entriesCheck = NewPromptEntriesSchema.safeParse(data);

  if (!entriesCheck.success) {
    return {
      success: false,
      issues: entriesCheck.error.errors.map((err) => err.message), // NOTE: Bude musete být key-value, aby bylo možno vyhodnotit, jaká hodnota byla v dialogu chybně zadána
    };
  }

  const { parentId, ...newPrompt } = data;
  const prompt: Prompt = await promptDAO.insert(newPrompt);
  promptFoldersDAO.addItem(data.parentId, prompt._id);

  return { success: true, data: prompt };
};

const NewThreadEntriesSchema = z.object({ name: z.string().min(1) });

const handlePostThreadReq = async (data: PostNewThread): Promise<_Response> => {
  const entriesCheck = NewThreadEntriesSchema.safeParse(data);

  if (!entriesCheck.success) {
    return {
      success: false,
      issues: entriesCheck.error.errors.map((err) => err.message), // NOTE: Bude musete být key-value, aby bylo možno vyhodnotit, jaká hodnota byla v dialogu chybně zadána
    };
  }

  const { parentId, ...newThread } = data;
  const thread: Thread = await threadDAO.insert(newThread);
  threadFoldersDAO.addItem(data.parentId, thread._id);

  return { success: true, data: thread };
};

const handlePostThreadFolder = async (data: NewFolder): Promise<_Response> => {
  console.log("TODO: handlePostThreadFolder");
  const folder: Folder = {
    _id: "TODO",
    parentId: "TODO",
    data: {
      name: data.data.name,
      itemsIds: [],
    },
  };
  return {
    success: true,
    data: folder,
  };
};

const handlePostPromptFolder = async (data: NewFolder): Promise<_Response> => {
  console.log("TODO: handlePostPromptFolder");
  const folder: Folder = {
    _id: "TODO",
    parentId: "TODO",
    data: {
      name: data.data.name,
      itemsIds: [],
    },
  };
  return {
    success: true,
    data: folder,
  };
};

const handleDeletePromptReq = (data: DeleteRequestData) => {
  promptDAO.deleteById(data._id);
  promptFoldersDAO.removeItem(data.parentId, data._id);
};

const handleDeleteThreadReq = (data: DeleteRequestData) => {
  threadDAO.deleteById(data._id);
  threadFoldersDAO.removeItem(data.parentId, data._id);
};
