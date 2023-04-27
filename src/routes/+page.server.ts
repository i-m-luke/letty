import { CHAT_GPT_API_KEY } from '$env/static/private';
import { GPTApi } from '$lib/logic/GPTApi';

const gptApi = new GPTApi(CHAT_GPT_API_KEY);

export function load() {
	// console.log('hello', { prop: '' });
	// fetch('api/[item01]');
	return {};
}
