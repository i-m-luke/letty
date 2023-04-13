import FAKE_DB from '$lib/fake-db.js';
import { json } from '@sveltejs/kit';
import type PostData from './PostData';
import type PromptInfo from '$lib/PromptInfo';

let lastId: number = 100;

export async function POST({ request }) {
	const data = (await request.json()) as PostData;
	const promptInfo: PromptInfo = {
		id: ++lastId,
		parentId: data.parentId,
		name: data.promptName,
		prompt: data.prompt,
		childPrompts: []
	};

	inesertPromptInfoToDB(promptInfo);

	return json(promptInfo, { status: 201 });
}

// FAKE DB:

function findPromptInfo(id: number | null, collection: PromptInfo[]): PromptInfo | undefined {
	debugger
	
	let foundPromptInfo = collection.find((promptInfo) => promptInfo.id === id);

	if (foundPromptInfo === undefined) {
		for (const promptInfo of collection) {
			foundPromptInfo = findPromptInfo(id, promptInfo.childPrompts);
			if (foundPromptInfo !== undefined) {
				return foundPromptInfo;
			}
		}
	}

	return undefined;
}

function inesertPromptInfoToDB(promptInfo: PromptInfo): void {
	const foundPromptInfo = findPromptInfo(promptInfo.parentId, FAKE_DB.promptInfoCollection);
	foundPromptInfo?.childPrompts.push(promptInfo);
}
