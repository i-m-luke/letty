import { json } from "@sveltejs/kit";
import type { RouteParams } from "./$types";
import {
  RequestType,
  DeleteRequestSchema,
  PostRequestSchema,
} from "./Request";
import type { PostRequestData, DeleteRequest, DeleteRequestData } from "./Request";
import type { PromptData, ThreadData } from "$types";
import { z } from "zod";

export async function POST({ request, params }) {
  // const parseResult = RequestSchema.safeParse(await request.json());
  // if (!parseResult.success) {
  //   return json({ issues: parseResult.error.issues }); // problém při validaci (např. nezadané jméno)
  // }
  // const { type, data } = parseResult.data;

  const { type, data } = PostRequestSchema.parse(await request.json());

  switch (type) {
    case RequestType.Prompt:
      return json(handlePostPromptReq(data, params)); // TODO: return created item
    case RequestType.Thread:
      return json(handlePostThreadReq(data, params)); // TODO: return created item
    default:
      throw new Error("Error while handling POST request");
  }
}

export async function DELETE({ request, params }) {
  handleDELETE(DeleteRequestSchema.parse(await request.json()), params);
  return json({}, { status: 201 });
}

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

const handlePostPromptReq = (
  data: PostRequestData,
  params: RouteParams
): PromptData => {
  /* ... store some data */
  console.log("Prompt POST handled. Data: ", data);
  const dataSchema = z.object({});

  return { name: "TODO", _id: "TODO", prompt: "TODO" };
};

const handlePostThreadReq = (
  data: PostRequestData,
  params: RouteParams
): ThreadData => {
  /* ... store some data */
  console.log("Thread POST handled. Data:", data);
  return { _id: "TODO", name: "TODO", messages: [] };
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
