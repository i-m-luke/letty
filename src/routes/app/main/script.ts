import type PromptInfo from '$lib/PromptInfo';
import TreeNodeInfo from '$lib/components/TreeNodeInfo';
import { transformCollectionToNodeInfo } from '$lib/transformers';

// PURE CODE:
export function transformPrompmtInfoToNodeInfo(promptInfoCollections: PromptInfo[]): TreeNodeInfo[] {
	return transformCollectionToNodeInfo<PromptInfo>(
		(promptInfo: PromptInfo) =>
			new TreeNodeInfo(
				false,
				promptInfo.id,
				promptInfo.name,
				promptInfo.childPrompts.length > 0 ? transformPrompmtInfoToNodeInfo(promptInfo.childPrompts) : []
			),
		promptInfoCollections
	);
}
