import type { WithId } from "$types";

export const actions = {
  "create-thread": async ({ request }) => {
    console.log("create-thread form action");
    const data = await request.formData();
    const id = data.get("_id");
    const name = data.get("name");
    const messages = data.get("messages");
    console.log("node id:" + id);
    console.log("node name:" + name);
    console.log("node messages:" + messages);
  },

  "delete-thread": async () => {
    console.log("delete-thread form action");
  },

  "create-prompt": async () => {},

  "delete-prompt": async () => {},
};
