export default class PromptInfo {
	id: number;
	parentId: number | null; // ... null je fuj!
	name: string;
	prompt: string;
	childPrompts: PromptInfo[];

	constructor(
		id: number,
		parentId: number,
		name: string,
		prompt: string,
		childPrompts: PromptInfo[]
	) {
		this.id = id;
		this.parentId = parentId;
		this.name = name;
		this.prompt = prompt;
		this.childPrompts = childPrompts;
	}
}
