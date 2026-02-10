import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MouseBlob from '../components/MouseBlob';

export const Route = createRootRoute({
	component: RootComponent
});

// eslint-disable-next-line react-refresh/only-export-components
function RootComponent() {
	useEffect(() => {
		// Set CSS variable for mobile viewport height
		const setVh = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};

		setVh();
		window.addEventListener('resize', setVh);
		return () => window.removeEventListener('resize', setVh);
	}, []);

	return (
		<ThemeProvider>
			<MouseBlob />
			<div className="fixed top-0 z-[-1] h-screen w-screen bg-white dark:bg-slate-950 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]" />
			<Header />
			<Outlet />
			<Footer />
		</ThemeProvider>
	);
}
