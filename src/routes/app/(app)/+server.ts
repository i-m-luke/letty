import { json } from "@sveltejs/kit";
import { handlePOST, handleDELETE } from "./$server-logic";

export async function POST({ request, params }) {
  handlePOST(await request.json(), params);
  return json({}, { status: 201 });
}

export async function DELETE({ request, params }) {
  handleDELETE(await request.json(), params);
  return json({}, { status: 201 });
}
