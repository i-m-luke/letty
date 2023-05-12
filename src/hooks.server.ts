import { startDatabase } from "$db";
import { log } from "$lib/logging";
import { ApiHandler, AppHandler } from "./handlers";

await startDatabase()
  .then(() => log("Database is running.."))
  .catch((err) => log("Error while starting database. Error: " + err));

const appHandler = new AppHandler();
const apiHandler = new ApiHandler();
appHandler.setNextHandler(apiHandler);

export async function handle({ event, resolve }) {
  appHandler.handle(event.url.pathname); // TODO: handle should use resolve and return result then
  return await resolve(event);
}
