// import { PromptData, type ThreadData, type DBNode } from "$types";
import type { PromptData, ThreadData, DBNode } from "$types";
import { v4 as uuid } from "uuid";

/* NOTEs: 
	- Node musí obshaovat userId, aby bylo z db možno vyfiltrovat nodes daného uživatele
*/

//#region DAO pattern

// NOTES: Pro každou HTTP metodu bude jedna metoda na DOA. Pro GET metodu budou dvě (jedná metoda získá vše, druhá konkrétní item).
// GET: findAll() a find(object: Object)
// POST: insert(object: Object)
// PUT: update(object: Object)
// DELETE: delete(object: Object)

interface IDB {
  findAll: () => Object[];
  find(object: Object): Object;
  insertOne(object: Object): void;
}

export class _MongoDB implements IDB {
  findAll(): Object[] {
    return [];
  }

  find(object: Object): Object {
    return {};
  }

  insertOne(object: Object) {}
}

abstract class BaseDAO<TData> {
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

type SomeData = {};
/**
 * db: MongoDB instance
 */
class DBNodeDAO extends BaseDAO<SomeData> {
  constructor(db: any) {
    super(db);
  }

  getAll(): SomeData[] {
    return [];
  }

  getById(id: string): SomeData {
    return {};
  }

  insert(data: SomeData): void {}
  update(data: SomeData): void {}
  delete(data: SomeData): void {}
}

const mongoDB = new _MongoDB();
const dbNodeDAO = new DBNodeDAO(mongoDB);

export class PromptDOA extends BaseDAO<PromptData> {
  constructor(db: IDB) {
    super(db);
  }

  getAll(): PromptData[] {
    return [];
  }

  getById(id: string): PromptData {
    return { name: "...name...", prompt: "...prompt..." };
  }

  insert(data: PromptData): void {
    console.log("insert not implemented");
  }

  update(data: PromptData): void {}

  delete(data: PromptData): void {}
}

//#endregion

const userId = uuid();

type DBType = {
  promptCollection: DBNode<PromptData>[];
  threadCollection: DBNode<ThreadData>[];
};

export const DB: DBType = {
  promptCollection: [
    {
      id: "1",
      userId,
      data: {
        name: "prompt 1",
        prompt: "some prompt",
      },
    },
    {
      id: "2",
      userId,
      data: {
        name: "prompt 2",
        prompt: "some prompt",
      },
    },
    {
      id: "11",
      userId,
      parentId: "1",
      data: {
        name: "prompt 1-1",
        prompt: "some prompt",
      },
    },
    {
      id: "12",
      userId,
      parentId: "1",
      data: {
        name: "prompt 1-2",
        prompt: "some prompt",
      },
    },
    {
      id: "111",
      userId,
      parentId: "11",
      data: {
        name: "prompt 1-1-1",
        prompt: "some prompt",
      },
    },
  ],
  threadCollection: [
    {
      id: "1",
      userId,
      data: {
        name: "thread 1",
        messages: [],
      },
    },
    {
      id: "2",
      userId,
      data: {
        name: "thread 2",
        messages: [],
      },
    },
    {
      id: "21",
      userId,
      parentId: "2",
      data: {
        name: "thread 2-1",
        messages: [],
      },
    },
    {
      id: "3",
      userId,
      data: {
        name: "thread 3",
        messages: [],
      },
    },
  ],
};
