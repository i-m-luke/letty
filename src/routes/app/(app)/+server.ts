import { json } from "@sveltejs/kit";
import { handlePOST, handleDELETE } from "./$server-logic";

export async function POST({ request, params }) {
  return handlePOST(await request.json(), params);
}

export async function DELETE({ request, params }) {
  handleDELETE(await request.json(), params);
  return json({}, { status: 201 });
}
