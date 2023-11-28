import { ZodObject, z, type ZodRawShape } from "zod";

// TODO: Přesunout sem TreeNodeInfo, atd. (z components)

//#region  SCHEMAs

export const WithParentIdSchema = z.object({
  parentId: z.string().optional(),
});

export const WithIdSchema = z.object({
  _id: z.string(),
});

const WithDataSchema = z.object({
  data: z.any(),
});

// NOTE: Bude sloužit k validaci např. při přístupu k userId property
export const BaseDBItemSchema = z
  .object({
    userId: z.string(),
  })
  .merge(WithIdSchema);

export const DBNodeSchema =
  BaseDBItemSchema.merge(WithParentIdSchema).merge(WithDataSchema);

export const NewDBNodeSchema = DBNodeSchema.omit({ _id: true });

export const FolderDataSchema = z.object({
  name: z.string(),
  itemsIds: z.array(z.string()), // NOTE: Nehodí se spíš na DBNode? K čemu je parentId?
});

export const PromptSchema = z
  .object({
    name: z.string(),
    text: z.string(),
  })
  .merge(WithIdSchema);

export const NewPromptSchema = PromptSchema.omit({ _id: true });
export const PostNewPromptSchema = NewPromptSchema.merge(
  WithParentIdSchema.required()
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
});

export const PostNewThreadSchema = NewThreadSchema.merge(
  WithParentIdSchema.required()
);

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
export type Prompt = z.infer<typeof PromptSchema>;
export type NewPrompt = z.infer<typeof NewPromptSchema>;
export type PostNewPrompt = z.infer<typeof PostNewPromptSchema>;
export type Thread = z.infer<typeof ThreadSchema>;
export type NewThread = z.infer<typeof NewThreadSchema>;
export type PostNewThread = z.infer<typeof PostNewThreadSchema>;
export type ThreadMessage = z.infer<typeof ThreadMessageSchema>;
export type SuccessfullResponse = z.infer<typeof SuccessfullResponseSchema>;
export type UnsuccessfullResponse = z.infer<typeof UnsuccessfullResponseSchema>;
export type Response = z.infer<typeof ResponseSchema>;
export type FolderData = z.infer<typeof FolderDataSchema>;

export type DBNode<TData> = z.infer<typeof DBNodeSchema> & {
  data: TData;
};

export type NewDBNode<TData> = z.infer<typeof NewDBNodeSchema> & {
  data: TData;
};

export const DBNodeSchemaWithData = <TObject extends ZodRawShape>(
  dataSchema: ZodObject<TObject>
) => DBNodeSchema.extend({ data: dataSchema });

export type ContentData = {
  name: string;
} & WithId;

export type SafeResponse<TData> =
  | Exclude<Response, SuccessfullResponse>
  | (Omit<SuccessfullResponse, "data"> & { data: TData });
