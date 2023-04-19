import FAKE_DB from '$lib/DB.js';
import { json } from '@sveltejs/kit';
import type PostData from './PostData';
import type { PromptInfo } from '$types';
import { v4 as uuid } from 'uuid';

let lastId: number = 100;

export async function POST({ request }) {
	const data = (await request.json()) as PostData;
	const promptInfo: PromptInfo = {
		id: uuid(),
		parentId: data.parentId,
		name: data.promptName,
		prompt: data.prompt,
		chidren: []
	};

	const promptInfoCollection = FAKE_DB.promptInfoCollection;
	const parentPromptInfo = findPromptInfoById(promptInfo.parentId, promptInfoCollection);
	if (parentPromptInfo === undefined) {
		throw new Error(`parent info wasn't found. Parent Info Id: ${promptInfo.parentId}`);
	}
	parentPromptInfo.chidren.push(promptInfo);

	return json(promptInfo, { status: 201 });
}

// FAKE DB:

// BETTER, BUT NOT TESTED:
function findPromptInfoById(id: string | null, promptInfoCollection: PromptInfo[]): PromptInfo | undefined {
	for (const promptInfo of promptInfoCollection) {
		if (promptInfo.id === id) return promptInfo;
		const foundPrompt = findPromptInfoById(id, promptInfo.chidren);
		if (foundPrompt !== undefined) return foundPrompt;
	}

	return undefined;
}

// BAD, BUT WORKING (TESTED):
// function findPromptInfo(id: number | null, collection: PromptInfo[]): PromptInfo | undefined {
// 	let foundPromptInfo = collection.find((promptInfo) => promptInfo.id === id);

// 	if (foundPromptInfo === undefined) {
// 		for (const promptInfo of collection) {
// 			foundPromptInfo = findPromptInfo(id, promptInfo.childPrompts);
// 			if (foundPromptInfo !== undefined) break;
// 		}
// 	}

// 	return foundPromptInfo;
// }
