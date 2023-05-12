// IMPURE CODE:

import { PostRequestType } from "./PostRequest";
import type PostRequest from "./PostRequest";
import { DeleteRequestType } from "./DeleteRequest";
import type DeleteRequest from "./DeleteRequest";

//#region  POST

export const fetchPOST = (type: PostRequestType) => async (data: any) => {
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

export const fetchPostThread = fetchPOST(PostRequestType.Thread);
export const fetchPostPrompt = fetchPOST(PostRequestType.Prompt);

//#endregion

//#region  DELETE

export const fetchDELETE = (type: DeleteRequestType) => async (data: any) => {
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

export const fetchDeleteThread = fetchDELETE(DeleteRequestType.Thread);
export const fetchDeletePrompt = fetchDELETE(DeleteRequestType.Prompt);

//#endregion
