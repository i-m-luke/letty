// vytvořit pomoci facade patternu logovací fce, kterou bude v případě nutnosti možné nahradit za jiné logvání (pro začátek použiji console.log)
// import { log } from "$logging"
// import { startDatabase } from "$db"

import { error } from '@sveltejs/kit';

// startDatabase()
//      .then(() => log("database is running.."))
//      .catch((err) => log("error while starting database. error: " + err))

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
