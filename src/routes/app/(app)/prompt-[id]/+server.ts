import { json } from '@sveltejs/kit';
import type PostData from './PostData';
import type { PromptInfo } from '$types';
import { v4 as uuid } from 'uuid';

// import { db, PromptDataDOA } from "$db"
// const promptDataDOA = new PromptDataDOA(db);

export async function POST({ request }) {
	const data = (await request.json()) as PostData;
	const promptInfo: PromptInfo = {
		id: uuid(),
		parentId: data.parentId,
		name: data.promptName,
		prompt: data.prompt,
		chidren: []
	};

	// promptDataDOA.insertOne(promptInfo);

	return json(promptInfo, { status: 201 });
}
