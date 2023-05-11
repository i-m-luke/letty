export const actions = {
  "run-prompt": async ({ request }) => {
    console.log('## FORM ACTION "RUN-PROMPT" ##');
    const formData = await request.formData();
    const rawData = Object.fromEntries(formData);
    console.log("form data:", rawData);
  },
};
