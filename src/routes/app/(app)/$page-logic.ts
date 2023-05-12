// IMPURE CODE:

import { POSTType } from "./POSTRequest";
import type POSTRequest from "./POSTRequest";

export const fetchPOST =
  (type: POSTType) =>
  async <TData>(data: TData) => {
    const req: POSTRequest<TData> = {
      type,
      data,
    };
    return await fetch(`/app/`, {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

export const fetchPostCreateThread = fetchPOST(POSTType.CreateThread);
export const fetchPostCreatePrompt = fetchPOST(POSTType.CreatePrompt);
