import { readable, writable } from 'svelte/store';
import { TreeMode } from './enums';

export const isMobile = readable(true); // TODO: Vyřešit nějak skrze build-in feature (asi někde v $app/environment)
export const activeTreeMode = writable(TreeMode.Prompt);
