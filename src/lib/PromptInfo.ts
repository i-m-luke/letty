type PromptInfo = {
	id: number;
	parentId: number | null; // ... null je fuj!
	name: string;
	prompt: string;
	childPrompts: PromptInfo[];
};

export default PromptInfo;
