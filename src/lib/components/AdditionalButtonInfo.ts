export default class AdditionalButtonInfo {
  text: string;
  onClickAction: () => void;
  constructor(text: string, onClickAction: () => void) {
    this.text = text;
    this.onClickAction = onClickAction;
  }
}
