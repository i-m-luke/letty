import type { PromptData, ThreadData, DBNode } from '$types';
import { v4 as uuid } from 'uuid';

/* NOTEs: 
	- Node musí obshaovat userId, aby bylo z db možno vyfiltrovat nodes daného uživatele
*/

const userId = uuid();

type DBType = {
	promptCollection: DBNode<PromptData>[];
	threadCollection: DBNode<ThreadData>[];
};

export const DB: DBType = {
	promptCollection: [
		{
			id: '1',
			userId,
			data: {
				name: 'prompt 1',
				prompt: 'some prompt'
			}
		},
		{
			id: '2',
			userId,
			data: {
				name: 'prompt 2',
				prompt: 'some prompt'
			}
		},
		{
			id: '11',
			userId,
			parentId: '1',
			data: {
				name: 'prompt 1-1',
				prompt: 'some prompt'
			}
		},
		{
			id: '12',
			userId,
			parentId: '1',
			data: {
				name: 'prompt 1-2',
				prompt: 'some prompt'
			}
		},
		{
			id: '111',
			userId,
			parentId: '11',
			data: {
				name: 'prompt 1-1-1',
				prompt: 'some prompt'
			}
		}
	],
	threadCollection: [
		{
			id: '1',
			userId,
			data: {
				name: 'thread 1',
				messages: []
			}
		},
		{
			id: '2',
			userId,
			data: {
				name: 'thread 2',
				messages: []
			}
		},
		{
			id: '21',
			userId,
			parentId: '2',
			data: {
				name: 'thread 2-1',
				messages: []
			}
		},
		{
			id: '3',
			userId,
			data: {
				name: 'thread 3',
				messages: []
			}
		}
	]
};
