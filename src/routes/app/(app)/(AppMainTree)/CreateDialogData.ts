import { TreeNodeType } from "$lib/components/Tree";
import { writable, type Writable } from "svelte/store";

export default class CreatePromptDialogData {
  private _name: Writable<string>;
  private _type: Writable<TreeNodeType>;

  constructor() {
    this._name = writable("");
    this._type = writable(TreeNodeType.Content);
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }
}
