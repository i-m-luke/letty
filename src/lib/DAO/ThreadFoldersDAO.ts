import BaseDAO from "./BaseDAO";
import type { Db as DB } from "mongodb";
import { Folder, type Folder, type PostFolder } from "$types";

export default class ThreadFoldersDAO extends BaseDAO<Folder, PostFolder> {
  constructor(db: DB) {
    super(db, "threadFolders", Folder);
  }
}
