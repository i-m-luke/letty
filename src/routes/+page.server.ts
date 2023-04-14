import { SOME_VALUE } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

const loggedIn = false;

export function load() {
	if (!loggedIn) redirect(307, 'app/login'); // TODO: Přidat správný status code
	return { someValue: SOME_VALUE };
}
