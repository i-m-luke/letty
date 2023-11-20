import { json } from "@sveltejs/kit";
import { PostDataValidator, type PostData } from "./PostData";
import type { PromptInfo } from "$types";
import { v4 as uuid } from "uuid";

// import { db, PromptDataDOA } from "$db"
// const promptDataDOA = new PromptDataDOA(db);

// VYTVOŘENÍ PROMPTU
export async function POST({ request }) {
  const data: PostData = PostDataValidator.parse(await request.json());
  const promptInfo: PromptInfo = {
    id: uuid(),
    parentId: data.parentId,
    name: data.promptName,
    prompt: data.prompt,
  };

  // promptDataDOA.insertOne(promptInfo);

  return json(promptInfo, { status: 201 });
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
