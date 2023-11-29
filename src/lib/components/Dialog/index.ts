import _Dialog from "./Dialog.svelte";
export const Dialog = _Dialog;

export class DialogProxy extends EventTarget {
  private dialog: HTMLDialogElement | undefined;
  constructor() {
    super();
  }

  _onCanceled: (e?: Event) => void = (e?: Event) => {};
  set onCanceled(value: (e?: Event) => void) {
    this.removeEventListener(DialogButtonType.Cancel.toString(), this._onCanceled);
    this._onCanceled = value;
    this.addEventListener(DialogButtonType.Cancel.toString(), this._onCanceled, {
      once: true,
    });
  }

  _onConfirmed: (e?: Event) => void = (e?: Event) => {};
  set onConfirmed(value: (e?: Event) => void) {
    this.removeEventListener(DialogButtonType.Confirm.toString(), this._onConfirmed);
    this._onConfirmed = value;
    this.addEventListener(DialogButtonType.Confirm.toString(), this._onConfirmed, {
      once: true,
    });
  }

  showModalAndWaitTillClosed() {
    this.dialog?.dispatchEvent(new Event("show"));
    this.dialog?.showModal();
    return {
      confirmed: new Promise((resolve) => {
        this.onConfirmed = resolve;
      }),
      canceled: new Promise((resolve) => {
        this.onCanceled = resolve;
      }),
    };
  }

  close(): void {
    this.dialog?.close();
  }

  init(element: HTMLDialogElement): void {
    this.dialog = element;
  }
}

export enum DialogButtonType {
  Confirm = "confirm", // = event name
  Cancel = "close",
}
