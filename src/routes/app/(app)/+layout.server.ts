import type LayoutLoadData from "./LayoutLoadData";
import { redirect } from "@sveltejs/kit";
import { writable, type Writable } from "svelte/store";
import type { TreeNodeInfo, TreeNodeData } from "$lib/components/Tree";
import db from "$db";
import ThreadDOA from "$lib/DOA/ThreadDAO";
import ThreadFoldersDAO from "$lib/DOA/ThreadFoldersDAO";
import { transformToTreeInfo } from "$lib/transformers";
import type { FolderData } from "$types";

const threadFoldersDAO = new ThreadFoldersDAO(db);
const threadDAO = new ThreadDOA(db);

let loggedIn = false;

// Návratný typ fce zajistí type safety
export async function load(): Promise<LayoutLoadData> {
  // Přesuntou do hooks.server.ts ??? Provádělo by se tak ale i na homepage :-/ ... homepage by se pak musela vyjmout z aplikace
  if (!loggedIn) {
    loggedIn = true; // LOL X-D
    throw redirect(307, "/app/login"); // TODO: Přidat správný status code
  }

  const threadDataCollection = threadDAO.getAll();
  const threadFolders = threadFoldersDAO.getAll();

  const transformThreadData = (folderData: FolderData): TreeNodeData => {
    return;
  };

  const threadTreeInfo = transformToTreeInfo(threadFolders);

  // TODO: Prompt tree

  const promptTreeState: Writable<TreeNodeInfo[]> = writable([]);
  const threadTreeState: Writable<TreeNodeInfo[]> = writable([]);

  return {
    promptTreeState,
    threadTreeState,
  };
}
