import { TreeNodeType } from "$lib/components/Tree";
import { writable, type Writable } from "svelte/store";

export default class CreateDialogData {
  private _name: Writable<string>;
  private _type: Writable<TreeNodeType>;

  constructor() {
    this._name = writable("");
    this._type = writable(TreeNodeType.Unknown);
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }
}
