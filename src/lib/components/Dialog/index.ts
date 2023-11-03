import _Dialog from "./Dialog.svelte";
export const Dialog = _Dialog;

export class DialogProxy extends EventTarget {
  private dialog: HTMLDialogElement | undefined;
  constructor() {
    super();
  }

  // rnm --> ...AndWaitTillClosed ???
  showModalAndBlockTillClosed(): {
    confirmed: Promise<unknown>;
    canceled: Promise<unknown>;
  } {
    this.dialog?.showModal();
    return {
      confirmed: new Promise((resolve) => {
        this.addEventListener(DialogButtonType.Confirm.toString(), resolve, {
          once: true,
        });
      }),
      canceled: new Promise((resolve) => {
        this.addEventListener(DialogButtonType.Cancel.toString(), resolve, {
          once: true,
        });
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
