import type { Db as DB } from "mongodb";
import { ThreadSchema, type Thread, type NewThread } from "$types";
import BaseDAO from "./BaseDAO";

export default class TheradDAO extends BaseDAO<Thread, NewThread> {
  constructor(db: DB) {
    super(db, "threads");
  }

  async get(data: Partial<Thread>): Promise<Thread> {
    return ThreadSchema.parse(
      this.convertDbItem(await this.collection.findOne({ data }))
    );
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

  async insert(data: NewThread): Promise<string> {
    return this.collection
      .insertOne(data)
      .then((res) => res.insertedId)
      .toString();
  }

  async update(id: string, data: {}): Promise<void> {
    // todo ...
  }

  async delete(data: Thread): Promise<boolean> {
    return this.collection.deleteOne({ data }).then((res) => res.acknowledged);
  }
}
