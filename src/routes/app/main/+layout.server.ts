import type LayoutLoadData from './LayoutLoadData';
import { SOME_VALUE } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import FAKE_DB from '$lib/fake-db';

let loggedIn = false;

// Návratný typ fce zajistí type safety
export function load(): LayoutLoadData {
	if (!loggedIn) {
		loggedIn = true; // LOL X-D
		throw redirect(307, '/app/login'); // TODO: Přidat správný status code
	}
	return {
		promptInfoCollection: FAKE_DB.promptInfoCollection,
		threadInfoCollection: FAKE_DB.threadInfoCollection,
		envSomeValue: SOME_VALUE
	};
}
