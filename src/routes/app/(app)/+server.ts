import { json } from "@sveltejs/kit";
import { z } from "zod";
import type { Folder, NewFolder, Response as _Response } from "$types";
import { RequestType, DeleteRequestSchema, PostRequestSchema } from "./Request";
import type { DeleteRequest, DeleteRequestData, PostRequest } from "./Request";
import type { NewPrompt, NewThread, Prompt, Thread } from "$types";
import db from "$db";
import PromptDAO from "$lib/DAO/PromptDAO";
import TheradDAO from "$lib/DAO/ThreadDAO";
import ThreadFoldersDAO from "$lib/DAO/ThreadFoldersDAO";
import PromptFoldersDAO from "$lib/DAO/PromptFoldersDAO";
import { CreateDialogEntriesIssue } from "./(AppMainTree)/CreateDialogEntriesIssue";

const promptDAO = new PromptDAO(db);
const threadDAO = new TheradDAO(db);
const promptFoldersDAO = new PromptFoldersDAO(db);
const threadFoldersDAO = new ThreadFoldersDAO(db);

//#region POST

const PostEntriesSchema = z.object({
  name: z
    .string({
      errorMap: () => ({
        path: CreateDialogEntriesIssue.Name,
        message: "Name can't be empty",
      }),
    })
    .min(1),
});

export const POST = async ({ request }) =>
  json(await handlePOST(PostRequestSchema.parse(await request.json())));

const handlePOST = async (request: PostRequest): Promise<_Response> => {
  switch (request.type) {
    case RequestType.Prompt:
      return handlePostReq(request.data, handlePostPromptReqOnSuccess);
    case RequestType.Thread:
      return handlePostReq(request.data, handlePostThreadReqOnSuccess);
    case RequestType.ThreadFolder:
      return handlePostReq(request.data, handlePostThreadFolderReqOnSuccess);
    case RequestType.PromptFolder:
      return handlePostReq(request.data, handlePostPromptFolderReqOnSuccess);
    default:
      throw new Error("ERROR ON SERVER SIDE");
  }
};

const handlePostPromptReqOnSuccess = async (data: NewPrompt) => {
  return await promptDAO.insert(data);
};

const handlePostThreadReqOnSuccess = async (data: NewThread) => {
  return await threadDAO.insert(data);
};

const handlePostPromptFolderReqOnSuccess = async (data: NewFolder) => {
  return await promptFoldersDAO.insert(data);
};

const handlePostThreadFolderReqOnSuccess = async (data: NewFolder) => {
  return await threadFoldersDAO.insert(data);
};

const handlePostReq = async <TInData, TOutData>(
  data: TInData,
  onSuccessFn: (data: TInData) => TOutData
): Promise<_Response> => {
  const entriesCheck = PostEntriesSchema.safeParse(data);

  if (!entriesCheck.success) {
    return {
      success: false,
      issues: entriesCheck.error.errors.map(({ path, message }) => ({
        type: path[0],
        message,
      })), // NOTE: Bude musete být key-value, aby bylo možno vyhodnotit, jaká hodnota byla v dialogu chybně zadána
    };
  }

  return {
    success: true,
    data: await onSuccessFn(data),
  };
};

//#endregion

//#region DELETE

export const DELETE = async ({ request }) =>
  json(await handleDELETE(DeleteRequestSchema.parse(await request.json())), {
    status: 201,
  });

const handleDELETE = async (request: DeleteRequest) => {
  const { type, data } = request;
  switch (type) {
    case RequestType.Prompt:
      handleDeletePromptReq(data); // TODO: return item was removed successfully?
      break;
    case RequestType.Thread:
      handleDeleteThreadReq(data); // TODO: return item was removed successfully?
      break;
    case RequestType.ThreadFolder:
      handleDeleteThreadFolderReq(data); // TODO: return item was removed successfully?
      break;
    case RequestType.PromptFolder:
      handleDeletePromptFolderReq(data); // TODO: return item was removed successfully?
      break;
    default:
      throw new Error("Error while handling POST request");
  }
};

const handleDeletePromptReq = (data: DeleteRequestData) => {
  promptDAO.deleteById(data._id);
};

const handleDeleteThreadReq = (data: DeleteRequestData) => {
  threadDAO.deleteById(data._id);
};

const handleDeleteThreadFolderReq = (data: DeleteRequestData) => {
  threadFoldersDAO.deleteById(data._id);
};

const handleDeletePromptFolderReq = (data: DeleteRequestData) => {
  promptFoldersDAO.deleteById(data._id);
};

//#endregion
