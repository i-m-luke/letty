import { PostFolder, PostPrompt, PostThread, WithParentId } from "$types";
import { z } from "zod";

export enum RequestType {
  Thread = "Thread",
  Prompt = "Prompt",
  PromptFolder = "PromptFolder",
  ThreadFolder = "ThreadFolder",
}

export const DeleteRequestDataSchema = z
  .object({
    _id: z.string(),
  })
  .merge(WithParentId.required());

export type DeleteRequestData = z.infer<typeof DeleteRequestDataSchema>;

export const DeleteRequestSchema = z.object({
  type: z.nativeEnum(RequestType),
  data: DeleteRequestDataSchema,
});

export type DeleteRequest = z.infer<typeof DeleteRequestSchema>;

export const PostRequestSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal(RequestType.Thread), data: PostThread }),
  z.object({ type: z.literal(RequestType.Prompt), data: PostPrompt }),
  z.object({
    type: z.literal(RequestType.PromptFolder),
    data: PostFolder,
  }),
  z.object({
    type: z.literal(RequestType.ThreadFolder),
    data: PostFolder,
  }),
]);

export type PostRequest = z.infer<typeof PostRequestSchema>;
