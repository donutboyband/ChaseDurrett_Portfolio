import { createFileRoute } from '@tanstack/react-router';

function BlogPage() {
	return (
		<section className="w-full min-h-screen text-black dark:text-white py-16 px-6 md:py-20 md:px-12 lg:px-20 transition-colors">
			<div className="max-w-4xl mx-auto">
				<div className="space-y-6">
					<p className="font-link text-xs tracking-[0.25em] uppercase text-black/60 dark:text-white/60">
						Blog
					</p>
					<h1 className="font-header text-3xl sm:text-4xl md:text-5xl leading-tight">
						Coming Soon
					</h1>
					<p className="font-cabinet text-lg text-black dark:text-white/70 leading-relaxed max-w-2xl">
						This is where I'll share thoughts, tutorials, and insights about web development, design, and technology.
					</p>
				</div>
			</div>
		</section>
	);
}

export const Route = createFileRoute('/blog/')({
	component: BlogPage
});
