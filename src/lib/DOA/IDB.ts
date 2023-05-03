export default interface IDB {
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
