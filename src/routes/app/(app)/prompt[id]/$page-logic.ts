import type PostData from "./PostData";
import type { Prompt } from "$types";
import routes from "$routes";

// IMPURE CODE:
export const fetchPOST = async (
  parentId: string,
  promptName: string,
  prompt: string
) => {
  const postData: PostData = { parentId, promptName, prompt };

  const response = await fetch(routes.static.prompt, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const promptInfo = (await response.json()) as Prompt;
  alert("NEW SAVED PROMPT INFO ID:" + promptInfo.id);
};
