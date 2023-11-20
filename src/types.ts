import type { WithId as MongoWithId, Document } from "mongodb";
import { z } from "zod";

// TODO: Přesunout sem TreeNodeInfo, atd. (z components)

//#region  SCHEMAs

// TODO: Move to $schemas?

export const WithIdSchema = z.object({
  _id: z.string(),
});

export const PromptDataSchema = z
  .object({ name: z.string(), prompt: z.string() })
  .merge(WithIdSchema);

export const ThreadDataSchema = z
  .object({
    name: z.string(),
    messages: z.array(z.object({ a: z.string(), q: z.string() })),
  })
  .merge(WithIdSchema);

export const PromptInfoSchema = z.object({
  id: z.string(),
  parentId: z.string().nullable(), // ... null je fuj! ... ale lepší jak undefined
  name: z.string(),
  prompt: z.string(),
});

export const ThreadInfoSchema = z.object({
  id: z.string(),
  parentId: z.string().nullable(), // ... null je fuj! ... ale lepší jak undefined
  name: z.string(),
});

//#endregion

export type WithId = z.infer<typeof WithIdSchema>;
export type PromptData = z.infer<typeof PromptDataSchema>;
export type ThreadData = z.infer<typeof ThreadDataSchema>;
export type PromptInfo = z.infer<typeof PromptInfoSchema>;
export type ThreadInfo = z.infer<typeof PromptInfoSchema>;

export type FolderData = {
  name: string;
  itemsIds: string[];
};

export type ContentData = {
  name: string;
} & WithId;

export type DBNode<TData> = {
  userId: string;
  parentId?: string;
  data: TData;
} & WithId;

export type DBItem<Data> = MongoWithId<Document> & Data;
