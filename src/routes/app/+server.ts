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

	const promptInfoCollection = FAKE_DB.promptInfoCollection;
	const parentPromptInfo = findPromptInfoById(promptInfo.parentId, promptInfoCollection);
	if (parentPromptInfo === undefined) {
		throw new Error(`parent info wasn't found. Parent Info Id: ${promptInfo.parentId}`);
	}
	parentPromptInfo.childPrompts.push(promptInfo);

	return json(promptInfo, { status: 201 });
}

// FAKE DB:

// BETTER, BUT NOT TESTED:
function findPromptInfoById(id: number | null, promptInfoCollection: PromptInfo[]): PromptInfo | undefined {
	for (const promptInfo of promptInfoCollection) {
		if (promptInfo.id === id) return promptInfo;
		const foundPrompt = findPromptInfoById(id, promptInfo.childPrompts);
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
