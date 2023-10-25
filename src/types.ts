// alias module

import type { WithId as MongoWithId, Document } from "mongodb";

// TODO: Přesunout sem TreeNodeInfo, atd. (z components)

//#region  DATA

export type FolderData = {
  name: string;
  itemsIds: string[];
};

export type WithId = {
  _id: string;
};

export type ContentData = {
  name: string;
} & WithId;

export type PromptData = {
  name: string;
  prompt: string;
} & WithId;

export type ThreadData = {
  name: string;
  messages: {
    a: string;
    q: string;
  }[];
} & WithId;

//#endregion

// TODO: Nahradit za PromptData
export type PromptInfo = {
  id: string;
  parentId: string | null; // ... null je fuj!
  name: string;
  prompt: string;
  chidren: PromptInfo[];
};

// TODO: Nahradit za ThreadData
export type ThreadInfo = {
  id: number;
  name: string;
  children: ThreadInfo[];
};

export type DBNode<TData> = {
  userId: string;
  parentId?: string;
  data: TData;
} & WithId;

export type DBItem<Data> = MongoWithId<Document> & Data;
