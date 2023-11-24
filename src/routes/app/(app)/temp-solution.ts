import { z } from "zod";
import type { Request } from "./Request";
import { RequestSchema, RequestType } from "./Request";
import type { Response } from "./Response";
import { ResponseSchema } from "./Response";

import { NewPromptSchema, type NewPrompt, PromptSchema, type Prompt } from "$types";
import type { SafeResponse } from "./SafeResponse";
import { json } from "@sveltejs/kit";

// NOTE: ŘEŠENÍ PŘIPRAVENO V STASH !!!

// client-side >>

const fetchPOST = async <TResData>(
  req: Request,
  parseResDataFn: (obj: any) => TResData
): Promise<SafeResponse<TResData>> => {
  const res = ResponseSchema.parse(
    fetch("some/route", {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json().then((res) => res))
  );
  return res.success ? { ...res, data: parseResDataFn(res.data) } : { ...res };
};

const fetchPostPrompt = async (newPrompt: NewPrompt) =>
  fetchPOST({ type: RequestType.Prompt, data: newPrompt }, PromptSchema.parse);

const clientSide = () => {
  fetchPostPrompt({ parentId: "...id", name: "...name", text: "...text" }).then(
    (res) => {
      if (res.success) {
        // ... process data
      } else {
        // ... process issues
      }
    }
  );
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
    _id: "...id",
  };

  return entriesCheck.success
    ? { success: true, data: prompt }
    : {
        success: false,
        issues: entriesCheck.error.errors.map((err) => err.message),
      };
};
