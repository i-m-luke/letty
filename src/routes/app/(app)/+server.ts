import { json } from "@sveltejs/kit";
import { handlePOST, handleDELETE } from "./$server-logic";
import type PostRequest from "./PostRequest";
import type DeleteRequest from "./DeleteRequest";

export async function POST({ request, params }) {
  handlePOST((await request.json()) as PostRequest, params);
  return json({}, { status: 201 });
}

export async function DELETE({ request, params }) {
  handleDELETE((await request.json()) as DeleteRequest, params);
  return json({}, { status: 201 });
}
