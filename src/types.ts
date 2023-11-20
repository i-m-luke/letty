import type { WithId as MongoWithId, Document } from "mongodb";
import { z } from "zod";

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

export const PromptInfoValidator = z.object({
  id: z.string(),
  parentId: z.string().nullable(), // ... null je fuj! ... ale lepší jak undefined
  name: z.string(),
  prompt: z.string(),
});

export type PromptInfo = z.infer<typeof PromptInfoValidator>;

export const ThreadInfoValidator = z.object({
  id: z.string(),
  parentId: z.string().nullable(), // ... null je fuj! ... ale lepší jak undefined
  name: z.string(),
});

export type ThreadInfo = z.infer<typeof PromptInfoValidator>;

export type DBNode<TData> = {
  userId: string;
  parentId?: string;
  data: TData;
} & WithId;

export type DBItem<Data> = MongoWithId<Document> & Data;
