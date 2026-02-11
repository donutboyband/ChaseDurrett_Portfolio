import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const experiences = [
	{
		role: 'Full-Stack Developer',
		company: 'Baltimore Life Insurance',
		years: '2024 — Present',
		summary:
			"Currently, I'm a full-stack developer at Balitmore Life Insurance where I work on a team that plans, creates, and delivers enterprise-grade applications to solve business needs. I work with React, .NET, SQL, and a lot of other libraries and tools.",
		tags: ['Engineering', 'Enterprise']
	},
	{
		role: 'Frontend Developer',
		company: 'Soup Agency',
		years: '2023 — 2024',
		summary:
			"I partnered closely with marketing teams to turn campaign concepts into visually striking web experiences. Adapting to each client's tech stack—whether it was WordPress, Svelte, or plain HTML—taught me to learn new languages and paradigms on the fly. My focus was always on delivering polished, engaging sites that amplified the brand's message.",
		tags: ['Frontend', 'Marketing']
	},
	{
		role: 'IT Analyst',
		company: 'Audigent',
		years: '2021 — 2023',
		summary:
			"At a high-growth startup, I was the go-to person for every IT challenge. From securing on-prem networks and ensuring regulatory compliance to maintaining on-prem servers, I handled everything that plugged into a wall, connected to a network, or met a business need through technology.",
		tags: ['IT', 'Many hats', 'Too many hats']
	}
];

// eslint-disable-next-line react-refresh/only-export-components
function IndexPage() {
	const journeyRef = useRef<HTMLElement>(null);
	const heroTitleRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			const cards = gsap.utils.toArray<HTMLElement>('[data-journey-card]');

			cards.forEach((card, index) => {
				gsap.from(card, {
					opacity: 0,
					y: 36,
					duration: 0.6,
					delay: index * 0.05,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: card,
						start: 'top 80%',
						toggleActions: 'play none none reverse'
					}
				});
			});

			const line = document.querySelector('.journey-line');
			if (line && journeyRef.current) {
				gsap.fromTo(
					line,
					{ scaleY: 0 },
					{
						scaleY: 1,
						transformOrigin: 'top center',
						ease: 'none',
						scrollTrigger: {
							trigger: journeyRef.current,
							start: 'top 70%',
							end: 'bottom 30%',
							scrub: true
						}
					}
				);
			}
		}, journeyRef.current ?? undefined);

		// Hero title animation
		if (heroTitleRef.current) {
			gsap.fromTo(
				heroTitleRef.current,
				{ opacity: 0, y: 50 },
				{ opacity: 1, y: 0, duration: 0.15, delay: 0.2, ease: 'power2.out' }
			);
		}

		return () => {
			ctx.revert();
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return (
		<>
			<div
				className="w-full h-screen-100 flex flex-col justify-center items-center space-y-6 text-black dark:text-white transition-colors"
				role="region"
				aria-label="Intro"
			>
				<h1 className="font-header text-6xl sm:text-8xl md:text-9xl" ref={heroTitleRef}>
					hi<span className="text-blue-500 transition-opacity duration-150">.</span>
				</h1>

				<svg
					className="w-6 h-6 stroke-black/60 dark:stroke-white/70 group-hover:stroke-black dark:group-hover:stroke-white transition-colors duration-200"
					fill="none"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 5v14m0 0-5-5m5 5 5-5"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					></path>
				</svg>

				<span className="fixed top-0 left-0 pointer-events-none font-header text-9xl text-blue-500 select-none transition-opacity duration-200 opacity-0">
					.
				</span>

				<div className="w-full flex justify-center pt-6">
					<div className="w-full h-px"></div>
				</div>
			</div>

			<section
				className="w-full text-black dark:text-white py-20 px-6 md:py-28 md:px-12 lg:px-20 transition-colors"
				id="journey"
				ref={journeyRef}
			>
				<div className="max-w-6xl mx-auto grid md:grid-cols-[1fr,2fr] gap-10 md:gap-16">
					<div className="space-y-6 md:sticky md:top-24 self-start">
						<div>
							<p className="font-link text-xl text-black/60 dark:text-white/60">Chase Durrett</p>
							<p className="font-link text-md text-black/60 dark:text-white/40">Full Stack Developer</p>
						</div>
						<h2 className="font-header text-4xl md:text-6xl leading-tight">Experience</h2>
						<p className="font-cabinet text-xl text-black dark:text-white/80 leading-relaxed">
							I&apos;m a lifelong learner who loves turning ideas into reality. As a full-stack developer, I
							build clean, scalable applications that prioritize user experience and maintainability.
						</p>
					</div>

					<div className="relative">
						<div className="flex flex-col gap-12 md:gap-10">
							<div className="space-y-4">
								<p className="font-link text-sm text-black/60 dark:text-white/60">Work experience</p>
								{experiences.map((exp, index) => (
									<article
										key={index}
										className="relative pl-8 md:pl-10 py-6 pr-6 border border-black/10 dark:border-white/10 rounded-2xl bg-white/80 dark:bg-slate-900/60 shadow-sm overflow-hidden group backdrop-blur"
										data-journey-card
									>
										<div className="animate-pulse hidden md:block absolute left-4 top-8 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20"></div>
										<div className="flex flex-col items-start gap-1 text-sm font-link uppercase tracking-[0.12em] sm:flex-row sm:items-center sm:gap-3">
											<span className="px-0 md:px-3 py-1 md:bg-black text-black md:text-white rounded-full md:dark:bg-white dark:text-white/60 md:dark:text-black">
												{exp.company}
											</span>
											<span className="text-black/60 dark:text-white/70">{exp.years}</span>
										</div>
										<h3 className="font-header text-2xl md:text-3xl mt-3 mb-2">{exp.role}</h3>
										<p className="font-cabinet text-base md:text-xl text-black dark:text-white/80 leading-relaxed">
											{exp.summary}
										</p>
										<div className="flex flex-wrap gap-2 mt-4">
											{exp.tags.map((tag, tagIndex) => (
												<span
													key={tagIndex}
													className="px-3 py-1 bg-[#baff29] text-black text-sm font-link rounded-full"
												>
													{tag}
												</span>
											))}
										</div>
									</article>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export const Route = createFileRoute('/')({
	component: IndexPage
});
