import { ObjectId, type Db as DB } from "mongodb";
import type { DBNode, NewDBNode } from "$types";
import BaseDAO from "./BaseDAO";
import type { ZodSchema } from "zod";

export abstract class BaseDBNodeDAO<TData> extends BaseDAO<
  DBNode<TData>,
  NewDBNode<TData>
> {
  constructor(db: DB, collectionName: string, dataSchema: ZodSchema<DBNode<TData>>) {
    super(db, collectionName, dataSchema);
  }

  async addItem(parentId: string, itemId: string) {
    this.collection.updateOne(
      { _id: new ObjectId(parentId) },
      { $push: { "data.itemsIds": itemId } }
    );
  }

  async removeItem(parentId: string, itemId: string) {
    const temp = await this.collection.findOne({ _id: new ObjectId(parentId) });
    this.collection.updateOne(
      { _id: new ObjectId(parentId) },
      { $pull: { "data.itemsIds": itemId } }
    );
  }
}
