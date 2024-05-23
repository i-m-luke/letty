import { writable } from "svelte/store";
import type { Unsubscriber, Writable } from "svelte/store";

export class ViewModelBase {
  protected subscriptions: Unsubscriber[] = [];

  protected createState<T>(initValue: T, subscribe: (value: T) => void | undefined) {
    const writableState = writable(initValue);
    if (subscribe) {
      this.addDisposable(writableState.subscribe(subscribe));
    }
    return writableState;
  }

  protected subscribeState<T>(
    state: Writable<T>,
    subscribe: (value: T) => void | undefined
  ) {
    this.addDisposable(state.subscribe(subscribe));
  }

  private addDisposable(unsubscriber: Unsubscriber) {
    this.subscriptions.push(unsubscriber);
  }

  dispose() {
    this.subscriptions.forEach((x) => x());
  }
}
