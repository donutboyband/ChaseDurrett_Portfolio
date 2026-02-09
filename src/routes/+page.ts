import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		title: 'Chase Durrett | Full-Stack Developer',
		description:
			'Full-stack developer specializing in React, .NET, and Svelte. Building clean, scalable applications with a focus on user experience and maintainability.',
		keywords:
			'Chase Durrett, Full Stack Developer, React, .NET, Svelte, Web Development, Frontend Developer, Baltimore, Portfolio',
		ogImage: '/og-image.png'
	};
};
