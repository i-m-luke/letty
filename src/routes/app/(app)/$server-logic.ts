import type { ThreadData, PromptData } from "$types";
import type { RouteParams } from "./$types";
import { RequestType } from "./Request";
import type Request from "./Request";

export const handlePOST = (request: any, params: RouteParams) => {
  const { type } = checkRequest(request);
  switch (type) {
    case RequestType.Prompt:
      handlePostPromptReq(request.data as PromptData, params); // TODO: return created item
      break;
    case RequestType.Thread:
      handlePostThreadReq(request.data as ThreadData, params); // TODO: return created item
      break;
  }
};

export const handleDELETE = (request: any, params: RouteParams) => {
  const { type } = checkRequest(request);
  switch (type) {
    case RequestType.Prompt:
      handleDeletePromptReq(request.data as PromptData, params); // TODO: return item was removed successfully?
      break;
    case RequestType.Thread:
      handleDeleteThreadReq(request.data as ThreadData, params); // TODO: return item was removed successfully?
      break;
  }
};

export const checkRequest = (request: any): { type: RequestType } => {
  if (request.type === undefined) {
    throw new Error("Request didn't have mandatory property 'type'");
  }

  return { type: request.type };
};

// IMPURE CODE:

export const handlePostPromptReq = (data: PromptData, params: RouteParams) => {
  /* ... store some data */
  console.log("Prompt POST handled. Data: ", data);
};

export const handlePostThreadReq = (data: ThreadData, params: RouteParams) => {
  /* ... store some data */
  console.log("Thread POST handled. Data:", data);
};

// ... but accessing DB makes it also inpure, so whatever
export const handleDeletePromptReq = (data: PromptData, params: RouteParams) => {
  /* ... store some data */
  console.log("Prompt DELETE handled. Data: ", data);
};

export const handleDeleteThreadReq = (data: ThreadData, params: RouteParams) => {
  /* ... store some data */
  console.log("Thread DELETE handled. Data:", data);
};
