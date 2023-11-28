import { BaseDBNodeDAO } from "./BaseDBNodeDAO";
import type { Db as DB } from "mongodb";
import { FolderDBNodeSchema, type Folder } from "$types";

export default class PromptFoldersDAO extends BaseDBNodeDAO<Folder> {
  constructor(db: DB) {
    super(db, "promptFolders", FolderDBNodeSchema);
  }
}
