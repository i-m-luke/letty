import { json } from "@sveltejs/kit";
import type { ThreadData } from "$types";

export const actions = {
  "create-thread": async ({ request }) => {
    console.log('## FORM ACTION "CRATE-THREAD" ##');

    const formData = await request.formData();
    const rawData = Object.fromEntries(formData);
    const data = rawData as Object as ThreadData;

    console.log("formData:", formData);
    console.log("rawData:", rawData);
    console.log("data:", data);

    const nodeData = rawData.nodeData as any;
    console.log("nodeData", nodeData.userId);
  },

  "delete-thread": async () => {
    console.log("delete-thread form action");
  },

  "create-prompt": async () => {},

  "delete-prompt": async () => {},
};
