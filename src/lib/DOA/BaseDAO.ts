import type { Db as DB } from "mongodb";

export default abstract class BaseDAO<TData> {
  protected db: DB;
  protected collection;

  constructor(db: DB, collectionName: string) {
    this.db = db;
    this.collection = db.collection(collectionName);
  }

  abstract getAll(): Promise<TData[]>; // GET
  abstract getById(id: string): Promise<TData>; // GET
  abstract insert(data: TData): void; // POST
  abstract update(data: TData): void; // PUT
  abstract delete(data: TData): void; // DELETE
}
