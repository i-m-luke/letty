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

// TODO:

const _BaseRequestSchema = z.object({
  _id: z.string(),
  _folderId: z.string(),
});

const _RequestSchema = z.discriminatedUnion("type", [
  _BaseRequestSchema.merge(z.object({ type: z.literal(RequestType.Thread) })),
  _BaseRequestSchema.merge(
    z.object({ type: z.literal(RequestType.Prompt), name: z.string() })
  ),
]);

type _Request = z.infer<typeof _RequestSchema>;

const fn = (req: _Request) => {
  switch (req.type) {
    case RequestType.Prompt:
      console.log("has name:", req.name);
      break;
    case RequestType.Thread:
      console.log("has doesn't have a name");
      break;
  }
};
