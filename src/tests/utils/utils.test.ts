import { PromiseState, promiseState } from ".";

describe("tests utils", () => {
  test("promiseState", async () => {
    const pendingTimeout = 1000;
    const pendingPromise = new Promise(
      (resolved, _) => setTimeout(resolved, pendingTimeout * 2) // resolved time is greater than pending timeout = always pending
    );
    const rejectedPromise = Promise.reject();
    const fulfilledPromise = Promise.resolve();
    expect(await promiseState(rejectedPromise)).toEqual(PromiseState.Rejected);
    expect(await promiseState(fulfilledPromise)).toEqual(PromiseState.Fulfilled);
    expect(await promiseState(pendingPromise)).toEqual(PromiseState.Pending);
  });
});
