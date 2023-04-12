export default class PromptInfo {
	id: number;
	name: string;
	prompt: string;
	childPrompts: PromptInfo[];

	constructor(id: number, name: string, prompt: string, childPrompts: PromptInfo[]) {
		this.id = id;
		this.name = name;
		this.prompt = prompt;
		this.childPrompts = childPrompts;
	}
}
