import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

const createThemeStore = () => {
	const { subscribe, set } = writable<Theme>('light');
	let current: Theme = 'light';

	subscribe((value) => {
		current = value;
		if (typeof document !== 'undefined') {
			const root = document.documentElement;
			root.classList.toggle('dark', value === 'dark');
			root.dataset.theme = value;
		}
		if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
			try {
				localStorage.setItem('theme', value);
			} catch (err) {
				// ignore persistence errors (e.g., SSR or blocked storage)
			}
		}
	});

	const apply = (value: Theme) => set(value);

	const toggle = () => {
		const next = current === 'light' ? 'dark' : 'light';
		set(next);
	};

	const init = () => {
		if (typeof window === 'undefined') return;
		const stored = typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function'
			? localStorage.getItem('theme')
			: null;
		if (stored === 'light' || stored === 'dark') {
			apply(stored);
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			apply('dark');
		} else {
			apply('light');
		}
	};

	return { subscribe, toggle, init, set: apply };
};

export const theme = createThemeStore();
