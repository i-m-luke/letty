// IMPURE CODE:

import { RequestType } from "./Request";
import type Request from "./Request";
import type { TreeNodeInfoData } from "$lib/components/Tree";

//#region  POST

export const fetchPOST =
  <TData>(type: RequestType) =>
  async (data: TData) => {
    const req: Request = {
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

export const fetchPostThread = fetchPOST<TreeNodeInfoData>(RequestType.Thread);
export const fetchPostPrompt = fetchPOST<TreeNodeInfoData>(RequestType.Prompt);

//#endregion

//#region  DELETE

export const fetchDELETE =
  <TData>(type: RequestType) =>
  async (data: TData) => {
    const req: Request = {
      type,
      data,
    };
    return await fetch(`/app/`, {
      method: "DELETE",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

export const fetchDeleteThread = fetchDELETE<TreeNodeInfoData>(RequestType.Thread);
export const fetchDeletePrompt = fetchDELETE<TreeNodeInfoData>(RequestType.Prompt);

//#endregion
