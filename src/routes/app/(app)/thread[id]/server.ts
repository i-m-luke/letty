import { json } from "@sveltejs/kit";

export async function GET(request: Request) {
  return json({}); // Občas je nutné provést konverzi na JSON
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
