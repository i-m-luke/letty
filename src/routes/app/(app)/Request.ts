// TODO: Implement type validation

// import { z } from "zod";

// export enum RequestType {
//   Thread = "Thread",
//   Prompt = "Prompt",
// }

// const RequestValidator = z.object({
//   type: z.nativeEnum(RequestType),
//   data: z.unknown(),
// });

// type Request = z.infer<typeof RequestValidator>;

// export default Request;

export enum RequestType {
  Thread = "Thread",
  Prompt = "Prompt",
}

type Request<TData> = {
  type: RequestType;
  data: TData;
};

export default Request;
