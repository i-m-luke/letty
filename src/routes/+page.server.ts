import { SOME_VALUE } from '$env/static/private';

export function load() {
	return { someValue: SOME_VALUE };
}
