import { readable, writable } from 'svelte/store';
import { TreeMode } from './enums';

export const isMobile = readable(false); // TODO: Vyřešit nějak skrze build-in feature (asi někde v $app/environment)
export const activeTreeMode = writable(TreeMode.Prompt);
