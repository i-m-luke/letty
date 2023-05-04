import type { Db as DB, ObjectId } from "mongodb";
import BaseDAO from "./BaseDAO";
import type { ThreadData, DBNode } from "$types";

export default class TheradDAO extends BaseDAO<DBNode<ThreadData>> {
  constructor(db: DB) {
    super(db, "threads");
  }

  async getAll(): Promise<DBNode<ThreadData>[]> {
    const data: unknown[] = await this.collection.find({}).toArray();
    return data.map((d) => d as DBNode<ThreadData>);
  }

  async getById(id: string): Promise<DBNode<ThreadData>> {
    const data: unknown = this.collection.find({ id: id });
    return data as DBNode<ThreadData>;
  }

  async insert(data: DBNode<ThreadData>): Promise<void> {
    // todo: return id ??
  }

  async update(data: DBNode<ThreadData>): Promise<void> {
    // todo: chybí id
  }

  async delete(data: DBNode<ThreadData>): Promise<void> {
    // todo: chybí id
  }
}
