import type { Db as DB } from "mongodb";

export default abstract class BaseDAO<TData> {
  protected db: DB;
  protected collection;

  constructor(db: DB, collectionName: string) {
    this.db = db;
    this.collection = db.collection(collectionName);
  }

  abstract getAll(): Promise<TData[]>; // GET http request
  abstract getById(id: string): Promise<TData>; // GET http request
  abstract insert(data: TData): void; // POST http request
  abstract update(data: TData): void; // PUT http request
  abstract delete(data: TData): void; // DELETE http request
}
