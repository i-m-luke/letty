import { BaseDBNodeDAO } from "./BaseDBNodeDAO";
import type { Db as DB } from "mongodb";
import { FolderSchema, type Folder, type NewFolder } from "$types";

export default class PromptFoldersDAO extends BaseDBNodeDAO<Folder, NewFolder> {
  constructor(db: DB) {
    super(db, "promptFolders", FolderSchema);
  }
}
