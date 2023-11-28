import { BaseDBNodeDAO } from "./BaseDBNodeDAO";
import type { Db as DB } from "mongodb";
import { DBNodeSchemaWithData, FolderDataSchema, type FolderData } from "$types";

export default class ThreadFoldersDAO extends BaseDBNodeDAO<FolderData> {
  constructor(db: DB) {
    super(db, "threadFolders", DBNodeSchemaWithData(FolderDataSchema));
  }
}
