export class DialogElement {
  elem: HTMLDialogElement;
  constructor(element: HTMLDialogElement) {
    this.elem = element;
  }

  async showModalAndBlockTillClosed(): Promise<unknown> {
    this.elem.showModal();
    return new Promise((resolve) => {
      this.elem.addEventListener("close", resolve, { once: true });
    });
  }
}
