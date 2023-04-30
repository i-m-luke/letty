import type PostData from "./PostData";
import type { PromptInfo } from "$types";

// IMPURE CODE:
export const postSavedPrompt = async (
  parentId: string,
  promptName: string,
  prompt: string
) => {
  const postData: PostData = { parentId, promptName, prompt };

  const response = await fetch(`/app/prompt-x`, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const promptInfo = (await response.json()) as PromptInfo;
  alert("NEW SAVED PROMPT INFO ID:" + promptInfo.id);
};
