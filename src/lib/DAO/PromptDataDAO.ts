import type { Db as DB } from "mongodb";
import { PromptDataSchema, type DBItem, type PromptData } from "$types";
import BaseDAO from "./BaseDAO";

export default class PromptDataDAO extends BaseDAO<PromptData> {
  constructor(db: DB) {
    super(db, "prompts");
  }

  async getAll(): Promise<PromptData[]> {
    const data = (await this.collection.find({}).toArray()).map(this.convertDbItem);
    return data.map((data) => PromptDataSchema.parse(data));
  }

  async getById(id: string): Promise<PromptData> {
    const data = await this.collection.findOne({
      id: id,
    });
    return PromptDataSchema.parse(this.convertDbItem(data));
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
