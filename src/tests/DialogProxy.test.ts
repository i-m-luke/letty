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

  afterEach(() => jest.restoreAllMocks());

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
        // arrange:
        const beforeConfirmMock = jest.fn();
        const { canceled } = unit.showModalAndWaitTillClosed({
          beforeConfirm: beforeConfirmMock,
        });
        const promiseStateMock = jest.fn(
          async (promise) => await promiseState(promise)
        );

        // act:
        beforeConfirmMock.mockReturnValue(false);
        dispatchConfirm();
        const dialogStateOnFalse = fakeDialogElement.open;
        await promiseStateMock(canceled);

        // TODO:
        // beforeConfirmMock.mockReturnValue(true);
        // dispatchConfirm();
        // const dialogStateOnTrue = fakeDialogElement.open;
        // await promiseStateMock(canceled);

        // assert:
        expect(await promiseStateMock.mock.results[0].value).toBe(
          PromiseState.Pending
        );
        expect(dialogStateOnFalse).toBe(true);
        // TODO:
        // expect(promiseStateMock.mock.results[1].value).toEqual(
        //   PromiseState.Fulfilled
        // );
        // expect(dialogStateOnFalse).toBe(false);
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
          beforeCancel: () => true,
        });
        dispatchCancel();
        // assert
        // TODO: expect(fakeDialogElement.open).toBe(false);
        expect(await promiseState(canceled)).toEqual(PromiseState.Fulfilled);
      });

      test("return false", async () => {
        // arrange:
        const beforeCancelMock = jest.fn();
        const { canceled } = unit.showModalAndWaitTillClosed({
          beforeCancel: beforeCancelMock,
        });
        const promiseStateMock = jest.fn(
          async (promise) => await promiseState(promise)
        );

        // act:
        beforeCancelMock.mockReturnValue(false);
        dispatchCancel();
        const dialogStateOnFalse = fakeDialogElement.open;
        await promiseStateMock(canceled);

        // TODO:
        // beforeConfirmMock.mockReturnValue(true);
        // dispatchCancel();
        // const dialogStateOnTrue = fakeDialogElement.open;
        // await promiseStateMock(canceled);

        // assert:
        expect(await promiseStateMock.mock.results[0].value).toBe(
          PromiseState.Pending
        );
        expect(dialogStateOnFalse).toBe(true);
        // TODO:
        // expect(promiseStateMock.mock.results[1].value).toEqual(
        //   PromiseState.Fulfilled
        // );
        // expect(dialogStateOnFalse).toBe(false);
      });
    });
  });
});
