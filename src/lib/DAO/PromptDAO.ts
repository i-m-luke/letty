import type { Db as DB } from "mongodb";
import { PromptSchema, type Prompt } from "$types";
import BaseDAO from "./BaseDAO";

export default class PromptDAO extends BaseDAO<Prompt> {
  constructor(db: DB) {
    super(db, "prompts");
  }

  async getAll(): Promise<Prompt[]> {
    const data = (await this.collection.find({}).toArray()).map(this.convertDbItem);
    return data.map((data) => PromptSchema.parse(data));
  }

  async getById(id: string): Promise<Prompt> {
    const data = await this.collection.findOne({
      id: id,
    });
    return PromptSchema.parse(this.convertDbItem(data));
  }

  async insert(data: Prompt): Promise<void> {
    // todo: return id ??
  }

  async update(data: Prompt): Promise<void> {
    // todo: chybí id
  }

  async delete(data: Prompt): Promise<void> {
    // todo: chybí id
  }
}
