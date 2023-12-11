import { ZodObject, z, type ZodRawShape } from "zod";

// TODO: Přesunout sem TreeNodeInfo, atd. (z components)

//#region  SCHEMAs

export const WithIdSchema = z.object({
  _id: z.string(),
});

export const WithParentIdSchema = z.object({
  parentId: z.string(),
});

export const DBNodeSchema = WithIdSchema.merge(WithParentIdSchema);

export const NewDBNodeSchema = DBNodeSchema.omit({ _id: true });

export const BaseDBNodeSchema = <TObject extends ZodRawShape>(
  dataSchema: ZodObject<TObject>
) => DBNodeSchema.merge(dataSchema);

export const FolderDataSchema = z.object({
  name: z.string(),
});
export const FolderSchema = BaseDBNodeSchema(FolderDataSchema);
export const PostFolderSchema = FolderSchema.omit({ _id: true });
export const UpdateFolderSchema = FolderDataSchema.merge(WithParentIdSchema)
  .partial()
  .merge(WithIdSchema);

export const PromptDataSchema = z.object({
  name: z.string(),
  text: z.string().optional(),
});
export const PromptSchema = BaseDBNodeSchema(PromptDataSchema);
export const PostPromptSchema = PromptSchema.omit({ _id: true });
export const UpdatePromptSchema = PromptDataSchema.merge(WithParentIdSchema)
  .partial()
  .merge(WithIdSchema);

export const ThreadMessageSchema = z.object({
  question: z.string(),
  answer: z.string(),
});
export const ThreadDataSchema = z.object({
  name: z.string(),
  messages: z.array(ThreadMessageSchema).optional(),
});
export const ThreadSchema = BaseDBNodeSchema(ThreadDataSchema);
export const PostThreadSchema = ThreadSchema.omit({ _id: true });
export const UpdateThreadSchema = ThreadDataSchema.merge(WithParentIdSchema)
  .partial()
  .merge(WithIdSchema);

const SuccessfullResponseSchema = z.object({
  success: z.literal(true),
  data: z.any(),
});

const UnsuccessfullResponseSchema = z.object({
  success: z.literal(false),
  issues: z.array(
    z.object({
      type: z.string().or(z.number()),
      message: z.string(),
    })
  ), // musí být key-value, aby bylo možné u dialogu říct, čeho se dané issue týká
});

export const ResponseSchema = z.discriminatedUnion("success", [
  SuccessfullResponseSchema,
  UnsuccessfullResponseSchema,
]);

//#endregion

export type WithId = z.infer<typeof WithIdSchema>;
export type WithParentId = z.infer<typeof WithParentIdSchema>;
export type DBNode = z.infer<typeof DBNodeSchema>;
export type NewDBNode = z.infer<typeof NewDBNodeSchema>;

export type Prompt = z.infer<typeof PromptSchema>;
export type PostPrompt = z.infer<typeof PostPromptSchema>;
export type UpdatePrompt = z.infer<typeof UpdatePromptSchema>;

export type ThreadMessage = z.infer<typeof ThreadMessageSchema>;
export type Thread = z.infer<typeof ThreadSchema>;
export type PostThread = z.infer<typeof PostThreadSchema>;
export type UpdateThread = z.infer<typeof UpdateThreadSchema>;

export type Folder = z.infer<typeof FolderSchema>;
export type PostFolder = z.infer<typeof PostFolderSchema>;
export type UpdateFolder = z.infer<typeof UpdateFolderSchema>;

export type SuccessfullResponse = z.infer<typeof SuccessfullResponseSchema>;
export type UnsuccessfullResponse = z.infer<typeof UnsuccessfullResponseSchema>;
export type Response = z.infer<typeof ResponseSchema>;

export type SafeResponse<TData> =
  | Exclude<Response, SuccessfullResponse>
  | (Omit<SuccessfullResponse, "data"> & { data: TData });
