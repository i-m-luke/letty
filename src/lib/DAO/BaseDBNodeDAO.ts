import { ObjectId, type Db as DB } from "mongodb";
import BaseDAO from "./BaseDAO";
import type { ZodSchema } from "zod";

export abstract class BaseDBNodeDAO<
  TObject,
  TNewObject extends object
> extends BaseDAO<TObject, TNewObject> {
  constructor(db: DB, collectionName: string, dataSchema: ZodSchema<TObject>) {
    super(db, collectionName, dataSchema);
  }

  async addItem(parentId: string, itemId: string) {
    this.collection.updateOne(
      { _id: new ObjectId(parentId) },
      { $push: { "data.itemsIds": itemId } }
    );
  }

  async removeItem(parentId: string, itemId: string) {
    this.collection.updateOne(
      { _id: new ObjectId(parentId) },
      { $pull: { "data.itemsIds": itemId } }
    );
  }
}
