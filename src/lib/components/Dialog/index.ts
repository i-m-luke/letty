import _Dialog from "./Dialog.svelte";
export const Dialog = _Dialog;

export class DialogProxy extends EventTarget {
  private dialog: HTMLDialogElement | undefined;
  constructor() {
    super();
  }

  // rnm --> BlockTill...???
  showModalAndBlockTillClosed(): {
    confirmed: Promise<unknown>;
    closed: Promise<unknown>;
  } {
    this.dialog?.showModal();
    return {
      confirmed: new Promise((resolve) => {
        this.addEventListener("confirm", resolve, { once: true });
      }),
      closed: new Promise((resolve) => {
        this.addEventListener("close", resolve, { once: true });
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
  Close = "close",
}
