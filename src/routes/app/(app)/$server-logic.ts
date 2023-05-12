// LOGIKA PRO SERVER
import type POSTRequest from "./POSTRequest";
import { POSTType } from "./POSTRequest";
import { goto } from "$app/navigation";

export const handlePOST = <TData>(data: POSTRequest<TData>) => {
  switch (data.type) {
    case POSTType.CreatePrompt:
      handleCreatePromptReq(data);
    case POSTType.CreateThread:
      handleCreateThreadReq(data);
  }
};

// IMPURE CODE:
export const handleRequest =
  <TData>(handleFn: (data: TData) => void, gotoUrl?: string) =>
  (data: TData) => {
    handleFn(data);
    if (gotoUrl) goto(gotoUrl); // This line makes functions impure ...
  };

// ... but accessing DB makes it also inpure, so whatever
export const handleCreatePromptReq = handleRequest(() => {
  /* ... store some data */
}, "some/prompt/url/...");

export const handleCreateThreadReq = handleRequest(() => {
  /* ... store some data */
}, "some/thread/url/...");
