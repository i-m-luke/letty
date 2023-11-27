import type { Db as DB } from "mongodb";
import { PromptSchema, type Prompt, type NewPrompt } from "$types";
import BaseDAO from "./BaseDAO";

export default class PromptDAO extends BaseDAO<Prompt, NewPrompt> {
  constructor(db: DB) {
    super(db, "prompts");
  }

  async get(data: Partial<Prompt>): Promise<Prompt> {
    return PromptSchema.parse(
      this.convertDbItem(await this.collection.findOne({ data }))
    );
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

  async insert(data: NewPrompt): Promise<string> {
    return this.collection
      .insertOne(data)
      .then((res) => res.insertedId)
      .toString();
  }

  async update(id: string): Promise<void> {
    // todo ...
  }

  async delete(data: Prompt): Promise<boolean> {
    return this.collection.deleteOne({ data }).then((res) => res.acknowledged);
  }
}
