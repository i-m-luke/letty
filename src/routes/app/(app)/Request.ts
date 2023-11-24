import { NewPromptSchema, NewThreadSchema } from "$types";
import { z } from "zod";

export enum RequestType {
  Thread = "Thread",
  Prompt = "Prompt",
}

export const PostRequestDataSchema = z.object({
  _id: z.string(),
  _folderId: z.string(),
  name: z.string(),
});

export type PostRequestData = z.infer<typeof PostRequestDataSchema>;

export const PostRequestSchema = z
  .object({
    type: z.nativeEnum(RequestType),
  })
  .extend({ data: PostRequestDataSchema });

export type PostRequest = z.infer<typeof PostRequestSchema>;

export const DeleteRequestDataSchema = z.object({
  _id: z.string(),
  _folderId: z.string(),
});

export type DeleteRequestData = z.infer<typeof DeleteRequestDataSchema>;

export const DeleteRequestSchema = z
  .object({
    type: z.nativeEnum(RequestType),
  })
  .extend({ data: DeleteRequestDataSchema });

export type DeleteRequest = z.infer<typeof DeleteRequestSchema>;

export const RequestSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal(RequestType.Thread), data: NewThreadSchema }),
  z.object({ type: z.literal(RequestType.Prompt), data: NewPromptSchema }),
]);

export type Request = z.infer<typeof RequestSchema>;
