import { startDatabase } from "$db";
import { log } from "$lib/logging";
import { ApiRouteHandler, AppRouteHandler } from "./handlers";
import db from "$db";

await startDatabase()
  .then(() => log("Database is running.."))
  .catch((err) => log("Error while starting database. Error: " + err));

const appRouteHandler = new AppRouteHandler(db);
const apiRouteHandler = new ApiRouteHandler();
appRouteHandler.setNextHandler(apiRouteHandler);

export async function handle({ event, resolve }) {
  appRouteHandler.handle(event.url.pathname); // TODO: handle should use resolve and return result then
  return await resolve(event);
}
