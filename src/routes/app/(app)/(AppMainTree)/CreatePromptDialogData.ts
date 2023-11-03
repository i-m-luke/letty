import { writable, type Writable } from "svelte/store";

export default class CreatePromptDialogData {
  name: Writable<string>;
  constructor() {
    this.name = writable("");
  }
}
