import _Select from "./Select.svelte";

export const Select = _Select;

export interface ISelectOptionInfo {
  text: string;
  data: any;
}

export class SelectOptionInfo<TData> implements ISelectOptionInfo {
  text: string;
  data: TData;

  constructor(text: string, data: TData) {
    this.text = text;
    this.data = data;
  }
}
