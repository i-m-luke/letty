import type PostData from './PostData';
import type PromptInfo from '$lib/PromptInfo';

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
