import {
  DialogEventType,
  DialogProxy,
  DialogProxyError,
} from "../lib/components/Dialog";

class FakeDialogElement extends EventTarget {
  open: boolean = false;
  showModal = jest.fn().mockImplementation(() => (this.open = true));
  close = jest.fn().mockImplementation(() => (this.open = false));
}

describe("DialogProxy", () => {
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
    const dispatchConfirm = () =>
      unit.dispatchEvent(new Event(DialogEventType.Confirm));
    const dispatchCancel = () =>
      unit.dispatchEvent(new Event(DialogEventType.Cancel));

    beforeEach(() => unit.init(fakeDialogElement));

    test("show", async () => {
      unit.showModalAndWaitTillClosed();
      // assert
      expect(fakeDialogElement.open).toBe(true);
    });

    test("confirmed", async () => {
      const { confirmed, canceled } = unit.showModalAndWaitTillClosed();
      let confirmedDone = false;
      let canceledDone = false;
      const confiremedProm = confirmed.then(() => (confirmedDone = true));
      canceled.then(() => (canceledDone = true));
      dispatchConfirm();
      await confiremedProm;
      // assert
      expect(confirmedDone).toBe(true);
      expect(canceledDone).toBe(false);
    });

    test("canceled", async () => {
      const { confirmed, canceled } = unit.showModalAndWaitTillClosed();
      let confirmedDone = false;
      let canceledDone = false;
      const canceledProm = canceled.then(() => (canceledDone = true));
      confirmed.then(() => (confirmedDone = true));
      dispatchCancel();
      await canceledProm;
      // assert
      expect(canceledDone).toBe(true);
      expect(confirmedDone).toBe(false);
    });

    describe("beforeConfirm", () => {
      test("return void", async () => {
        const { confirmed } = unit.showModalAndWaitTillClosed({
          beforeConfirm: () => {},
        });
        let done = false;
        const confirmedProm = confirmed.then(() => (done = true));
        dispatchConfirm();
        await confirmedProm;
        // assert
        expect(done).toBe(true);
        expect(fakeDialogElement.open).toBe(false);
      });

      test("return true", async () => {
        const { confirmed } = unit.showModalAndWaitTillClosed({
          beforeConfirm: () => true,
        });
        let done = false;
        const confirmedWithReturnTrueProm = confirmed.then(() => (done = true));
        dispatchConfirm();
        await confirmedWithReturnTrueProm;
        // assert
        expect(done).toBe(true);
        expect(fakeDialogElement.open).toBe(false);
      });

      test("return false", async () => {
        const { confirmed } = unit.showModalAndWaitTillClosed({
          beforeConfirm: () => false,
        });
        // TODO: Jak ověřit, že je promise stále pending? :-/
        // let done = false;
        // const confirmedWithReturnTrueProm = confirmed.then(() => (done = true));
        // await confirmedWithReturnTrueProm;
        // expect(done).toBe(false);
        dispatchConfirm();
        // assert
        expect(fakeDialogElement.open).toBe(true);
      });
    });

    describe("beforeCancel", () => {
      // TODO: viz beforeConfirm
    });
  });
});
