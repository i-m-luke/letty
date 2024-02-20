import type { Db } from "mongodb";

//#region OOP HANDLER

export interface IHandler {
  handle(route: string): boolean;
}

export abstract class BaseRouteHandler implements IHandler {
  private nextHandler: IHandler | null = null;
  private route: string;

  constructor(route: string) {
    this.route = route;
  }

  protected abstract process(): boolean;

  handle(route: string): boolean {
    if (route.startsWith(this.route)) {
      return this.process();
    }

    if (this.nextHandler != null) {
      return this.nextHandler.handle(route);
    }

    return false;
  }

  setNextHandler(handler: IHandler) {
    return (this.nextHandler = handler);
  }
}

export class AppRouteHandler extends BaseRouteHandler {
  private db: Db;

  // TODO: Replace Db by IDb (interface for testing purposes)
  constructor(db: Db) {
    super("/app");
    this.db = db;
  }

  override process(): boolean {
    // PROCESS REQUEST ...
    // TODO: Athtentication db.auth()
    console.log("hooks.server.ts: AppHandler performed");
    return true;
  }
}

export class ApiRouteHandler extends BaseRouteHandler {
  constructor() {
    super("/api");
  }

  override process(): boolean {
    // PROCESS REQUEST: Use routers (= MVC controller) to process the request
    console.log("ApiHandler performed");
    return true;
  }
}

//#endregion

//#region FP HANDLER

// export function handle()

// enum HandleFailReason {
// 	NotEven = '0',
// 	SmallerThanZero = '1'
// }

// type HandleResult<TError> = {
// 	ok: boolean;
// 	error: TError;
// };

// /**
//  * Handle creator initialization: initialize request type and error type
//  * @returns
//  */
// const initHandlerCreator = <TReq, TError extends string>() => {
// 	// returns handle creator
// 	return function (fn: (request: TReq) => HandleResult<TError>) {
// 		// returns final handle
// 		return function (request: TReq) {
// 			const res = fn(request);
// 			if (res.ok) return request;
// 			throw new Error(res.error);
// 		};
// 	};
// };

// const createHandlerFn = initHandlerCreator<number, HandleFailReason>();

// const handlerFn01 = createHandlerFn((request: number) => {
// 	return { ok: request > 0, error: HandleFailReason.SmallerThanZero };
// });

// const handlerFn02 = createHandlerFn((request: number) => {
// 	return { ok: request % 2 === 0, error: HandleFailReason.NotEven };
// });

// const handleNumber = (num: number) => {
// 	try {
// 		handlerFn01(handlerFn02(num));
// 	} catch (err) {
// 		switch (err) {
// 			case HandleFailReason.NotEven:
// 				console.log('action after number not event');
// 			case HandleFailReason.SmallerThanZero:
// 				console.log('action after number not larger than zero');
// 		}
// 	}
// };

// handleNumber(-1); // NOK, console log
// handleNumber(3); // NOK, console log
// handleNumber(2); // OK, no console log

//#endregion
