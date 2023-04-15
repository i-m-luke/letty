import { readable, writable } from 'svelte/store';

export const isMobile = readable(true); // TODO: Vyřešit nějak skrze build-in feature (asi někden a $app/environment)
