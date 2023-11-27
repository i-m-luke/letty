import type { WithId as MongoWithId, Document } from "mongodb";
import { z } from "zod";

// TODO: Přesunout sem TreeNodeInfo, atd. (z components)

//#region  SCHEMAs

// TODO: Move to $schemas?

export const ParentId = z.object({
  parentId: z.string().nullable(),
});

export const WithIdSchema = z.object({
  _id: z.string(),
});

export const PromptSchema = z
  .object({
    name: z.string(),
    text: z.string(),
  })
  .merge(WithIdSchema);

export const NewPromptSchema = PromptSchema.omit({ _id: true, text: true }).merge(
  ParentId
);

export const ThreadMessageSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const ThreadSchema = z
  .object({
    name: z.string(),
    messages: z.array(ThreadMessageSchema),
  })
  .merge(WithIdSchema);

export const NewThreadSchema = ThreadSchema.omit({
  _id: true,
  messages: true,
}).merge(ParentId);

const SuccessfullResponseSchema = z.object({
  success: z.literal(true),
  data: z.any(),
});

const UnsuccessfullResponseSchema = z.object({
  success: z.literal(false),
  issues: z.array(z.string()), // musí být key-value, aby bylo možné u dialogu říct, čeho se dané issue týká
});

export const ResponseSchema = z.discriminatedUnion("success", [
  SuccessfullResponseSchema,
  UnsuccessfullResponseSchema,
]);

//#endregion

export type WithId = z.infer<typeof WithIdSchema>;
export type NewPrompt = z.infer<typeof NewPromptSchema>; // Zašle se v requestu na server (proto je vynechána prop "id")
export type Prompt = z.infer<typeof PromptSchema>; // Získá se z response na clientu
export type NewThread = z.infer<typeof NewThreadSchema>; // Zašle se v requestu na server (proto je vynechána prop "id")
export type Thread = z.infer<typeof ThreadSchema>; // Získá se z response na clientu
export type ThreadMessage = z.infer<typeof ThreadMessageSchema>;
export type SuccessfullResponse = z.infer<typeof SuccessfullResponseSchema>;
export type UnsuccessfullResponse = z.infer<typeof UnsuccessfullResponseSchema>;
export type Response = z.infer<typeof ResponseSchema>;

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

export type SafeResponse<TData> =
  | Exclude<Response, SuccessfullResponse>
  | (Omit<SuccessfullResponse, "data"> & { data: TData });

export type DBItem<Data> = MongoWithId<Document> & Data;
