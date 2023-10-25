import { json } from "@sveltejs/kit";
import { handlePOST, handleDELETE } from "./$server-logic";
import type Request from "./Request";

export async function POST({ request, params }) {
  handlePOST((await request.json()) as Request, params);
  return json({}, { status: 201 });
}

export async function DELETE({ request, params }) {
  handleDELETE((await request.json()) as Request, params);
  return json({}, { status: 201 });
}
