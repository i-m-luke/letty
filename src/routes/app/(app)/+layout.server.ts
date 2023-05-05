import type LayoutLoadData from "./LayoutLoadData";
import { redirect, json } from "@sveltejs/kit";
import db from "$db";
import PromptDAO from "$lib/DOA/PromptDAO";
import ThreadDOA from "$lib/DOA/ThreadDAO";

const promptDAO = new PromptDAO(db);
const threadDAO = new ThreadDOA(db);

let loggedIn = false;

// Návratný typ fce zajistí type safety
export async function load(): Promise<LayoutLoadData> {
  // Přesuntou do hooks.server.ts ??? Provádělo by se tak ale i na homepage :-/ ... homepage by se pak musela vyjmout z aplikace
  if (!loggedIn) {
    loggedIn = true; // LOL X-D
    throw redirect(307, "/app/login"); // TODO: Přidat správný status code
  }

  const promptDataCollection = promptDAO.getAll();
  const threadDataCollection = threadDAO.getAll();

  return {
    promptDataCollection: (await promptDataCollection).map((data) => {
      return { ...data, _id: String(data._id) };
    }),
    threadDataCollection: (await threadDataCollection).map((data) => {
      return { ...data, _id: String(data._id) };
    }),
  };
}
