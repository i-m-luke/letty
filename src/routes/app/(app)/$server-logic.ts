import type { ThreadData, PromptData } from "$types";
import type { RouteParams } from "./$types";
import type PostRequest from "./PostRequest";
import { PostRequestType } from "./PostRequest";
import type DeleteRequest from "./DeleteRequest";
import { DeleteRequestType } from "./DeleteRequest";

export const handlePOST = (request: PostRequest, params: RouteParams) => {
  const { type, data } = request;
  switch (type) {
    case PostRequestType.Prompt:
      handlePostPromptReq(data as PromptData, params); // TODO: return
      break;
    case PostRequestType.Thread:
      handlePostThreadReq(data as ThreadData, params); // TODO: return
      break;
  }
};

export const handleDELETE = (request: DeleteRequest, params: RouteParams) => {
  const { type, data } = request;
  switch (type) {
    case DeleteRequestType.Prompt:
      handleDeletePromptReq(data as PromptData, params); // TODO: return
      break;
    case DeleteRequestType.Thread:
      handleDeleteThreadReq(data as ThreadData, params); // TODO: return
      break;
  }
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
