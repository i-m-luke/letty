import type { Db as DB } from "mongodb";
import { ThreadSchema, type Thread } from "$types";
import BaseDAO from "./BaseDAO";

export default class TheradDAO extends BaseDAO<Thread> {
  constructor(db: DB) {
    super(db, "threads");
  }

  async getAll(): Promise<Thread[]> {
    const data = (await this.collection.find({}).toArray()).map(this.convertDbItem);
    return data.map((data) => ThreadSchema.parse(data));
  }

  async getById(id: string): Promise<Thread> {
    const data = await this.collection.findOne({
      id: id,
    });
    return ThreadSchema.parse(this.convertDbItem(data));
  }

  async insert(data: Thread): Promise<void> {
    // todo: return id ??
  }

  async update(data: Thread): Promise<void> {
    // todo: chybí id
  }

  async delete(data: Thread): Promise<void> {
    // todo: chybí id
  }
}
