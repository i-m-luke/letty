export const actions = {
  "send-message": async ({ request }) => {
    // TODO: Napojit na funkce z "src/ai-interface"
    console.log('## FORM ACTION "SEND-MESSAGE" ##');
    const formData = await request.formData();
    const rawData = Object.fromEntries(formData);
    console.log("form data:", rawData);
  },
};
