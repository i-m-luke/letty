import type { ThreadInfo, PromptInfo } from '$lib/types';
import type LayoutLoadData from './LayoutLoadData';
import type LayoutData from './LayoutData';
import TreeNodeInfo from '$lib/components/TreeNodeInfo';
import { transformCollectionToNodeInfo } from '$lib/transformers';

// PURE CODE:

export function transformData(layoutLoadData: LayoutLoadData): LayoutData {
	return {
		promptTreeNodeInfoCollection: transformPromptInfoToNodeInfo(layoutLoadData.promptInfoCollection),
		threadTreeNodeInfoCollection: transformThreadInfoToNodeInfo(layoutLoadData.threadInfoCollection)
	};
}

function transformPromptInfoToNodeInfo(promptInfoCollections: PromptInfo[]): TreeNodeInfo[] {
	return transformCollectionToNodeInfo<PromptInfo>(
		(promptInfo: PromptInfo) =>
			new TreeNodeInfo(
				false,
				promptInfo.id,
				promptInfo.name,
				promptInfo.chidren.length > 0 ? transformPromptInfoToNodeInfo(promptInfo.chidren) : []
			),
		promptInfoCollections
	);
}

function transformThreadInfoToNodeInfo(threadInfoCollections: ThreadInfo[]): TreeNodeInfo[] {
	return transformCollectionToNodeInfo<ThreadInfo>(
		(threadInfo: ThreadInfo) =>
			new TreeNodeInfo(
				false,
				threadInfo.id,
				threadInfo.name,
				threadInfo.children.length > 0 ? transformThreadInfoToNodeInfo(threadInfo.children) : []
			),
		threadInfoCollections
	);
}
