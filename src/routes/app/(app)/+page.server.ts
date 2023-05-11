import type { ThreadData } from "$types";

export const actions = {
  "create-thread": async ({ request }) => {
    console.log('## FORM ACTION "CRATE-THREAD" ##');

    const formData = await request.formData();
    const rawData = Object.fromEntries(formData);
    const data = rawData as any;
    const threadData = data as ThreadData;
    const nodeData = JSON.parse(data.nodeData ?? "{}");

    console.log("data:", data);
    console.log("data.nodeData:", data.nodeData);
    console.log("nodeData - parsed:", nodeData);
  },

  "delete-thread": async () => {
    console.log("delete-thread form action");
  },

  "create-prompt": async () => {},

  "delete-prompt": async () => {},
};
