import type { Db as DB } from "mongodb";
import { type ThreadData, type DBNode, type DBItem, ThreadDataSchema } from "$types";
import BaseDAO from "./BaseDAO";

export default class TheradDAO extends BaseDAO<ThreadData> {
  constructor(db: DB) {
    super(db, "threads");
  }

  async getAll(): Promise<ThreadData[]> {
    const data = (await this.collection.find({}).toArray()).map(this.convertDbItem);
    return data.map((data) => ThreadDataSchema.parse(data));
  }

  async getById(id: string): Promise<ThreadData> {
    const data = await this.collection.findOne({
      id: id,
    });
    return ThreadDataSchema.parse(this.convertDbItem(data));
  }

  async insert(data: ThreadData): Promise<void> {
    // todo: return id ??
  }

  async update(data: ThreadData): Promise<void> {
    // todo: chybí id
  }

  async delete(data: ThreadData): Promise<void> {
    // todo: chybí id
  }
}
