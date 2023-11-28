import type { Db as DB } from "mongodb";
import { ThreadSchema, type Thread, type NewThread, type WithId } from "$types";
import BaseDAO from "./BaseDAO";

export default class TheradDAO extends BaseDAO<Thread, NewThread> {
  constructor(db: DB) {
    super(db, "threads", ThreadSchema);
  }
}
