import { PromptDOA, _MongoDB } from "$lib/DB.js";

const mongoDB = new _MongoDB();
const promptDOA = new PromptDOA(mongoDB);

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  return promptDOA.getById(params.id);
}
