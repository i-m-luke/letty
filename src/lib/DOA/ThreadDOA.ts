import type { Db as DB } from "mongodb";
import type { ThreadData, DBNode } from "$types";
import { BaseDBNodeDOA } from "./BaseDBNodeDAO";

export default class TheradDAO extends BaseDBNodeDOA<ThreadData> {
  constructor(db: DB) {
    super(db, "threads");
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
