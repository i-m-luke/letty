import { writable, type Writable } from "svelte/store";

export default class CreateThreadDialogData {
  name: Writable<string>;
  constructor() {
    this.name = writable("");
  }
}
