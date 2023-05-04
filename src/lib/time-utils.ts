import { onDestroy, onMount } from "svelte";

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
