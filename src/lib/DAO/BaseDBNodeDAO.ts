import type { Db as DB } from "mongodb";
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
}
