import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import About from '../../components/blog/About';
import BuildingEyeglass from '../../components/blog/BuildingEyeglass';

const blogPosts = [
	{
		id: 'about',
		title: 'Hello',
		date: 'Feb 09, 2026',
		content: <About />
	},
	{
		id: 'building-eyeglass',
		title: 'Building Eyeglass',
		date: 'Feb 10, 2026',
		content: <BuildingEyeglass />
	}
];

// eslint-disable-next-line react-refresh/only-export-components
function BlogPage() {
	const navigate = useNavigate();
	const [selectedPost, setSelectedPost] = useState(blogPosts[0]);
	const contentRef = useRef<HTMLDivElement>(null);

	// Initialize from URL hash on mount
	useEffect(() => {
		const hash = window.location.hash.slice(1);
		if (hash) {
			const post = blogPosts.find((p) => p.id === hash);
			// eslint-disable-next-line react-hooks/set-state-in-effect
			if (post) setSelectedPost(post);
		}
	}, []);

	const handlePostSelect = (post: typeof blogPosts[0]) => {
		setSelectedPost(post);
		navigate({ to: '/blog', hash: post.id });
	};

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
		<section className="w-full min-h-screen text-black dark:text-white py-8 px-4 md:py-16 md:px-6 lg:py-20 lg:px-12 xl:px-20 transition-colors">
			<div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-12">
				{/* Mobile Navigation Tabs */}
				<nav className="lg:hidden border-b border-black/10 dark:border-white/10 -mx-4 px-4 overflow-x-auto">
					<div className="flex gap-4 min-w-max pb-3">
						{blogPosts.map((post) => (
							<button
								key={post.id}
								onClick={() => handlePostSelect(post)}
								className={`font-cabinet text-sm whitespace-nowrap pb-2 border-b-2 transition-colors ${
									selectedPost.id === post.id
										? 'text-black dark:text-white border-black dark:border-white'
										: 'text-black/60 dark:text-white/60 border-transparent'
								}`}
							>
								{post.title}
							</button>
						))}
					</div>
				</nav>

				{/* Desktop Sidebar Navigation */}
				<aside className="hidden lg:block w-48 shrink-0">
					<nav className="sticky top-24 space-y-2">
						{blogPosts.map((post) => (
							<button
								key={post.id}
								onClick={() => handlePostSelect(post)}
								className={`flex items-center gap-2 w-full text-left font-cabinet text-sm transition-colors py-1 ${
									selectedPost.id === post.id
										? 'text-black dark:text-white'
										: 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
								}`}
							>
								<span
									className={`w-1.5 h-1.5 rounded-full transition-opacity ${
										selectedPost.id === post.id
											? 'bg-black dark:bg-white opacity-100'
											: 'opacity-0'
									}`}
								/>
								{post.title}
							</button>
						))}
					</nav>
				</aside>

				{/* Main Content */}
				<div className="flex-1 max-w-2xl" ref={contentRef}>
					<div className="space-y-6 md:space-y-8 font-cabinet text-base md:text-lg leading-relaxed">
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
