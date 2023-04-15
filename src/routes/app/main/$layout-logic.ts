import type PromptInfo from '$lib/PromptInfo';
import type LayoutLoadData from './LayoutLoadData';
import type LayoutData from './LayoutData';
import TreeNodeInfo from '$lib/components/TreeNodeInfo';
import { transformCollectionToNodeInfo } from '$lib/transformers';

// PURE CODE:

export function transformData(layoutLoadData: LayoutLoadData): LayoutData {
	return {
		treeNodeInfoCollection: transformPromptInfoToNodeInfo(layoutLoadData.promptInfoCollection)
	};
}

function transformPromptInfoToNodeInfo(promptInfoCollections: PromptInfo[]): TreeNodeInfo[] {
	return transformCollectionToNodeInfo<PromptInfo>(
		(promptInfo: PromptInfo) =>
			new TreeNodeInfo(
				false,
				promptInfo.id,
				promptInfo.name,
				promptInfo.childPrompts.length > 0 ? transformPromptInfoToNodeInfo(promptInfo.childPrompts) : []
			),
		promptInfoCollections
	);
}
