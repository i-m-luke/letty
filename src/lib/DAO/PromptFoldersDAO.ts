import { BaseDBNodeDAO } from "./BaseDBNodeDAO";
import type { Db as DB } from "mongodb";
import type { FolderData } from "$types";
import { FolderDataSchema, DBNodeSchemaWithData } from "$types";

export default class PromptFoldersDAO extends BaseDBNodeDAO<FolderData> {
  constructor(db: DB) {
    super(db, "promptFolders", DBNodeSchemaWithData(FolderDataSchema));
  }
}
