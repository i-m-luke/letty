// alias module

export type PromptInfo = {
  id: string;
  parentId: string | null; // ... null je fuj!
  name: string;
  prompt: string;
  chidren: PromptInfo[];
};

export type ThreadInfo = {
  id: number;
  name: string;
  children: ThreadInfo[];
};

export type PromptData = {
  name: string;
  prompt: string;
};

export type ThreadData = {
  name: string;
  messages: string[];
};

export type DBNode<TData> = {
  id: string;
  userId: string;
  parentId?: string;
  data: TData;
};
