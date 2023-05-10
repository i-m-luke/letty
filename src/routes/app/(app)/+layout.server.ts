import type LayoutServerLoadData from "./LayoutServerLoadData";
import db from "$db";
import ThreadDAO from "$lib/DAO/ThreadDAO";
import PromptDAO from "$lib/DAO/PromptDAO";
import ThreadFoldersDAO from "$lib/DAO/ThreadFoldersDAO";
import PromptFoldersDAO from "$lib/DAO/PromptFoldersDAO";

const threadDAO = new ThreadDAO(db);
const promptDAO = new PromptDAO(db);
const threadFoldersDAO = new ThreadFoldersDAO(db);
const promptFoldersDAO = new PromptFoldersDAO(db);

// Návratný typ fce zajistí type safety
export async function load(): Promise<LayoutServerLoadData> {
  const threadDataProm = threadDAO.getAll();
  const promptDataProm = promptDAO.getAll();
  const threadFoldersProm = threadFoldersDAO.getAll();
  const promptFoldersProm = promptFoldersDAO.getAll();

  return {
    threadData: (await threadDataProm).map((data) => {
      return { ...data, _id: String(data._id) };
    }),
    promptData: (await promptDataProm).map((data) => {
      return { ...data, _id: String(data._id) };
    }),
    threadFolders: (await threadFoldersProm).map((folder) => {
      return { ...folder, _id: String(folder._id) };
    }),
    promptFolders: (await promptFoldersProm).map((folder) => {
      return { ...folder, _id: String(folder._id) };
    }),
  };
}
