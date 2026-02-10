import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const resolveInitialTheme = (): Theme => {
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem('theme');
		if (stored === 'light' || stored === 'dark') return stored;
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
	}
	return 'light';
};

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>(resolveInitialTheme);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle('dark', theme === 'dark');
		root.dataset.theme = theme;
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggle = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

	return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) throw new Error('useTheme must be used within ThemeProvider');
	return context;
}
