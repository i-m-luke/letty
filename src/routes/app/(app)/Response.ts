import { z } from "zod";

export const ResponseSchema = z.object({
  success: z.boolean(),
});

export const SuccessulResponseSchema = z.object({
  data: z.any(),
});

export const UnsuccessfulResponseSchema = z.object({
  error: z.string(),
  issues: z.array(z.string().length(1, { message: "" })),
});

export type Response =
  | ({ success: true } & z.infer<typeof SuccessulResponseSchema>)
  | ({ success: false } & z.infer<typeof UnsuccessfulResponseSchema>);

// NOTE:
// Klient dostane odpověď od serveru
// Provede validaci objektu Response
// Poté nahledné do successfull a na základě hodnoty provede další akci (zpracuje buď data, nebo error a issue)
const clientSide = (_res: Response) => {
  const res = ResponseSchema.parse(_res);
  if (res.success) {
    const { data } = SuccessulResponseSchema.parse(res);
    // ...
  } else {
    const { error, issues } = UnsuccessfulResponseSchema.parse(res);
    // ...
  }
};
