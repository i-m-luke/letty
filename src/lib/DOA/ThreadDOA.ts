import BaseDAO from "./BaseDAO";
import type IDB from "./IDB";
import type { ThreadData } from "$types";

export default class TheradDAO extends BaseDAO<ThreadData> {
  constructor(db: IDB) {
    super(db);
  }

  getAll(): ThreadData[] {
    return [];
  }

  getById(id: string): ThreadData {
    return { name: "test", messages: [] }; // this.db.find()
  }

  insert(data: ThreadData): void {
    // todo: return id ??
  }

  update(data: ThreadData): void {
    // todo: chybí id
  }

  delete(data: ThreadData): void {
    // todo: chybí id
  }
}
