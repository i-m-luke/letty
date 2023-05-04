import TheradDAO from "$lib/DOA/ThreadDOA";
import { _MongoDB } from "$lib/DB";

const _mongodb = new _MongoDB();
const threadDOA = new TheradDAO(_mongodb);

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  return {
    threadData: threadDOA.getById(params.id),
  };
}
