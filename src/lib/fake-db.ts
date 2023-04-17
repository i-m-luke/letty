import type { ThreadInfo, PromptInfo } from './types';
import type DBNodeItem from './DBNodeItem';

type FakeDBType = {
	promptInfoCollection: PromptInfo[];
	threadInfoCollection: ThreadInfo[];
};

//#region TODO: NODE DB

const FAKE_DB: FakeDBType = {
	promptInfoCollection: [
		{
			id: 1,
			parentId: null,
			name: 'random number',
			prompt: 'give me a random number',
			chidren: [
				{
					id: 11,
					parentId: 1,
					name: 'prompt 11',
					prompt: '...',
					chidren: [
						{
							id: 111,
							parentId: 11,
							name: 'prompt 111',
							prompt: '...',
							chidren: []
						}
					]
				},
				{
					id: 12,
					parentId: 1,
					name: 'prompt 12',
					prompt: '...',
					chidren: [
						{
							id: 121,
							parentId: 12,
							name: 'prompt 121',
							prompt: '...',
							chidren: []
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
			chidren: []
		},
		{
			id: 3,
			parentId: null,
			name: 'random ???',
			prompt: 'give me a random ???',
			chidren: []
		}
	],
	threadInfoCollection: [
		{ id: 1, name: 'thread 1', children: [] },
		{
			id: 2,
			name: 'thread 1',
			children: [
				{ id: 11, name: 'thread 11', children: [] },
				{ id: 12, name: 'thread 12', children: [] }
			]
		},
		{
			id: 3,
			name: 'thread 3',
			children: [
				{ id: 31, name: 'thread 31', children: [] },
				{ id: 32, name: 'thread 32', children: [] }
			]
		}
	]
};

type NodeFakeDB = {
	promptCollection: DBNodeItem<PromptInfo>[];
	threadCollection: DBNodeItem<ThreadInfo>[];
};

const NODE_DB: NodeFakeDB = {
	promptCollection: [],
	threadCollection: []
};

//#endregion

function findPromptInfo(id: number | null, collection: PromptInfo[]): PromptInfo | undefined {
	let foundPromptInfo = collection.find((promptInfo) => promptInfo.id === id);

	if (foundPromptInfo === undefined) {
		for (const promptInfo of collection) {
			foundPromptInfo = findPromptInfo(id, promptInfo.chidren);
			if (foundPromptInfo !== undefined) {
				return foundPromptInfo;
			}
		}
	}

	return undefined;
}

export const inesertPromptInfoToDB = (promptInfo: PromptInfo) => {
	findPromptInfo(promptInfo.parentId, FAKE_DB.promptInfoCollection)?.chidren.push(promptInfo);
};

export default FAKE_DB;
