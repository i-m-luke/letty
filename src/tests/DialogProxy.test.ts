import {
  DialogProxy,
  DialogProxyError,
  type DialogElement,
} from "../lib/components/Dialog";

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
  test("not initialized", () => {
    expect(() => unit.dialog).toThrow(DialogProxyError); 
  });
  test("initialized", () => {
    unit.init(fakeDialogElement);
    expect(() => unit.dialog).not.toThrow(DialogProxyError);
  });
});

class SomeError extends Error {}
