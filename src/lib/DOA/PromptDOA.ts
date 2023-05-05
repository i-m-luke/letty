import type { Db as DB } from "mongodb";
import type { PromptData, DBNode } from "$types";
import { BaseDBNodeDOA } from "./BaseDBNodeDAO";

export default class PromptDOA extends BaseDBNodeDOA<PromptData> {
  constructor(db: DB) {
    super(db, "prompts");
  }

  async insert(data: DBNode<PromptData>): Promise<void> {
    // todo: return id ??
  }

  async update(data: DBNode<PromptData>): Promise<void> {
    // todo: chybí id
  }

  async delete(data: DBNode<PromptData>): Promise<void> {
    // todo: chybí id
  }
}
