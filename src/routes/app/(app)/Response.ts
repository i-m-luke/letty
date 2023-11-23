import { z } from "zod";

export const ResponseSchema = z.discriminatedUnion("success", [
  z.object({ success: z.literal(true), data: z.any() }),
  z.object({
    success: z.literal(false),
    error: z.string(),
    issues: z.array(z.string()),
  }),
]);

export type Response = z.infer<typeof ResponseSchema>;

// NOTE:
// Klient dostane odpověď od serveru
// Provede validaci objektu Response
// Poté nahledné do successfull a na základě hodnoty provede další akci (zpracuje buď data, nebo error a issue)
const clientSide = (_res: Response) => {
  const res = ResponseSchema.parse(_res);
  if (res.success) {
    const { data } = res;
    // ...
  } else {
    const { error, issues } = res;
    // ...
  }
};


