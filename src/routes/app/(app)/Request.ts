import { z } from "zod";

export enum RequestType {
  Thread = "Thread",
  Prompt = "Prompt",
}

export const RequestDataSchema = z.object({});

export type RequestData = z.infer<typeof RequestDataSchema>;

export const RequestSchema = z
  .object({
    type: z.nativeEnum(RequestType),
  })
  .extend({ data: RequestDataSchema });

export type Request = z.infer<typeof RequestSchema>;
