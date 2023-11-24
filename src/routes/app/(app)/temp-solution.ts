import { z } from "zod";
import type { Request } from "./Request";
import { RequestSchema, RequestType } from "./Request";
import type { Response } from "./Response";
import { ResponseSchema } from "./Response";

import { NewPromptSchema, type NewPrompt, PromptSchema, type Prompt } from "$types";
import type { SafeResponse } from "./SafeResponse";
import { json } from "@sveltejs/kit";

// client-side >>

const fetchPOST = async <TResData>(
  req: Request,
  parseReqDataFn: (obj: any) => TResData
): Promise<SafeResponse<TResData>> => {
  const res = fetch("some/route", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json().then((res) => res));
  const parsedRes = ResponseSchema.parse(res);
  return parsedRes.success
    ? { ...parsedRes, data: parseReqDataFn(parsedRes.data) }
    : { ...parsedRes };
};

const fetchPostPrompt = async (newPrompt: NewPrompt) =>
  fetchPOST({ type: RequestType.Prompt, data: newPrompt }, PromptSchema.parse);

const clientSide = () => {
  const res = ResponseSchema.parse(
    fetchPostPrompt({ parentId: "...id", name: "...name", text: "...text" }).then(
      (res) => res
    )
  );

  if (res.success) {
    // ... process data
  } else {
    // ... display issues
  }
};

// server-side >>
// +server.ts

export const POST = (request: any) =>
  json(handleRequest(RequestSchema.parse(request)));

const handleRequest = (request: Request): Response => {
  switch (request.type) {
    case RequestType.Prompt:
      return handlePromptRequest(request.data);
    // case RequestType.Thread: ...
  }

  throw new Error("ERROR ON SERVER SIDE");
};

const NewPromptEntriesSchema = NewPromptSchema.omit({ name: true }).extend({
  name: z.string().min(1),
});

const handlePromptRequest = (data: NewPrompt): SafeResponse<NewPrompt> => {
  const newPrompt = NewPromptSchema.parse(data); // object shape check
  const entriesCheck = NewPromptEntriesSchema.safeParse(newPrompt);

  // ... some DB stuff
  const prompt: Prompt = {
    ...data,
    id: "...id",
  };

  return entriesCheck.success
    ? { success: true, data: prompt }
    : { success: false, error: "...", issues: [] };
};
