const makeRoute = (...values: string[]) =>
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
    appId: (id: string) => makeRoute(Routes.static.app, id) + "/",
  },
  names: {
    app: "app",
    thread: "thread",
    prompt: "prompt",
  },
};

const app = (Routes.static.app = makeRoute(Routes.names.app));
Routes.static.prompt = makeRoute(app, Routes.names.prompt);
Routes.static.thread = makeRoute(app, Routes.names.thread);
Object.freeze(Routes);

export default Routes;
