import type { Db as DB } from "mongodb";
import type { DBItem, PromptData } from "$types";
import BaseDAO from "./BaseDAO";

export default class TheradDAO extends BaseDAO<PromptData> {
  constructor(db: DB) {
    super(db, "prompts");
  }

  async getAll(): Promise<PromptData[]> {
    const data = (await this.collection
      .find({})
      .toArray()) as DBItem<PromptData>[];
    return data.map((data) => data as PromptData);
  }

  async getById(id: string): Promise<PromptData> {
    const data = (await this.collection.findOne({
      id: id,
    })) as DBItem<PromptData>;
    return data as PromptData;
  }

  async insert(data: PromptData): Promise<void> {
    // todo: return id ??
  }

  async update(data: PromptData): Promise<void> {
    // todo: chybí id
  }

  async delete(data: PromptData): Promise<void> {
    // todo: chybí id
  }
}
