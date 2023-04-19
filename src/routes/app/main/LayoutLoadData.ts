import type { ThreadData, PromptData, DBNode } from '$types';

type LayoutLoadData = {
	promptInfoCollection: DBNode<PromptData>[];
	threadInfoCollection: DBNode<ThreadData>[];
};

export default LayoutLoadData;
