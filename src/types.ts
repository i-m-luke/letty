import { ZodObject, z, type ZodRawShape } from "zod";

// TODO: Přesunout sem TreeNodeInfo, atd. (z components)

//#region  SCHEMAs

export const WithIdSchema = z.object({
  _id: z.string(),
});

export const WithParentIdSchema = z.object({
  parentId: z.string(),
});

const WithDataSchema = z.object({
  data: z.any(),
});

export const DBNodeSchema = WithIdSchema.merge(WithParentIdSchema);

export const BaseDBNodeSchema = <TObject extends ZodRawShape>(
  dataSchema: ZodObject<TObject>
) => DBNodeSchema.merge(dataSchema);

export const NewDBNodeSchema = DBNodeSchema.omit({ _id: true });

export const FolderSchema = BaseDBNodeSchema(
  z.object({
    name: z.string(),
  })
);

export const NewFolderSchema = FolderSchema.omit({ _id: true });

export const PromptSchema = BaseDBNodeSchema(
  z.object({
    name: z.string(),
    text: z.string(),
  })
);

export const NewPromptSchema = PromptSchema.omit({ _id: true });

export const ThreadMessageSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const ThreadSchema = BaseDBNodeSchema(
  z.object({
    name: z.string(),
    messages: z.array(ThreadMessageSchema),
  })
);

export const NewThreadSchema = ThreadSchema.omit({
  _id: true,
});

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
export type WithParentId = z.infer<typeof WithParentIdSchema>;
export type Prompt = z.infer<typeof PromptSchema>;
export type NewPrompt = z.infer<typeof NewPromptSchema>;
export type Thread = z.infer<typeof ThreadSchema>;
export type NewThread = z.infer<typeof NewThreadSchema>;
export type ThreadMessage = z.infer<typeof ThreadMessageSchema>;
export type SuccessfullResponse = z.infer<typeof SuccessfullResponseSchema>;
export type UnsuccessfullResponse = z.infer<typeof UnsuccessfullResponseSchema>;
export type Response = z.infer<typeof ResponseSchema>;
export type Folder = z.infer<typeof FolderSchema>;
export type NewFolder = z.infer<typeof NewFolderSchema>;

export type DBNode<TData> = z.infer<typeof DBNodeSchema> & {
  data: TData;
};

export type NewDBNode<TData> = z.infer<typeof NewDBNodeSchema> & {
  data: TData;
};

export type ContentData = {
  name: string;
} & WithId;

export type SafeResponse<TData> =
  | Exclude<Response, SuccessfullResponse>
  | (Omit<SuccessfullResponse, "data"> & { data: TData });
