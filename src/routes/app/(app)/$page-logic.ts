import type PageData from "./PageData";
import type PageLoadData from "./PageLoadData";
import { transformData as transformLayoutData } from "./$layout-logic";

// PURE CODE:

export const transformData = (data: PageLoadData): PageData => {
  return transformLayoutData(data);
};

// IMPURE CODE:

export const fetchThreadPOST = () => {};
export const fetchThreadDELETE = () => {};
export const fetchThreadPUT = () => {
  /* rename thread ... */
};

export const fetchPromptPOST = () => {};
export const fetchPromptDELETE = () => {};
export const fetchPromptPUT = () => {
  /* rename prompt ... */
};
