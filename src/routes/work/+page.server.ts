import { error, type PageServerLoad } from '@sveltejs/kit';

const username = 'donutboyband';
const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=24`;

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	const res = await fetch(apiUrl, {
		headers: {
			'User-Agent': 'soupagency-site'
		}
	});

	if (!res.ok) {
		throw error(res.status, 'Failed to load GitHub repositories');
	}

	const repos = (await res.json()).filter(
		(repo: any) => !repo.fork && !repo.archived && !repo.private
	);

	setHeaders({
		'cache-control': 'public, max-age=7200'
	});

	return {
		title: 'Work | Chase Durrett',
		description:
			'Explore my portfolio of web development projects, from enterprise applications to creative marketing sites built with React, Svelte, and .NET.',
		keywords: 'Portfolio, Web Development Projects, React Projects, Svelte, Full Stack Projects',
		repos: repos.map((repo: any) => ({
			name: repo.name,
			description: repo.description,
			url: repo.html_url,
			updated: repo.pushed_at ?? repo.updated_at,
			stars: repo.stargazers_count,
			language: repo.language
		}))
	};
};

export const prerender = false;
