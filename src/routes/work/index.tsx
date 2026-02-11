import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

interface Repo {
	name: string;
	description: string | null;
	url: string;
	updated: string;
	stars: number;
	language: string | null;
}

interface FeaturedProject {
	name: string;
	description: string;
	githubUrl: string;
	liveUrl: string;
}

interface GitHubRepoResponse {
	name: string;
	description: string | null;
	html_url: string;
	pushed_at?: string;
	updated_at: string;
	stargazers_count: number;
	language: string | null;
	fork: boolean;
	archived: boolean;
	private: boolean;
}

const username = 'donutboyband';
const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=24`;

const featuredProjects: FeaturedProject[] = [
	{
		name: 'Sample Project',
		description: 'A featured project example',
		githubUrl: 'https://github.com/donutboyband/sample',
		liveUrl: 'https://sample.com'
	}
];

async function fetchRepos(): Promise<Repo[]> {
	const res = await fetch(apiUrl, {
		headers: {
			'User-Agent': 'soupagency-site'
		}
	});

	if (!res.ok) {
		throw new Error('Failed to load GitHub repositories');
	}

	const repos: GitHubRepoResponse[] = await res.json();
	return repos
		.filter((repo) => !repo.fork && !repo.archived && !repo.private)
		.map((repo) => ({
			name: repo.name,
			description: repo.description,
			url: repo.html_url,
			updated: repo.pushed_at ?? repo.updated_at,
			stars: repo.stargazers_count,
			language: repo.language
		}));
}

// eslint-disable-next-line react-refresh/only-export-components
function WorkPage() {
	const { repos } = Route.useLoaderData();

	const formatDate = React.useMemo(
		() =>
			new Intl.DateTimeFormat('en', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			}),
		[]
	);

	const timeAgo = (dateStr: string) => {
		const date = new Date(dateStr);
		// eslint-disable-next-line react-hooks/purity
		const diffMs = Date.now() - date.getTime();
		const minutes = Math.floor(diffMs / 60000);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const months = Math.floor(days / 30);
		const years = Math.floor(days / 365);

		if (years > 0) return `${years}y ago`;
		if (months > 0) return `${months}mo ago`;
		if (days > 0) return `${days}d ago`;
		if (hours > 0) return `${hours}h ago`;
		return `${Math.max(minutes, 1)}m ago`;
	};

	return (
		<section className="w-full text-black dark:text-white py-16 px-6 md:py-24 md:px-12 lg:px-20 transition-colors">
			<div className="max-w-6xl mx-auto space-y-10">
				<div className="space-y-4">
					<div className="flex items-center gap-3 text-sm font-link uppercase tracking-[0.16em] text-black/60 dark:text-white/60">
						Github feed · auto-pulled · cached for a while
					</div>
					<h1 className="font-header text-3xl sm:text-4xl md:text-5xl leading-tight">Work</h1>
					<p className="font-cabinet text-lg md:text-xl text-black/80 dark:text-white/60 max-w-3xl">
						RSS feed of my personal projects on GitHub.
					</p>
				</div>

				{/* Featured Section */}
				<div className="space-y-4">
					<h2 className="font-link text-sm uppercase tracking-[0.16em] text-black/60 dark:text-white/60">
						Featured
					</h2>
					<div className="space-y-2">
						{featuredProjects.map((project) => (
							<div
								key={project.name}
								className="py-3 border-b border-black/10 dark:border-white/10 last:border-0"
							>
								<h3 className="font-cabinet text-base md:text-lg mb-1">{project.name}</h3>
								<p className="font-cabinet text-sm text-black/60 dark:text-white/60 mb-2">
									{project.description}
								</p>
								<div className="flex gap-4 text-sm">
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors underline"
									>
										GitHub
									</a>
									<a
										href={project.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors underline"
									>
										Live Site
									</a>
								</div>
							</div>
						))}
					</div>
				</div>

				{repos.length === 0 ? (
					<div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur font-cabinet text-black/70 dark:text-white/80">
						No repositories found right now. Check back soon.
					</div>
				) : (
					<div className="grid grid-cols-1 gap-6 md:gap-8 py-4">
						{repos.map((repo: Repo) => (
							<a
								key={repo.name}
								className="group"
								href={repo.url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Open ${repo.name} on GitHub`}
							>
								<article className="relative pl-8 md:pl-10 py-6 pr-6 border border-black/10 dark:border-white/10 rounded-2xl bg-white/80 dark:bg-slate-900/60 shadow-sm overflow-hidden backdrop-blur transition-transform duration-150 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-sm">
									<div className="absolute animate-pulse left-4 top-8 w-1 h-1 md:w-3 md:h-3 rounded-full bg-primary ring-4 ring-primary/20 group-hover:ring-primary/30 transition-all duration-200"></div>
									<div className="flex justify-between items-center w-full flex-wrap gap-3 text-xs md:text-sm font-link uppercase tracking-[0.12em] text-black/70 dark:text-white/70">
										<span className="px-3 py-1 bg-black text-white rounded-full dark:bg-white dark:text-black">
											{repo.language ?? 'Misc'}
										</span>
										<span className="flex items-center gap-3">
											<span className="flex items-center gap-2">
												<svg
													className="w-4 h-4"
													viewBox="0 0 20 20"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10"
														stroke="currentColor"
														strokeWidth="1.1"
														strokeLinecap="round"
													/>
													<path
														d="M10 5V10L12.5 12.5"
														stroke="currentColor"
														strokeWidth="1.1"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
												<span>{timeAgo(repo.updated)}</span>
											</span>
											<span className="text-black/50 dark:text-white/50">
												{formatDate.format(new Date(repo.updated))}
											</span>
										</span>
									</div>
									<h3 className="font-header text-2xl md:text-3xl mt-3 mb-2 group-hover:text-primary transition-colors duration-150">
										{repo.name}
									</h3>
									<p className="font-cabinet text-base md:text-lg text-black dark:text-white/80 leading-relaxed">
										{repo.description ?? 'No description provided.'}
									</p>
									<div className="mt-4 flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm font-link uppercase tracking-[0.12em] text-black dark:text-white">
										<span className="px-3 py-1 bg-primary text-white rounded-full group-hover:bg-black dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-200">
											View repo
										</span>
										<span className="flex items-center gap-1 text-black/60 dark:text-white/70">
											<svg
												className="w-4 h-4"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M12 6.5L12 17.5"
													stroke="currentColor"
													strokeWidth="1.2"
													strokeLinecap="round"
												/>
												<path
													d="M12 6.5L8.5 10M12 6.5L15.5 10"
													stroke="currentColor"
													strokeWidth="1.2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											<span>{repo.stars}★</span>
										</span>
									</div>
								</article>
							</a>
						))}
					</div>
				)}
			</div>
		</section>
	);
}

export const Route = createFileRoute('/work/')({
	component: WorkPage,
	loader: async () => {
		const repos = await fetchRepos();
		return { repos };
	}
});
