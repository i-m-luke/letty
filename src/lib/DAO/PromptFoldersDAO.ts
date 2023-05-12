import { BaseDBNodeDAO } from "./BaseDBNodeDAO";
import type { Db as DB } from "mongodb";
import type { FolderData, DBNode } from "$types";

export default class PromptFoldersDAO extends BaseDBNodeDAO<FolderData> {
  constructor(db: DB) {
    super(db, "promptFolders");
  }

  async insert(data: DBNode<FolderData>): Promise<void> {
    // todo: return id ??
  }

  async update(data: DBNode<FolderData>): Promise<void> {
    // todo: chybí id
  }

  async delete(data: DBNode<FolderData>): Promise<void> {
    // todo: chybí id
  }
}