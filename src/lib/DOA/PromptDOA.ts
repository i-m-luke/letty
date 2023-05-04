import type { Db as DB } from "mongodb";
import BaseDAO from "./BaseDAO";
import type { PromptData, DBNode } from "$types";

export default class PromptDOA extends BaseDAO<DBNode<PromptData>> {
  constructor(db: DB) {
    super(db, "prompts");
  }

  async getAll(): Promise<DBNode<PromptData>[]> {
    const data: unknown[] = await this.collection.find({}).toArray();
    return data.map((data) => data as DBNode<PromptData>);
  }

  async getById(id: string): Promise<DBNode<PromptData>> {
    const data: unknown = this.collection.find({ id: id });
    return data as DBNode<PromptData>;
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
