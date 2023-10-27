const makeDynamicRoute = (...values: string[]) =>
  values.length > 1
    ? values.reduce(
        (prev, curr) => sanitizeRouteSegment(prev) + sanitizeRouteSegment(curr)
      )
    : sanitizeRouteSegment(values[0]);

const sanitizeRouteSegment = (segment: string) =>
  segment.startsWith("/") ? segment : "/" + segment;

const Routes = {
  static: {
    app: "",
    prompt: "",
    thread: "",
  },
  dynamic: {
    appId: (id: string) => makeDynamicRoute(Routes.static.app, id) + "/",
  },
};

const app = (Routes.static.app = makeDynamicRoute("app"));
Routes.static.prompt = makeDynamicRoute(app, "prompt");
Routes.static.thread = makeDynamicRoute(app, "thread");

console.log("app route:" + app);

export default Object.freeze(Routes);
