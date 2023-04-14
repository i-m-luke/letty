import type PromptInfo from '$lib/PromptInfo';
import TreeNodeInfo from '$lib/components/TreeNodeInfo';
import { transformCollectionToNodeInfo } from '$lib/transformers';
import type PostData from './main/create-prompt[parentId]/PostData';

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

// IMPURE CODE:
export const postSavedPrompt = async (parentId: number, promptName: string, prompt: string) => {
	const postData: PostData = { parentId, promptName, prompt };

	const response = await fetch('/app', {
		method: 'POST',
		body: JSON.stringify(postData),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const promptInfo = (await response.json()) as PromptInfo;
	alert('NEW SAVED PROMPT INFO ID:' + promptInfo.id);
};
