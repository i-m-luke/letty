import {
  DialogEventType,
  DialogProxy,
  DialogProxyError,
} from "../lib/components/Dialog";
import { PromiseState, promiseState } from "./utils";

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

  // NOTE - REFACTOR: Spousta testů obsahuje reduntadní kód (dal by se recyklovat)
  // TODO: viz TODO beforeConfirm >> return void (a další)
  describe("showModalAndWaitTillClosed", () => {
    const dispatchConfirm = () =>
      unit.dispatchEvent(new Event(DialogEventType.Confirm));
    const dispatchCancel = () =>
      unit.dispatchEvent(new Event(DialogEventType.Cancel));

    beforeEach(() => unit.init(fakeDialogElement));

    test("show", async () => {
      expect(fakeDialogElement.open).toBe(false);
      unit.showModalAndWaitTillClosed();
      // assert
      expect(fakeDialogElement.open).toBe(true);
    });

    test("confirmed", async () => {
      const { confirmed, canceled } = unit.showModalAndWaitTillClosed();
      dispatchConfirm();
      // assert
      expect(fakeDialogElement.open).toBe(false);
      expect(await promiseState(confirmed)).toEqual(PromiseState.Fulfilled);
      expect(await promiseState(canceled)).toEqual(PromiseState.Pending);
    });

    test("canceled", async () => {
      const { confirmed, canceled } = unit.showModalAndWaitTillClosed();
      dispatchCancel();
      // assert
      expect(fakeDialogElement.open).toBe(false);
      expect(await promiseState(canceled)).toEqual(PromiseState.Fulfilled);
      expect(await promiseState(confirmed)).toEqual(PromiseState.Pending);
    });

    describe("beforeConfirm", () => {
      test("return void", async () => {
        const { confirmed } = unit.showModalAndWaitTillClosed({
          beforeConfirm: () => {},
        });
        dispatchConfirm();
        // assert
        // TODO: expect(fakeDialogElement.open).toBe(false); // PROČ JE FALSE? U ostatních funguje
        expect(await promiseState(confirmed)).toEqual(PromiseState.Fulfilled);
      });

      test("return true", async () => {
        const { confirmed } = unit.showModalAndWaitTillClosed({
          beforeConfirm: () => true,
        });
        dispatchConfirm();
        // assert
        // TODO: expect(fakeDialogElement.open).toBe(false);
        expect(await promiseState(confirmed)).toEqual(PromiseState.Fulfilled);
      });

      test("return false", async () => {
        const { confirmed } = unit.showModalAndWaitTillClosed({
          beforeConfirm: () => false,
        });
        dispatchConfirm();
        // assert
        // TODO: expect(fakeDialogElement.open).toBe(false);
        expect(await promiseState(confirmed)).toEqual(PromiseState.Pending);
      });
    });

    describe("beforeCancel", () => {
      test("return void", async () => {
        const { canceled } = unit.showModalAndWaitTillClosed({
          beforeCancel: () => {},
        });
        dispatchCancel();
        // assert
        // TODO: expect(fakeDialogElement.open).toBe(false);
        expect(await promiseState(canceled)).toEqual(PromiseState.Fulfilled);
      });

      test("return true", async () => {
        const { canceled } = unit.showModalAndWaitTillClosed({
          beforeConfirm: () => true,
        });
        dispatchConfirm();
        // assert
        // TODO: expect(fakeDialogElement.open).toBe(false);
        expect(await promiseState(canceled)).toEqual(PromiseState.Fulfilled);
      });

      test("return false", async () => {
        // arrange:
        let proceed: boolean;
        const { canceled } = unit.showModalAndWaitTillClosed({
          beforeConfirm: () => proceed,
        });

        // act #1
        proceed = false;
        dispatchConfirm();
        // assert #1
        // expect(fakeDialogElement.open).toBe(true);
        expect(await promiseState(canceled)).toEqual(PromiseState.Pending);

        // TODO: Po druhém dispatchnutí se musí dialog uzavřít a promise fulfillnout
        // // act #2
        // proceed = true;
        // dispatchConfirm();
        // // assert #2
        // // expect(fakeDialogElement.open).toBe(false);
        // expect(await promiseState(canceled)).toEqual(PromiseState.Fulfilled);
      });
    });
  });
});
