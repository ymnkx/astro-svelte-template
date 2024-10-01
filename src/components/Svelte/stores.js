import { writable } from 'svelte/store';

const createCount = () => {
  const { subscribe, set, update } = writable(null); //savedCount || 0);
  return {
    subscribe,
    increment: () => update((n) => n + 1),
    decrement: () => update((n) => n - 1),
    reset: () => set(0),
    set: (value) => set(value),
  };
};

export const count = createCount();
