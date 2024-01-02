import { json } from "@sveltejs/kit";
import { z } from "zod";
import type { PostFolder, Response as _Response } from "$types";
import { RequestType, DeleteRequestSchema, PostRequestSchema } from "./Request";
import type { DeleteRequest, DeleteRequestData, PostRequest } from "./Request";
import type { PostPrompt, PostThread } from "$types";
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

//#region IMPURE CODE:

export const POST = async ({ request }) =>
  json(await handlePOST(await transformPostRequest(request)));

const insertNewPromptToDB = async (data: PostPrompt) => {
  return await promptDAO.insert(data);
};

const insertNewThreadToDB = async (data: PostThread) => {
  return await threadDAO.insert(data);
};

const insertNewPromptFolderToDB = async (data: PostFolder) => {
  return await promptFoldersDAO.insert(data);
};

const insertNewThreadFolderToDB = async (data: PostFolder) => {
  return await threadFoldersDAO.insert(data);
};

//#endregion

// TODO: TEST
const handlePOST = async (request: PostRequest): Promise<_Response> => {
  return handlePostReq(request.data, getInsertToDbFn(request.type));
};

// TODO: TEST
const transformPostRequest = async (request: Request) =>
  PostRequestSchema.parse(await request.json());

// TODO: TEST
const handlePostReq = async <TInData, TOutData>(
  data: TInData,
  insertDataToDbFn: (data: TInData) => TOutData
): Promise<_Response> => {
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

  const entriesCheck = PostEntriesSchema.safeParse(data);

  if (!entriesCheck.success) {
    return {
      success: false,
      issues: entriesCheck.error.errors.map(({ path, message }) => ({
        type: path[0],
        message,
      })),
    };
  }

  return {
    success: true,
    data: await insertDataToDbFn(data),
  };
};

// TODO: TEST
const getInsertToDbFn = (requestType: RequestType) => {
  switch (requestType) {
    case RequestType.Prompt:
      return insertNewPromptToDB;
    case RequestType.Thread:
      return insertNewThreadToDB;
    case RequestType.ThreadFolder:
      return insertNewThreadFolderToDB;
    case RequestType.PromptFolder:
      return insertNewPromptFolderToDB;
    default:
      throw new Error(
        "Inavlid request type was passed. Passed request type: " + requestType
      );
  }
};

//#endregion

//#region DELETE

//#region IMPURE CODE:

export const DELETE = async ({ request }) =>
  json(await handleDELETE(await transformDeleteRequest(request)), {
    status: 201,
  });

const handleDELETE = async (request: DeleteRequest) => {
  const { type, data } = request;
  switch (type) {
    case RequestType.Prompt:
      deletePromptFromDB(data); // TODO: return item was removed successfully?
      break;
    case RequestType.Thread:
      deleteThreadFromDB(data); // TODO: return item was removed successfully?
      break;
    case RequestType.ThreadFolder:
      deleteThreadFolderFromDB(data); // TODO: return item was removed successfully?
      break;
    case RequestType.PromptFolder:
      deletePromptFolderFromDB(data); // TODO: return item was removed successfully?
      break;
    default:
      throw new Error("Error while handling POST request");
  }
};

const deletePromptFromDB = (data: DeleteRequestData) => {
  promptDAO.deleteById(data._id);
};

const deleteThreadFromDB = (data: DeleteRequestData) => {
  threadDAO.deleteById(data._id);
};

const deleteThreadFolderFromDB = (data: DeleteRequestData) => {
  threadFoldersDAO.deleteById(data._id);
};

const deletePromptFolderFromDB = (data: DeleteRequestData) => {
  promptFoldersDAO.deleteById(data._id);
};

//#endregion

// TODO: TEST
const transformDeleteRequest = async (request: Request) =>
  DeleteRequestSchema.parse(await request.json());

//#endregion
