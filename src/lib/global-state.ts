import { readable, writable } from "svelte/store";

export const isMobile = readable(false); // TODO: Vyřešit nějak skrze build-in feature (asi někde v $app/environment)
