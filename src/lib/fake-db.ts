import type PromptInfo from './PromptInfo';

type FakeDBType = {
	promptInfoCollection: PromptInfo[];
};

const FAKE_DB: FakeDBType = {
	promptInfoCollection: [
		{
			id: 1,
			parentId: null,
			name: 'random number',
			prompt: 'give me a random number',
			childPrompts: [
				{
					id: 11,
					parentId: 1,
					name: 'prompt 11',
					prompt: '...',
					childPrompts: [
						{
							id: 111,
							parentId: 11,
							name: 'prompt 111',
							prompt: '...',
							childPrompts: []
						}
					]
				},
				{
					id: 12,
					parentId: 1,
					name: 'prompt 12',
					prompt: '...',
					childPrompts: [
						{
							id: 121,
							parentId: 12,
							name: 'prompt 121',
							prompt: '...',
							childPrompts: []
						}
					]
				}
			]
		},
		{
			id: 2,
			parentId: null,
			name: 'random name',
			prompt: 'give me a random name',
			childPrompts: []
		},
		{
			id: 3,
			parentId: null,
			name: 'random ???',
			prompt: 'give me a random ???',
			childPrompts: []
		}
	]
};

function findPromptInfo(id: number | null, collection: PromptInfo[]): PromptInfo | undefined {
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

export const inesertPromptInfoToDB = (promptInfo: PromptInfo) => {
	findPromptInfo(promptInfo.parentId, FAKE_DB.promptInfoCollection)?.childPrompts.push(promptInfo);
};

export default FAKE_DB;
