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

  private _onCanceled: (e?: Event) => void = (e?: Event) => {};
  set onCanceled(value: (e?: Event) => void) {
    this.removeEventListener(DialogButtonType.Cancel.toString(), this._onCanceled);
    this._onCanceled = value;
    this.addEventListener(DialogButtonType.Cancel.toString(), this._onCanceled, {
      once: true,
    });
  }

  private _onConfirmed: (e?: Event) => void = (e?: Event) => {};
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

  init(element: DialogElement): void {
    this.dialog = element;
  }
}

// // Dialog.svelte >>

// dialogProxy.dispatchEvent(new Event("onClose"))

// // DialogProxy.ts >>

// showDialogAndWait...({beforeClose?: () =>boolean | undefined, beforeConfirm?: () => boolean | undefined)} {

// // todo: eventy se musí mazat stejně jako u set onClosed ...
// this.addEventListener("onClose", () => {
//     // co je navraceno, když fce bude vracet void?
//     if (!beforeClose || beforeClose()) {
//       this.dispatchEvent(new Event("closed"))
//       dialog.close();
//     }
//   })

//   // todo: to samé pro onConfirm
//   // todo: Dialog.svelte bude dispatchovat onClose, namísto closed event

//   return {
//     confirmed: ...,
//     closed: ...,
//   }
// }

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

export enum DialogButtonType {
  Confirm = "confirm", // = event name
  Cancel = "close",
}

export class DialogProxyError extends Error {}
