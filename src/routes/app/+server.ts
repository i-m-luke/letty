import FAKE_DB, { inesertPromptInfoToDB } from '$lib/fake-db.js';
import { json } from '@sveltejs/kit';

const savedPrompts = [];
let lastId: number = 1;

export async function POST({ request }) {
	const savedPrompt = await request.json();

	const savedPromptId = ++lastId;
	savedPrompts.push({
		id: savedPromptId,
		prompt: savedPrompt
	});
	const fakeDb = FAKE_DB;
    
	inesertPromptInfoToDB(savedPrompt);

	return json({ id: savedPromptId }, { status: 201 });
}
