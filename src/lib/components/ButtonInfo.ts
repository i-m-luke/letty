export default class ButtonInfo<TData> {
  text: string;
  onClickAction: (data: TData) => void | (() => void);

  formActionName?: string;

  constructor(text: string, opts?: ButtonInfoOpts<TData>) {
    this.text = text;
    this.formActionName = opts?.formActionName;
    this.onClickAction = opts?.onClickAction ?? (() => {});
  }
}

export type ButtonInfoOpts<TData> = {
  onClickAction?: (data: TData) => void | (() => void);
  formActionName?: string;
};
