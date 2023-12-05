// NOTE:
// Kvůli testům musela být soubor komponenty (Dialog.svelte) vyjmutou z index.ts (DialogProxy nešlo importovat)
// Pokud se někdy podaří zprovoznit import svelte komponent, tak zvážit navrácená komponenty do index file

export type DialogElement = {
  showModal: () => void;
  close: () => void;
} & EventTarget;

// TODO: Přesunout do vlastního modulu
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

  private _onConfirm: (e?: Event) => void = (e?: Event) => {};
  set onConfirm(value: (e?: Event) => void) {
    this.removeEventListener(DialogEventType.Confirm, this._onConfirm);
    this._onConfirm = value;
    this.addEventListener(DialogEventType.Confirm, this._onConfirm, {
      once: true,
    });
  }

  private _onConfirmed: (e?: Event) => void = (e?: Event) => {};
  set onConfirmed(value: (e?: Event) => void) {
    this.removeEventListener(DialogEventType.Confirmed, this._onConfirmed);
    this._onConfirmed = value;
    this.addEventListener(DialogEventType.Confirmed, this._onConfirmed, {
      once: true,
    });
  }

  private _onCancel: (e?: Event) => void = (e?: Event) => {};
  set onCancel(value: (e?: Event) => void) {
    this.removeEventListener(DialogEventType.Cancel, this._onCancel);
    this._onCancel = value;
    this.addEventListener(DialogEventType.Cancel, this._onCancel, {
      once: true,
    });
  }

  private _onCanceled: (e?: Event) => void = (e?: Event) => {};
  set onCanceled(value: (e?: Event) => void) {
    this.removeEventListener(DialogEventType.Canceled, this._onCanceled);
    this._onCanceled = value;
    this.addEventListener(DialogEventType.Canceled, this._onCanceled, {
      once: true,
    });
  }

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

  showModalAndWaitTillClosed(
    opts?: Partial<{
      beforeCancel: () => boolean | void | Promise<boolean> | Promise<void>;
      beforeConfirm: () => boolean | void | Promise<boolean> | Promise<void>;
    }>
  ) {
    // NOTE: Je nutné toString ? OK : Projít reference položek DialogEventType a odstranit toString()
    this.dialog?.dispatchEvent(new Event(DialogEventType.Show));
    this.dialog?.showModal();

    const createBeforeEvent =
      (
        dispatchEventType: DialogEventType,
        beforeFn?: () => boolean | void | Promise<boolean> | Promise<void>
      ) =>
      async () => {
        if (beforeFn) {
          const proceed = await beforeFn();
          if (proceed !== undefined && !proceed) {
            return;
          }
        }

        this.close();
        this.dispatchEvent(new Event(dispatchEventType));
      };

    this.onCancel = createBeforeEvent(DialogEventType.Canceled, opts?.beforeCancel);
    this.onConfirm = createBeforeEvent(
      DialogEventType.Confirmed,
      opts?.beforeConfirm
    );

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
  Confirm = "confirm",
  Cancel = "close",
}

export enum DialogEventType {
  Cancel = "onCancle",
  Confirm = "onConfirm",
  Confirmed = "confirmed",
  Canceled = "canceled",
  Show = "show",
}

export class DialogProxyError extends Error {}
