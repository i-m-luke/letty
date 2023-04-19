import { json } from '@sveltejs/kit';
import type PostData from './PostData';
import type { PromptInfo } from '$types';
import { v4 as uuid } from 'uuid';

export async function POST({ request }) {
	const data = (await request.json()) as PostData;
	const promptInfo: PromptInfo = {
		id: uuid(),
		parentId: data.parentId,
		name: data.promptName,
		prompt: data.prompt,
		chidren: []
	};

	return json(promptInfo, { status: 201 });
}
