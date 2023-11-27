import { json } from "@sveltejs/kit";
import { PostRequestSchema, type PostRequest } from "./PostRequest";
import type { Prompt } from "$types";
import { v4 as uuid } from "uuid";

// import { db, PromptDataDOA } from "$db"
// const promptDataDOA = new PromptDataDOA(db);

// VYTVOŘENÍ PROMPTU
export async function POST({ request }) {
  const data: PostRequest = PostRequestSchema.parse(await request.json());
  const prompt: Prompt = {
    _id: uuid(),
    name: data.promptName,
    text: data.text,
  };

  // promptDataDOA.insertOne(promptInfo);

  return json(prompt, { status: 201 });
}

// EDITACE PROMPTU
export async function PUT() {
  return new Response();
}

// SMAZÁNÍ PROMPTU
export async function DELETE() {
  return new Response();
}

// ZÍSKÁNÍ PROMPTU (momentálně je řešeno skrze klik na uzel stromu pomocí goto)
export async function GET() {
  return new Response();
}
