import {
  PostNewPromptSchema,
  PostNewThreadSchema,
  WithParentIdSchema,
} from "$types";
import { z } from "zod";

export enum RequestType {
  Thread = "Thread",
  Prompt = "Prompt",
}

export const DeleteRequestDataSchema = z
  .object({
    _id: z.string(),
  })
  .merge(WithParentIdSchema.required());

export type DeleteRequestData = z.infer<typeof DeleteRequestDataSchema>;

export const DeleteRequestSchema = z.object({
  type: z.nativeEnum(RequestType),
  data: DeleteRequestDataSchema,
});

export type DeleteRequest = z.infer<typeof DeleteRequestSchema>;

export const PostRequestSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal(RequestType.Thread), data: PostNewThreadSchema }),
  z.object({ type: z.literal(RequestType.Prompt), data: PostNewPromptSchema }),
]);

export type PostRequest = z.infer<typeof PostRequestSchema>;
