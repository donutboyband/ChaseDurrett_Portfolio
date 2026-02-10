import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const blogPosts = [
	{
		id: 'about',
		title: 'About',
		date: 'Feb 10, 2026',
		content: (
			<>
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
			</>
		)
	},
	{
		id: 'building-with-react',
		title: 'Building with React',
		date: 'Feb 5, 2026',
		content: (
			<>
				<p className="text-black dark:text-white/90">
					React continues to be my framework of choice for building modern web applications. The component-based architecture makes it easy to create reusable, maintainable code.
				</p>

				<p className="text-black dark:text-white/90">
					Recently, I've been exploring the new React Server Components and how they can improve performance for content-heavy applications. The ability to render components on the server and stream them to the client is a game-changer.
				</p>

				<p className="text-black dark:text-white/90">
					Some key takeaways from my experience:
				</p>

				<ul className="list-disc list-inside space-y-2 text-black dark:text-white/90">
					<li>Keep components small and focused</li>
					<li>Use TypeScript for better type safety</li>
					<li>Leverage hooks for cleaner state management</li>
					<li>Test components in isolation</li>
				</ul>
			</>
		)
	},
	{
		id: 'data-science-journey',
		title: 'My Data Science Journey',
		date: 'Jan 28, 2026',
		content: (
			<>
				<p className="text-black dark:text-white/90">
					Over the past year, I've been diving deeper into data science and machine learning. What started as curiosity has turned into a genuine passion for applying these tools to real-world problems.
				</p>

				<p className="text-black dark:text-white/90">
					I've been working through various courses and tutorials, building projects that combine my web development background with data analysis. The intersection of these fields is fascinating.
				</p>

				<p className="text-black dark:text-white/90">
					Some areas I'm exploring:
				</p>

				<ul className="list-disc list-inside space-y-2 text-black dark:text-white/90">
					<li>Natural language processing for business applications</li>
					<li>Predictive modeling for risk assessment</li>
					<li>Data visualization with D3.js and Python</li>
					<li>Building ML pipelines with modern tools</li>
				</ul>

				<p className="text-black dark:text-white/90">
					The journey is just beginning, and I'm excited to see where it leads.
				</p>
			</>
		)
	}
];

function BlogPage() {
	const [selectedPost, setSelectedPost] = useState(blogPosts[0]);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			const elements = contentRef.current?.querySelectorAll('p, ul, li');
			if (elements) {
				gsap.from(elements, {
					opacity: 0,
					y: 20,
					duration: 0.6,
					stagger: 0.1,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: contentRef.current,
						start: 'top 80%',
						toggleActions: 'play none none reverse'
					}
				});
			}
		}, contentRef.current ?? undefined);

		return () => {
			ctx.revert();
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, [selectedPost]);

	return (
		<section className="w-full min-h-screen text-black dark:text-white py-16 px-6 md:py-20 md:px-12 lg:px-20 transition-colors">
			<div className="max-w-5xl mx-auto flex gap-12">
				{/* Sidebar Navigation */}
				<aside className="hidden lg:block w-48 shrink-0">
					<nav className="sticky top-24 space-y-2">
						{blogPosts.map((post) => (
							<button
								key={post.id}
								onClick={() => setSelectedPost(post)}
								className={`block w-full text-left font-cabinet text-sm transition-colors py-1 ${
									selectedPost.id === post.id
										? 'text-black dark:text-white'
										: 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
								}`}
							>
								{post.title}
							</button>
						))}
					</nav>
				</aside>

				{/* Main Content */}
				<div className="flex-1 max-w-2xl" ref={contentRef}>
					<div className="space-y-8 font-cabinet text-lg leading-relaxed">
						<p className="text-black/50 dark:text-white/50 text-sm">
							Updated {selectedPost.date}
						</p>

						{selectedPost.content}
					</div>
				</div>
			</div>
		</section>
	);
}

export const Route = createFileRoute('/blog/')({
	component: BlogPage
});
