import type IDB from "./IDB";
import type { ThreadData } from "$types";

export class FakeDB implements IDB {
  findAll(): ThreadData[] {
    return [
      { name: "thread 1", messages: [] },
      { name: "thread 2", messages: [] },
    ];
  }

  find(object: Object): Object {
    return {};
  }

  insertOne(object: Object): void {}
}
