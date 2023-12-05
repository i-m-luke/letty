// NOTE:
// Kvůli testům musela být soubor komponenty (Dialog.svelte) vyjmutou z index.ts (DialogProxy nešlo importovat)
// Pokud se někdy podaří zprovoznit import svelte komponent, tak zvážit navrácená komponenty do index file

export type DialogElement = {
  showModal: () => void;
  close: () => void;
} & EventTarget;

export class DialogProxy extends EventTarget {
  constructor() {
    super();
  }

  private _dialog: DialogElement | undefined;
  get dialog() {
    if (!this._dialog) throw new DialogProxyError("Proxy wasn't initialized yet");
    return this._dialog;
  }
  set dialog(value: DialogElement) {
    this._dialog = value;
  }

  private _onCancel: (e?: Event) => void = (e?: Event) => {};
  set onCancel(value: (e?: Event) => void) {
    this.removeEventListener(DialogEventType.Cancle.toString(), this._onCancel);
    this._onCancel = value;
    this.addEventListener(DialogEventType.Cancle.toString(), this._onCancel, {
      once: true,
    });
  }

  private _onConfirm: (e?: Event) => void = (e?: Event) => {};
  set onConfirm(value: (e?: Event) => void) {
    this.removeEventListener(DialogEventType.Confirm.toString(), this._onConfirm);
    this._onConfirm = value;
    this.addEventListener(DialogEventType.Confirm.toString(), this._onConfirm, {
      once: true,
    });
  }

  private _onCanceled: (e?: Event) => void = (e?: Event) => {};
  set onCanceled(value: (e?: Event) => void) {
    this.removeEventListener(DialogEventType.Canceled.toString(), this._onCanceled);
    this._onCanceled = value;
    this.addEventListener(DialogEventType.Canceled.toString(), this._onCanceled, {
      once: true,
    });
  }

  private _onConfirmed: (e?: Event) => void = (e?: Event) => {};
  set onConfirmed(value: (e?: Event) => void) {
    this.removeEventListener(
      DialogEventType.Confirmed.toString(),
      this._onConfirmed
    );
    this._onConfirmed = value;
    this.addEventListener(DialogEventType.Confirmed.toString(), this._onConfirmed, {
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

  // // Dialog.svelte >>
  // dialogProxy.dispatchEvent(new Event("onClose"))

  // AppMainTree.svelte >>
  // const onConfirm = () => {
  //   const res = await fetch()
  //   if (!res.succes) {
  //     // todo: jak předat issues?
  //     return false
  //   }

  //   // ...addNode

  //   return true
  // }

  // showDialogAndWait...({onConfirm})

  _showModalAndWaitTillClosed(
    opts?: Partial<{
      beforeCancel: () => boolean | void;
      beforeConfirm: () => boolean | void;
    }>
  ) {
    this.dialog?.dispatchEvent(new Event("show"));
    this.dialog?.showModal();

    this.onCancel = () => {
      // NOTE: co je navraceno, když fce bude vracet void (...že by undefined?) ?
      // --> TODO: Otestovat
      if (!opts?.beforeCancel || opts?.beforeCancel()) {
        close();
        this.dispatchEvent(new Event(DialogEventType.Canceled));
      }
    };

    this.onConfirm = () => {
      // NOTE: co je navraceno, když fce bude vracet void (...že by undefined?) ?
      // --> TODO: Otestovat
      if (!opts?.beforeConfirm || opts?.beforeConfirm()) {
        close();
        this.dispatchEvent(new Event(DialogEventType.Confirmed));
      }
    };

    // todo: to samé pro onConfirm
    // todo: Dialog.svelte bude dispatchovat onClose, namísto closed event

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

  init(element: DialogElement): void {
    this.dialog = element;
  }
}

export enum DialogButtonType {
  Confirm = "confirm", // = event name
  Cancel = "close",
}

export enum DialogEventType {
  Cancle = "onCancle",
  Confirm = "onCancle",
  Confirmed = "confirmed",
  Canceled = "canceled",
}

export class DialogProxyError extends Error {}
