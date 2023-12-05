export class AbortPromise<T> implements Promise<T> {
  private basePromise: Promise<T>;
  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (res: any) => void
    ) => void,
    abortSignal: AbortSignal
  ) {
    this.basePromise = new Promise<T>(executor);
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this.basePromise.then(onfulfilled, onrejected);
  }

  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null
  ): Promise<T | TResult> {
    return this.basePromise.catch(onrejected);
  }

  finally(onFinally?: (() => void) | null) {
    return this.basePromise.finally(onFinally);
  }

  get [Symbol.toStringTag](): string {
    return "AbortPromise";
  }
}
