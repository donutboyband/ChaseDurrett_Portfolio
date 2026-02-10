import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import About from '../../components/blog/About';
import DataScienceJourney from '../../components/blog/DataScienceJourney';
import BuildingEyeglass from '../../components/blog/BuildingEyeglass';

const blogPosts = [
	{
		id: 'about',
		title: 'About',
		date: 'Feb 10, 2026',
		content: <About />
	},
	{
		id: 'building-eyeglass',
		title: 'Building Eyeglass',
		date: 'Feb 5, 2026',
		content: <BuildingEyeglass />
	},
	{
		id: 'data-science-journey',
		title: 'My Data Science Journey',
		date: 'Jan 28, 2026',
		content: <DataScienceJourney />
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
					duration: 0.4,
					stagger: 0.05,
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
						<p className="text-black/50 dark:text-white/50 text-sm">Updated {selectedPost.date}</p>

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
