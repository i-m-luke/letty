export enum PromiseState {
  Pending = "pending",
  Fulfilled = "fulfilled",
  Rejected = "rejected",
}

export const promiseState = async <T>(
  promise: Promise<T>,
  pendingTimeout: number = 1000
): Promise<PromiseState> =>
  await Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(reject, pendingTimeout, PromiseState.Pending)
    ),
  ])
    .then(() => PromiseState.Fulfilled)
    .catch((err) =>
      err === PromiseState.Pending ? PromiseState.Pending : PromiseState.Rejected
    );
