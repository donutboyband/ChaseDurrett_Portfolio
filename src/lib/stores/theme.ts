import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

const resolveInitialTheme = (): Theme => {
	if (typeof window !== 'undefined') {
		const stored =
			typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function'
				? localStorage.getItem('theme')
				: null;

		if (stored === 'light' || stored === 'dark') return stored;
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
	}

	return 'light';
};

export const createThemeStore = () => {
	const initial = resolveInitialTheme();
	const { subscribe, set } = writable<Theme>(initial);
	let current: Theme = initial;

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
			} catch {
				// ignore persistence errors
			}
		}
	});

	const apply = (value: Theme) => set(value);
	const toggle = () => set(current === 'light' ? 'dark' : 'light');
	const init = () => apply(resolveInitialTheme());
	return { subscribe, toggle, init, set: apply };
};

export const theme = createThemeStore();
