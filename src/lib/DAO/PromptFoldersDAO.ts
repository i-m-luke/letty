import BaseDAO from "./BaseDAO";
import type { Db as DB } from "mongodb";
import { FolderSchema, type Folder, type PostFolder } from "$types";

export default class PromptFoldersDAO extends BaseDAO<Folder, PostFolder> {
  constructor(db: DB) {
    super(db, "promptFolders", FolderSchema);
  }
}
