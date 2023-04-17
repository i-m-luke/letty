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
