import TheradDAO from "$lib/DOA/ThreadDOA";
import { json } from "@sveltejs/kit";

import { _MongoDB } from "$lib/DB";
import type PageParams from "./PageParams";

const _mongodb = new _MongoDB();
const threadDOA = new TheradDAO(_mongodb);

export async function GET(request: Request, params: PageParams) {
  return json(threadDOA.getById(params.id), { status: 201 });
}

export async function POST(request: Request) {
  return new Response("..");
}

export async function PUT(request: Request) {
  return new Response("..");
}

export async function DELETE(request: Request) {
  return new Response("..");
}
