import FAKE_DB from '$lib/fake-db';
import type PageLoadData from './PageLoadData';

// Návratný typ fce zajistí type safety
export function load(): PageLoadData {
	return { promptInfoCollection: FAKE_DB.promptInfoCollection };
}
