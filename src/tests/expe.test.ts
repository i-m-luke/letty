const add = (x: number, y: number) => x + y;

describe("expe tests", () => {
  test("add-fn", () => {
    const addMockFn = jest.fn(add);
    const testData = [
      { args: [1, 1], exp: 2 },
      { args: [2, 3], exp: 5 },
    ];

    testData.forEach(({ args: [x, y] }) => addMockFn(x, y));
    testData.forEach(({ args, exp }, callIndex) => {
      args.forEach((arg, argIndex) =>
        expect(addMockFn.mock.calls[callIndex][argIndex]).toBe(arg)
      );
      expect(addMockFn.mock.results[callIndex].value).toBe(exp);
    });
  });
  test("fn", () => {
    let fn: () => void | undefined | number;

    fn = () => 10;
    console.log("num", fn());
    fn = () => {};
    console.log("void", fn());
    fn = () => undefined;
    console.log("undefined", fn());
  });
});
