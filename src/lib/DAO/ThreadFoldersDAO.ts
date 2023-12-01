import BaseDAO from "./BaseDAO";
import type { Db as DB } from "mongodb";
import { FolderSchema, type Folder, type NewFolder } from "$types";

export default class ThreadFoldersDAO extends BaseDAO<Folder, NewFolder> {
  constructor(db: DB) {
    super(db, "threadFolders", FolderSchema);
  }
}
