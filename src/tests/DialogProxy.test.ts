import { DialogProxy, type DialogElement } from "../lib/components/Dialog";

class FakeDialogElement extends EventTarget {
  showModal() {}
  close() {}
}

describe("DialogProxy", () => {
  let unit: DialogProxy;
  let fakeDialogElement: DialogElement;
  beforeEach(() => {
    unit = new DialogProxy();
    fakeDialogElement = new FakeDialogElement();
  });
  test("Not initialized", () => {
    expect(() => unit.dialog).toThrow();
  });
  test("Initialized", () => {
    unit.init(fakeDialogElement);
    expect(() => unit.dialog).not.toThrow();
  });
});
