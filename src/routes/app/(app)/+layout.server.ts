import type LayoutLoadData from "./LayoutLoadData";
import { redirect } from "@sveltejs/kit";
import db from "$db";
import PromptDOA from "$lib/DOA/PromptDOA";
import ThreadDOA from "$lib/DOA/ThreadDOA";

const promptDOA = new PromptDOA(db);
const threadDOA = new ThreadDOA(db);

let loggedIn = false;

// Návratný typ fce zajistí type safety
export async function load(): Promise<LayoutLoadData> {
  if (!loggedIn) {
    loggedIn = true; // LOL X-D
    throw redirect(307, "/app/login"); // TODO: Přidat správný status code
  }

  const promptDataCollection = await promptDOA.getAll();
  const threadDataCollection = await threadDOA.getAll();

  return {
    promptDataCollection,
    threadDataCollection,
  };
}
