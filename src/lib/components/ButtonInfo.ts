export default class ButtonInfo<TData> {
  onClickAction: (data: TData) => void | (() => void);
  text?: string;
  style?: string;
  formActionName?: string;

  constructor(opts?: ButtonInfoOpts<TData>) {
    this.text = opts?.text;
    this.style = opts?.style;
    this.formActionName = opts?.formActionName;
    this.onClickAction = opts?.onClickAction ?? (() => {});
  }
}

export type ButtonInfoOpts<TData> = {
  onClickAction?: (data: TData) => void | (() => void);
  text?: string;
  style?: string;
  formActionName?: string;
};
