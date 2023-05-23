// IMPURE CODE:

import { PostRequestType } from "./PostRequest";
import type PostRequest from "./PostRequest";
import { DeleteRequestType } from "./DeleteRequest";
import type DeleteRequest from "./DeleteRequest";
import type { PromptData, ThreadData } from "$types";

//#region  POST

export const fetchPOST =
  <TData>(type: PostRequestType) =>
  async (data: TData) => {
    const req: PostRequest = {
      type,
      data,
    };
    return await fetch(`/app/`, {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

export const fetchPostThread = fetchPOST<ThreadData>(PostRequestType.Thread);
export const fetchPostPrompt = fetchPOST<PromptData>(PostRequestType.Prompt);

//#endregion

//#region  DELETE

export const fetchDELETE =
  <TData>(type: DeleteRequestType) =>
  async (data: TData) => {
    const req: DeleteRequest = {
      type,
      data,
    };
    return await fetch(`/app/`, {
      method: "DELETE",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

export const fetchDeleteThread = fetchDELETE<ThreadData>(DeleteRequestType.Thread);
export const fetchDeletePrompt = fetchDELETE<PromptData>(DeleteRequestType.Prompt);

//#endregion
