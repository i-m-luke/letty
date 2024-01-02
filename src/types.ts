import { ZodObject, z, type ZodRawShape } from "zod";

// TODO: Přesunout sem TreeNodeInfo, atd. (z components)

export const BaseDBNodeSchema = <TObject extends ZodRawShape>(
  dataSchema: ZodObject<TObject>
) => DBNode.merge(dataSchema);

//#region  SCHEMAs

export const WithId = z.object({
  _id: z.string(),
});

export const WithParentId = z.object({
  parentId: z.string(),
});

export const DBNode = WithId.merge(WithParentId);

export const NewDBNode = DBNode.omit({ _id: true });

export const FolderData = z.object({
  name: z.string(),
});

export const Folder = BaseDBNodeSchema(FolderData);

export const PostFolder = Folder.omit({ _id: true });

export const UpdateFolder = FolderData.merge(WithParentId).partial().merge(WithId);

export const PromptDataSchema = z.object({
  name: z.string(),
  text: z.string().optional(),
});

export const Prompt = BaseDBNodeSchema(PromptDataSchema);

export const PostPrompt = Prompt.omit({ _id: true });

export const UpdatePrompt = PromptDataSchema.merge(WithParentId)
  .partial()
  .merge(WithId);

export const ThreadMessage = z.object({
  question: z.string(),
  answer: z.string(),
});

export const ThreadData = z.object({
  name: z.string(),
  messages: z.array(ThreadMessage).optional(),
});

export const Thread = BaseDBNodeSchema(ThreadData);

export const PostThread = Thread.omit({ _id: true });

export const UpdateThread = ThreadData.merge(WithParentId).partial().merge(WithId);

const SuccessfullResponse = z.object({
  success: z.literal(true),
  data: z.any(),
});

const UnsuccessfullResponse = z.object({
  success: z.literal(false),
  issues: z.array(
    z.object({
      type: z.string().or(z.number()),
      message: z.string(),
    })
  ), // musí být key-value, aby bylo možné u dialogu říct, čeho se dané issue týká
});

export const Response = z.discriminatedUnion("success", [
  SuccessfullResponse,
  UnsuccessfullResponse,
]);

//#endregion

export type WithId = z.infer<typeof WithId>;
export type WithParentId = z.infer<typeof WithParentId>;
export type DBNode = z.infer<typeof DBNode>;
export type NewDBNode = z.infer<typeof NewDBNode>;

export type Prompt = z.infer<typeof Prompt>;
export type PostPrompt = z.infer<typeof PostPrompt>;
export type UpdatePrompt = z.infer<typeof UpdatePrompt>;

export type ThreadMessage = z.infer<typeof ThreadMessage>;
export type Thread = z.infer<typeof Thread>;
export type PostThread = z.infer<typeof PostThread>;
export type UpdateThread = z.infer<typeof UpdateThread>;

export type Folder = z.infer<typeof Folder>;
export type PostFolder = z.infer<typeof PostFolder>;
export type UpdateFolder = z.infer<typeof UpdateFolder>;

export type SuccessfullResponse = z.infer<typeof SuccessfullResponse>;
export type UnsuccessfullResponse = z.infer<typeof UnsuccessfullResponse>;
export type Response = z.infer<typeof Response>;

export type SafeResponse<TData> =
  | Exclude<Response, SuccessfullResponse>
  | (Omit<SuccessfullResponse, "data"> & { data: TData });
