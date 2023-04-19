import type { PromptData, ThreadData, ThreadInfo, PromptInfo } from '$types';
import { v4 as uuid } from 'uuid';

//#region GROUPS DB

interface IGroupItem {
	groupId: number;
}

type _PromptInfo = {
	id: number;
	name: string;
	prompt: string;
} & IGroupItem;

type _ThreadInfo = {
	id: number;
	name: string;
	messages: string[];
} & IGroupItem;

type Group = {
	id: number;
	parentId?: number;
};

const promptGroups: Group[] = [{ id: 1 }, { id: 2, parentId: 1 }];
const threadGroups: Group[] = [{ id: 1 }, { id: 2, parentId: 1 }, { id: 3, parentId: 1 }];

const promptInfoCollection: _PromptInfo[] = [
	{
		id: 1,
		name: 'prompt 1',
		prompt: '...',
		groupId: 1
	},
	{
		id: 2,
		groupId: 1,
		name: 'prompt 2',
		prompt: '...'
	},
	{
		id: 3,
		groupId: 2,
		name: 'prompt 3',
		prompt: '...'
	}
];

const threadInfoCollection: _ThreadInfo[] = [
	{
		id: 1,
		groupId: 2,
		name: 'prompt 1',
		messages: []
	},
	{
		id: 2,
		groupId: 2,
		name: 'prompt 2',
		messages: []
	},
	{
		id: 3,
		groupId: 2,
		name: 'prompt 3',
		messages: []
	},
	{
		id: 4,
		groupId: 2,
		name: 'prompt 4',
		messages: []
	}
];

type MergedGroup<TItem> = {
	id: number;
	items: TItem[];
	subGroups?: MergedGroup<TItem>[];
};

const mergeGroups = <TItem extends IGroupItem>(groupCollection: Group[], groupItems: TItem[]) => {
	// TODO: Naplnění podskupiny do MergedGroup.subGroups
	const mergedGroups: MergedGroup<TItem>[] = groupCollection.map((group) => {
		return {
			id: group.id,
			items: groupItems.filter((groupItem) => groupItem.groupId === group.id)
		};
	});
	return mergeGroups;
};

//#endregion

//#region NODE DB

/* NOTE: 
	- Vazba mezi parentNode a childNode: a) node.childrenIds, b) node.parentId ???
	- Node musí obshaovat userId, aby bylo z db možno vyfiltrovat nodes daného uživatele

const userId = uuid();

export type DBNodeItem<TData> = {
	id: string;
	userId: string;
	childrenIds: string[];
	data: TData;
};

type DBType = {
	promptCollection: DBNodeItem<PromptData>[];
	threadCollection: DBNodeItem<ThreadData>[];
};

const DB: DBType = {
	promptCollection: [
		{
			id: '1',
			userId,
			childrenIds: [],
			data: {
				name: 'prompt 1',
				prompt: 'some prompt'
			}
		},
		{
			id: '2',
			userId,
			childrenIds: ['21', '22'],
			data: {
				name: 'prompt 2',
				prompt: 'some prompt'
			}
		},
		{
			id: '21',
			userId,
			childrenIds: [],
			data: {
				name: 'prompt 2-1',
				prompt: 'some prompt'
			}
		},
		{
			id: '22',
			userId,
			childrenIds: [],
			data: {
				name: 'prompt 2-2',
				prompt: 'some prompt'
			}
		}
	],
	threadCollection: [
		{
			id: '1',
			userId,
			childrenIds: ['11', '12'],
			data: {
				name: 'thread 1'
			}
		},
		{
			id: '11',
			userId,
			childrenIds: ['111'],
			data: {
				name: 'thread 1-1'
			}
		},
		{
			id: '12',
			userId,
			childrenIds: [],
			data: {
				name: 'thread 1-2'
			}
		},
		{
			id: '111',
			userId,
			childrenIds: [],
			data: {
				name: 'thread 1-1-1'
			}
		}
	]
};

// boolean isFolder = subnodes.lenght > 0 ? true : false;
type _TreeNodeInfo = {
	id: string;
	name: string;
	subnodes: _TreeNodeInfo[];
};

// TODO: Fix immutability
const transformToTreeInfo = <TData>(dbNodes: DBNodeItem<TData>[]): _TreeNodeInfo[] => {
	//const parentNodes = dbNodes.filter(dbNode => dbNode.childrenIds.length > 0).map(...)
	return [];
};

function insertNode<TData>(
	nodeColl: DBNodeItem<TData>[],
	node: DBNodeItem<TData>,
	parentNodeId: string | undefined
) {
	const copiedNode: DBNodeItem<TData> = { ...node };
	const copiedNodeColl: DBNodeItem<TData>[] = [...nodeColl, copiedNode];

	parentNodeId !== undefined
		? copiedNodeColl.find((node) => node.id === parentNodeId)?.childrenIds
		: copiedNodeColl.push(copiedNode);
}

//#endregion

type FakeDBType = {
	promptInfoCollection: PromptInfo[];
	threadInfoCollection: ThreadInfo[];
};

const FAKE_DB: FakeDBType = {
	promptInfoCollection: [
		{
			id: uuid(),
			parentId: null,
			name: 'random number',
			prompt: 'give me a random number',
			chidren: [
				{
					id: uuid(),
					parentId: uuid(),
					name: 'prompt 11',
					prompt: '...',
					chidren: [
						{
							id: uuid(),
							parentId: uuid(),
							name: 'prompt 111',
							prompt: '...',
							chidren: []
						}
					]
				},
				{
					id: uuid(),
					parentId: uuid(),
					name: 'prompt 12',
					prompt: '...',
					chidren: [
						{
							id: uuid(),
							parentId: uuid(),
							name: 'prompt 121',
							prompt: '...',
							chidren: []
						}
					]
				}
			]
		},
		{
			id: uuid(),
			parentId: null,
			name: 'random name',
			prompt: 'give me a random name',
			chidren: []
		},
		{
			id: uuid(),
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

function findPromptInfo(id: string | null, collection: PromptInfo[]): PromptInfo | undefined {
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
