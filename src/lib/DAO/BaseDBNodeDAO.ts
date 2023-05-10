import type { Db as DB } from "mongodb";
import type { DBNode, DBItem } from "$types";
import BaseDAO from "./BaseDAO";

export abstract class BaseDBNodeDAO<Data> extends BaseDAO<DBNode<Data>> {
  constructor(db: DB, collectionName: string) {
    super(db, collectionName);
  }

  async getAll(): Promise<DBNode<Data>[]> {
    const data = (await this.collection.find({}).toArray()) as DBItem<
      DBNode<Data>
    >[];
    return data.map((data) => data as DBNode<Data>);
  }

  async getById(id: string): Promise<DBNode<Data>> {
    const data = (await this.collection.findOne({ id: id })) as DBItem<
      DBNode<Data>
    >;
    return data as DBNode<Data>;
  }
}
