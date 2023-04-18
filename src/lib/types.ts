// alias module

export type PromptInfo = {
	id: number;
	parentId: number | null; // ... null je fuj!
	name: string;
	prompt: string;
	chidren: PromptInfo[];
};

export type ThreadInfo = {
	id: number;
	name: string;
	children: ThreadInfo[];
};

export type PromptData = {
	name: string;
	prompt: string;
};

export type ThreadData = {
	name: string;
};

export type DBNodeItem<TData> = {
	id: number;
	childrenIds: number[];
	data: TData;
};
