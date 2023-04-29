import { onDestroy, onMount } from "svelte";
import type { Script } from "vm";

export function onInterval(callback: () => {}, milliseconds: number) {
  const interval = setInterval(callback, milliseconds);
  onDestroy(() => {
    clearInterval(interval);
  });
}

export function onTimeout(callback: () => {}, milliseconds: number) {
  const timout = setTimeout(callback, milliseconds);
  onDestroy(() => {
    clearTimeout(timout);
  });
}
