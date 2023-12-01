export default class ButtonInfo<TData> {
  onClickAction: (data: TData) => void | (() => void);
  text?: string;
  style?: string;
  className?: string;
  formActionName?: string;

  constructor(opts?: ButtonInfoOpts<TData>) {
    this.text = opts?.text;
    this.style = opts?.style;
    this.className = opts?.className;
    this.formActionName = opts?.formActionName;
    this.onClickAction = opts?.onClickAction ?? (() => {});
  }
}

export type ButtonInfoOpts<TData> = Partial<{
  onClickAction: (data: TData) => void;
  text: string;
  style: string;
  className: string;
  formActionName: string;
}>;
