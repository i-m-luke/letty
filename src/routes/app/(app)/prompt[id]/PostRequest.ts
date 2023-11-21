import { z } from "zod";

export const PostRequestSchema = z.object({
  parentId: z.string(),
  promptName: z.string(),
  prompt: z.string(),
});

export type PostRequest = z.infer<typeof PostRequestSchema>;
