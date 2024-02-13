import type { Db as DB } from "mongodb";
import { Thread, type PostThread, type WithId } from "$types";
import BaseDAO from "./BaseDAO";

export default class TheradDAO extends BaseDAO<Thread, PostThread> {
  constructor(db: DB) {
    super(db, "threads", Thread);
  }
}
