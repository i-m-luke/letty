import type { ThreadInfo, PromptInfo } from '$lib/types';

type LayoutLoadData = {
	promptInfoCollection: PromptInfo[];
	threadInfoCollection: ThreadInfo[];
	envSomeValue: string;
};

export default LayoutLoadData;
