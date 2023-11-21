import { json } from "@sveltejs/kit";
import { handlePOST, handleDELETE } from "./$server-logic";
import { RequestSchema } from "./Request";

export async function POST({ request, params }) {
  return handlePOST(RequestSchema.parse(await request.json()), params);
}

export async function DELETE({ request, params }) {
  handleDELETE(RequestSchema.parse(await request.json()), params);
  return json({}, { status: 201 });
}
