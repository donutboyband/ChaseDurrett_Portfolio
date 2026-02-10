import { createFileRoute } from '@tanstack/react-router';

function BlogPage() {
	return (
		<section className="w-full min-h-screen text-black dark:text-white py-16 px-6 md:py-20 md:px-12 lg:px-20 transition-colors">
			<div className="max-w-5xl mx-auto flex gap-12">
				{/* Sidebar Navigation */}
				<aside className="hidden lg:block w-48 shrink-0">
					<nav className="sticky top-24 space-y-2">
						<a href="/" className="block font-cabinet text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors py-1">
							Home
						</a>
						<a href="/work" className="block font-cabinet text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors py-1">
							Work
						</a>
						<a href="/blog" className="block font-cabinet text-sm text-black dark:text-white hover:text-black dark:hover:text-white transition-colors py-1">
							About
						</a>
						<a href="/contact" className="block font-cabinet text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors py-1">
							Contact
						</a>
					</nav>
				</aside>

				{/* Main Content */}
				<div className="flex-1 max-w-2xl">
					<div className="space-y-8 font-cabinet text-lg leading-relaxed">
						<p className="text-black/50 dark:text-white/50 text-sm">
							Updated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
						</p>

						<p className="text-black dark:text-white/90">
							I'm a full-stack developer based in Oklahoma City with a passion for building clean, maintainable applications.
						</p>

						<p className="text-black dark:text-white/90">
							Currently, I work at{' '}
							<a href="https://www.baltlifeins.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
								Baltimore Life Insurance
							</a>{' '}
							where I build enterprise-grade applications using React, .NET, and SQL. Before that, I worked at{' '}
							<a href="https://soupagency.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
								Soup Agency
							</a>
							, crafting marketing websites for various clients.
						</p>

						<p className="text-black dark:text-white/90">
							I enjoy exploring new technologies and applying them to solve real-world problems. Lately, I've been diving into data science and machine learning, learning how to apply these tools to challenges I've encountered in my work.
						</p>

						<p className="text-black dark:text-white/90">
							I consider myself a builder at heart and enjoy creating highly polished, user-focused products.
						</p>

						<p className="text-black dark:text-white/90">
							You can reach me at{' '}
							<a href="https://www.linkedin.com/in/chasedurrett/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
								LinkedIn
							</a>
							, check out my code on{' '}
							<a href="https://github.com/donutboyband" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
								GitHub
							</a>
							, or email me at{' '}
							<a href="mailto:chase@cdinfosec.com" className="text-blue-500 hover:underline">
								chase@cdinfosec.com
							</a>
							.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export const Route = createFileRoute('/blog/')({
	component: BlogPage
});
