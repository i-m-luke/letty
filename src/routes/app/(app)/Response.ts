import { z } from "zod";

const SuccessfullResponseSchema = z.object({
  success: z.literal(true),
  data: z.any(),
});

const UnsuccessfullResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  issues: z.array(z.string()), // musí být key-value, aby bylo možné u dialogu říct, čeho se dané issue týká
});

export const ResponseSchema = z.discriminatedUnion("success", [
  SuccessfullResponseSchema,
  UnsuccessfullResponseSchema,
]);

export type SuccessfullResponse = z.infer<typeof SuccessfullResponseSchema>;
export type UnsuccessfullResponse = z.infer<typeof UnsuccessfullResponseSchema>;
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
