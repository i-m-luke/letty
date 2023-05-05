import { DB_NAME, DB_URL } from "$env/static/private";
import { MongoClient } from "mongodb";
import { log } from "$lib/logging";

const client = new MongoClient(DB_URL);

export const startDatabase = (): Promise<MongoClient> => {
  log("Starting mongo database...");
  return client.connect();
};

export default client.db(DB_NAME);

// export const db = new MongoClient()
// export const startDatabase = (): Promise => { db.connect ... }
// export class SomeDOA_01 { }
// export class SomeDOA_02 { }
// ...
