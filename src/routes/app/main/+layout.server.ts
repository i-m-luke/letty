import FAKE_DB from '$lib/fake-db';
import type LayoutLoadData from './LayoutLoadData';

// Návratný typ fce zajistí type safety
export function load(): LayoutLoadData {
	return { promptInfoCollection: FAKE_DB.promptInfoCollection };
}
