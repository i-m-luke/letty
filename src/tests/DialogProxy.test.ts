import {
  DialogButtonType,
  DialogProxy,
  DialogProxyError,
} from "../lib/components/Dialog";

class FakeDialogElement extends EventTarget {
  open: boolean = false;
  showModal = jest.fn().mockImplementation(() => (this.open = true));
  close = jest.fn().mockImplementation(() => (this.open = false));
}

describe("DialogProxy.ts", () => {
  let unit: DialogProxy;
  let fakeDialogElement: FakeDialogElement;

  beforeEach(() => {
    unit = new DialogProxy();
    fakeDialogElement = new FakeDialogElement();
  });

  test("not initialized", () => {
    expect(() => unit.dialog).toThrow(DialogProxyError);
  });
  test("initialized", () => {
    unit.init(fakeDialogElement);
    // assert
    expect(() => unit.dialog).not.toThrow(DialogProxyError);
  });

  describe("showModalAndWaitTillClosed", () => {
    beforeEach(() => unit.init(fakeDialogElement));

    test("confirmed", async () => {
      const { canceled, confirmed } = unit.showModalAndWaitTillClosed();
      unit.dispatchEvent(new Event(DialogButtonType.Confirm));
      // assert
      expect(fakeDialogElement.open).toBe(true);
      expect(await Promise.all([confirmed])).toBe(true);
      expect(await Promise.all([canceled])).toBe(false);
    });
    test("canceled", async () => {
      const { canceled, confirmed } = unit.showModalAndWaitTillClosed();
      unit.dispatchEvent(new Event(DialogButtonType.Cancel));
      // assert
      expect(fakeDialogElement.open).toBe(true);
      expect(await Promise.all([confirmed])).toBe(true);
      expect(await Promise.all([canceled])).toBe(false);
    });
  });
});
