import { json } from "@sveltejs/kit";
import type { RouteParams } from "./$types";
import { RequestType, RequestSchema, type RequestData } from "./Request";
import type { PromptData, ThreadData } from "$types";

export const handlePOST = (request: any, params: RouteParams) => {
  const { type, data } = RequestSchema.parse(request);
  switch (type) {
    case RequestType.Prompt:
      return json(handlePostPromptReq(data, params)); // TODO: return created item
    case RequestType.Thread:
      return json(handlePostThreadReq(data, params)); // TODO: return created item
    default:
      throw new Error("Error while handling POST request");
  }
};

export const handleDELETE = (request: any, params: RouteParams) => {
  const { type, data } = RequestSchema.parse(request);
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

export const handlePostPromptReq = (
  data: RequestData,
  params: RouteParams
): PromptData => {
  /* ... store some data */
  console.log("Prompt POST handled. Data: ", data);
  return { name: "TODO", _id: "TODO", prompt: "TODO" };
};

export const handlePostThreadReq = (
  data: RequestData,
  params: RouteParams
): ThreadData => {
  /* ... store some data */
  console.log("Thread POST handled. Data:", data);
  return { _id: "TODO", name: "TODO", messages: [] };
};

// ... but accessing DB makes it also inpure, so whatever
export const handleDeletePromptReq = (data: RequestData, params: RouteParams) => {
  /* ... store some data */
  console.log("Prompt DELETE handled. Data: ", data);
};

export const handleDeleteThreadReq = (data: RequestData, params: RouteParams) => {
  /* ... store some data */
  console.log("Thread DELETE handled. Data:", data);
};
