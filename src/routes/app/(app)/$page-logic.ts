// IMPURE CODE:

export const fetchThreadPOST = async () => {
  // TODO
  const response = await fetch(`/app/thread`, {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchThreadDELETE = () => {
  /* delete thread ... */
};

export const fetchThreadPUT = () => {
  /* rename thread ... */
};

export const fetchPromptPOST = async () => {
  // TODO
  const response = await fetch(`/app/prompt`, {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchPromptDELETE = () => {
  /* delete prompt ... */
};

export const fetchPromptPUT = () => {
  /* rename prompt ... */
};
