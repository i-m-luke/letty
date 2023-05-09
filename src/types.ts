// alias module

import type { WithId, Document } from "mongodb";

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

export type FolderData = {
  name: string;
  itemsIds: string[];
};

export type FolderItem = {
  _id: string;
  name: string;
};

export type PromptData = {
  _id: string;
  name: string;
  prompt: string;
};

export type ThreadData = {
  _id: string;
  name: string;
  messages: {
    a: string;
    q: string;
  }[];
};

export type DBNode<TData> = {
  _id: string;
  userId: string;
  parentId?: string;
  data: TData;
};

export type DBItem<Data> = WithId<Document> & Data;
