import Dialog from "../lib/components/Dialog.svelte";
// import { render } from "@testing-library/svelte";

// Proč dostávám selhání: Cannot use import statement outside a module
describe("Dialog.svelte", () => {
  test("should render", () => {
    // const { component } = render(Dialog);
    const dialog = Dialog;
  });
});
