import type { Db as DB, WithId, Document } from "mongodb";
import type { WithId as _WithId } from "$types";

export default abstract class BaseDAO<TObject, TNewObject> {
  protected db: DB;
  protected collection;

  constructor(db: DB, collectionName: string) {
    this.db = db;
    this.collection = db.collection(collectionName);
  }

  abstract get(data: Partial<TObject>): Promise<TObject>;
  abstract getAll(): Promise<TObject[]>; // GET http request
  abstract getById(id: string): Promise<TObject>; // GET http request
  abstract insert(data: TNewObject): Promise<string>; // POST http request
  abstract update(
    id: string,
    data: Partial<Omit<TObject, keyof _WithId>>
  ): Promise<void>; // PUT http request
  abstract delete(data: TObject): Promise<boolean>; // DELETE http request

  protected convertDbItem(item: WithId<Document> | null) {
    return item !== null
      ? {
          ...item,
          _id: item._id.toString(),
        }
      : null;
  }
}
