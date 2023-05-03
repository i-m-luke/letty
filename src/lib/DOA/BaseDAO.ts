import type IDB from "./IDB";

export default abstract class BaseDAO<TData> {
  protected db: IDB;

  constructor(db: IDB) {
    this.db = db;
  }

  abstract getAll(): TData[]; // GET
  abstract getById(id: string): TData; // GET
  abstract insert(data: TData): void; // POST
  abstract update(data: TData): void; // PUT
  abstract delete(data: TData): void; // DELETE
}
