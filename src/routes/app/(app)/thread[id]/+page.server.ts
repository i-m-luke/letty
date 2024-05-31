export async function load() {
  return {
    messages: [
      { question: "...default question...", answer: "...default answer..." },
    ],
  };
}

export const actions = {
  "send-message": async ({ request }) => {
    // TODO: Napojit na funkce z "src/ai-interface
    // TODO: Uložit data do DB
    const formData = await request.formData();
    const rawData = Object.fromEntries(formData); // ZOD?
    return {
      question: rawData?.message,
      answer: "some answer",
    };
  },
};
