export default class ButtonInfo {
  text: string;
  formActionName?: string;
  onClickAction?: () => void;
  constructor(text: string, opts?: ButtonInfoOpts) {
    this.text = text;
    this.formActionName = opts?.formActionName;
    this.onClickAction = opts?.onClickAction;
  }
}

export type ButtonInfoOpts = {
  onClickAction?: () => void;
  formActionName?: string;
};
