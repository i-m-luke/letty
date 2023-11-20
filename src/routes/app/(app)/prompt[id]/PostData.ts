import { z } from "zod";

export const PostDataValidator = z.object({
  parentId: z.string(),
  promptName: z.string(),
  prompt: z.string(),
});

export type PostData = z.infer<typeof PostDataValidator>;
