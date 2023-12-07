import { TreeNodeType } from "$lib/components/Tree";
import { writable, type Writable } from "svelte/store";

export default class CreateDialogData {
  readonly name: Writable<string>;
  readonly type: Writable<TreeNodeType>;
  readonly nameIssue: Writable<string>;
  constructor() {
    this.name = writable("");
    this.type = writable(TreeNodeType.Unknown);
    this.nameIssue = writable("");
  }
}
