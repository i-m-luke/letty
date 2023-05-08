import type { Db as DB } from "mongodb";
import type { ThreadData, DBNode, DBItem } from "$types";
import BaseDAO from "./BaseDAO";

export default class TheradDAO extends BaseDAO<ThreadData> {
  constructor(db: DB) {
    super(db, "threads");
  }

  async getAll(): Promise<ThreadData[]> {
    const data = (await this.collection
      .find({})
      .toArray()) as DBItem<ThreadData>[];
    return data.map((data) => data as ThreadData);
  }

  async getById(id: string): Promise<ThreadData> {
    const data = (await this.collection.findOne({
      id: id,
    })) as DBItem<ThreadData>;
    return data as ThreadData;
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
