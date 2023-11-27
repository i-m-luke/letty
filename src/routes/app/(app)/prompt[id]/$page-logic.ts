import type { Prompt } from "$types";
import routes from "$routes";
import type { PostRequest } from "./PostRequest";

// IMPURE CODE:
export const fetchPOST = async (
  parentId: string,
  promptName: string,
  text: string
) => {
  const postData: PostRequest = { parentId, promptName, text };

  const response = await fetch(routes.static.prompt, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const promptInfo = (await response.json()) as Prompt;
  alert("NEW SAVED PROMPT INFO ID:" + promptInfo._id);
};
