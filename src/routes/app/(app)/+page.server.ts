export const actions = {
  "create-thread": async ({ request }) => {
    const data = await request.formData();
    const nodeInfo = data.get("node-value");
    // TODO ...
  },
  "delete-thread": async () => {},
  "create-prompt": async () => {},
  "delete-prompt": async () => {},
};
