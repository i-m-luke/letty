import _Dialog from "./Dialog.svelte";
export const Dialog = _Dialog;

export class DialogProxy {
  private dialog: HTMLDialogElement | undefined;
  constructor() {}

  async showModalAndBlockTillClosed(): Promise<unknown> {
    this.dialog?.showModal();
    // NOTE: Navracet ConfirmOption?
    return new Promise((resolve) => {
      this.dialog?.addEventListener("close", resolve, { once: true });
    });
  }

  close(): void {
    this.dialog?.close();
  }

  init(element: HTMLDialogElement): void {
    this.dialog = element;
  }
}
