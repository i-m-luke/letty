// import { z } from "zod";

// const ResponseSchema = z.object({
//   success: z.boolean()),
// });

// const SuccessulResponseSchema = z.object({
//   data: z.any(),
// });

// const UnsuccessfulResponseSchema = z.object({
//   error: z.string(),
//   issues: z.array(z.string().length(1, { message: ""})),
// });

// type Response =
//   | ({ sucess: true } & z.infer<typeof SuccessulResponseSchema>)
//   | ({ sucess: false } & z.infer<typeof UnsuccessfulResponseSchema>);

// const obj: Response = {
//   sucess: true,
// };
