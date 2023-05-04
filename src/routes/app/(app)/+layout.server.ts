import type LayoutLoadData from "./LayoutLoadData";
import { redirect, json } from "@sveltejs/kit";
import db from "$db";
import { ObjectId } from "mongodb";
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

  const promptDataCollection = promptDOA.getAll();
  const threadDataCollection = threadDOA.getAll();

  // NOTE: Nejsou navracena žádná data ... :-/ ... strom je prázdný
  return {
    promptDataCollection: (await promptDataCollection).map((data) => {
      return { ...data, _id: String(data._id) };
    }),
    threadDataCollection: (await threadDataCollection).map((data) => {
      return { ...data, _id: String(data._id) };
    }),
  };
}
