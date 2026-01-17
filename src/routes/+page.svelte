<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { fly } from 'svelte/transition';
	import { BsCodeSlash } from "svelte-icons-pack/bs"; 

	const experiences = [
		{
			role: 'Full-Stack Developer',
			company: 'Baltimore Life Insurance',
			years: '2024 — Present',
			summary: "Currently, I'm a full-stack developer at Balitmore Life Insurance where I work on a team that plans, creates, and delivers enterprise-grade applications to solve business needs. I work with React, .NET, SQL, and a lot of other libraries and tools.",
			tags: ['Engineering', 'Enterprise']
		},
		{
			role: 'Frontend Developer',
			company: 'Soup Agency',
			years: '2023 — 2024',
			summary: "Worked with marketing teams to create beautiful web experiences for their marketing campaigns. I had to adapt to client's tech stacks, so I became very skilled at picking up new languages and paradigms. I worked primarily in Wordpress, svelte, and regular ol' HTML.",
			tags: ['Frontend', 'Marketing']
		},
        	{
			role: 'IT Analyst',
			company: 'Audigent',
			years: '2021 — 2023',
			summary: "Rocketship startup where I did everything imagineable in IT. Cybersecurity? Did it. Compliance? Yes. Physical server maintenance? You guessed it, yes. Anything that plugged into a wall, connected to a network, or solved a business need in some way with technology--I was responsible.",
			tags: ['IT', 'Many hats', 'Too many hats']
		}
	];

	const projects = [
		{
			name: 'Project Aurora',
			type: 'Interactive launch',
			description: 'A product story built around atmospheric gradients, scroll-driven reveals, and live data.',
			metrics: '10M impressions · 2.1x conversion lift'
		},
		{
			name: 'Ghostline',
			type: 'Portfolio refresh',
			description: 'Rebuilt the design language with bold typography, responsive motion, and modular case studies.',
			metrics: '7-week sprint · 40+ components'
		},
		{
			name: 'Echo Atlas',
			type: 'Web experience',
			description: 'Immersive editorial site featuring cinematic transitions and tactile micro-interactions.',
			metrics: 'Featured on Awwwards · Site of the Day finalist'
		}
	];

	let journeySection: HTMLElement | null = null;
	let heroTitle: HTMLElement | null = null;
	let heroArrow: SVGSVGElement | null = null;
	let heroDot: HTMLElement | null = null;
	let heroInlineDot: HTMLElement | null = null;
	let heroBarrier: HTMLElement | null = null;
	let isDotActive = false;
	let barrierY = 0;
	let currentHovered: HTMLElement | null = null;
	let lastMouseEvent: MouseEvent | null = null;
	const dotBaseSize = 24;

	const updateBarrierY = () => {
		if (!heroBarrier) return;
		const rect = heroBarrier.getBoundingClientRect();
		barrierY = rect.top + rect.height / 2 + window.scrollY;
	};

	const attachDot = (event: MouseEvent) => {
		if (!heroDot) return;
		isDotActive = true;
		gsap.to(heroDot, {
			x: event.clientX + 40,
			y: event.clientY,
			scale: 1,
			opacity: 1,
			duration: 0.18,
			ease: 'power2.out'
		});
	};

	const detachDot = () => {
		if (!heroDot) return;
		const inlineRect = heroInlineDot?.getBoundingClientRect();
		const targetX = inlineRect ? inlineRect.left + inlineRect.width / 2 : 0;
		const targetY = inlineRect ? inlineRect.top + inlineRect.height / 2 : 0;
		gsap.to(heroDot, {
			x: targetX,
			y: targetY,
			opacity: 0,
			duration: 0.2,
			ease: 'power2.out'
		});
		isDotActive = false;
	};

	const handleGlobalMouseMove = (event: MouseEvent) => {
		lastMouseEvent = event;
		if (currentHovered) return;
		const cursorY = event.clientY + window.scrollY;
		if (cursorY >= barrierY) {
			attachDot(event);
		} else if (isDotActive) {
			detachDot();
		}
	};

	onMount(() => {
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
			if (line) {
				gsap.fromTo(
					line,
					{ scaleY: 0 },
					{
						scaleY: 1,
						transformOrigin: 'top center',
						ease: 'none',
						scrollTrigger: {
							trigger: journeySection,
							start: 'top 70%',
							end: 'bottom 30%',
							scrub: true
						}
					}
				);
			}
		}, journeySection ?? undefined);

		if (heroDot) {
			gsap.set(heroDot, { xPercent: -50, yPercent: -50 });
		}

		updateBarrierY();
		window.addEventListener('resize', updateBarrierY);
		window.addEventListener('scroll', updateBarrierY);
		window.addEventListener('mousemove', handleGlobalMouseMove);

		return () => {
			ctx.revert();
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			window.removeEventListener('resize', updateBarrierY);
			window.removeEventListener('scroll', updateBarrierY);
			window.removeEventListener('mousemove', handleGlobalMouseMove);
		};
	});
</script>

<div
	class="w-full h-screen-100 flex flex-col justify-center items-center space-y-6"
	role="region"
	aria-label="Intro"
>
	<h1 class="font-header text-9xl" in:fly={{delay: 200, duration: 150, y: 50}} bind:this={heroTitle}>
		hi<span class="text-blue-500 transition-opacity duration-150 {isDotActive ? 'opacity-0' : 'opacity-100'}" bind:this={heroInlineDot}>.</span>
	</h1>
	<svg
		class="w-6 h-6 stroke-black/60 group-hover:stroke-black transition-colors duration-200"
		fill="none"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		bind:this={heroArrow}
	>
		<path
			d="M12 5v14m0 0-5-5m5 5 5-5"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		></path>
	</svg>

	<span
		class="fixed top-0 left-0 pointer-events-none font-header text-9xl text-blue-500 select-none transition-opacity duration-200 opacity-0"
		bind:this={heroDot}
	>
		.
	</span>

	<div class="w-full flex justify-center pt-6">
		<div class="w-24 h-px bg-black/10" bind:this={heroBarrier}></div>
	</div>
</div>

<section
	class="w-full bg-white text-black py-20 px-6 md:py-28 md:px-12 lg:px-20"
	id="journey"
	bind:this={journeySection}
>
	<div class="max-w-6xl mx-auto grid md:grid-cols-[1fr,2fr] gap-10 md:gap-16">
		<div class="space-y-6 md:sticky md:top-24 self-start">
			<p class="font-link text-xs tracking-[0.25em] uppercase text-black/60">About</p>
			<h2 class="font-header text-5xl md:text-6xl leading-tight">
				Experience + projects 
			</h2>
			<p class="font-cabinet text-xl text-black leading-relaxed">
				I love building things. And technology. I'm a lifelong learner (I don't know anything). I'm a full-stack developer who loves building clean and scaleable applications that focus on user experience and maintainability. Most recently I've been drawn into the world of data science and machine learning, and focused on solving some of the problems I've encountered in industries I've worked in.
			</p>
		</div>

		<div class="relative">
			<div class="flex flex-col gap-12 md:gap-10">
				<div class="space-y-4">
					<p class="font-link text-sm text-black/60">Work experience</p>
					{#each experiences as exp}
						<article
							class="relative pl-8 md:pl-10 py-6 pr-6 border border-black/10 rounded-2xl bg-white/80 shadow-sm overflow-hidden group"
							data-journey-card
						>
							<div
								class="absolute left-4 top-8 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20"
							></div>
							<div class="flex items-center gap-3 text-sm font-link uppercase tracking-[0.12em]">
								<span class="px-3 py-1 bg-black text-white rounded-full">{exp.company}</span>
								<span class="text-black/60">{exp.years}</span>
							</div>
							<h3 class="font-header text-2xl md:text-3xl mt-3 mb-2">{exp.role}</h3>
							<p class="font-cabinet text-base md:text-xl text-black leading-relaxed">
								{exp.summary}
							</p>
							<div class="flex flex-wrap gap-2 mt-4">
								{#each exp.tags as tag}
									<span class="px-3 py-1 bg-tertiary/40 text-black text-sm font-link rounded-full">
										{tag}
									</span>
								{/each}
							</div>
						</article>
					{/each}
				</div>

				<div class="space-y-4">
					<p class="font-link text-sm text-black/60">Selected projects</p>
					{#each projects as project}
						<article
							class="relative pl-8 md:pl-10 py-6 pr-6 border border-black/10 rounded-2xl bg-white/80 shadow-sm overflow-hidden group"
							data-journey-card
						>
							<div
								class="absolute left-2 md:left-1 top-8 w-3 h-3 rounded-full bg-secondary ring-4 ring-secondary/20 group-hover:ring-primary/30 transition-all duration-200"
							></div>
							<div class="flex items-center gap-3 text-sm font-link uppercase tracking-[0.12em]">
								<span class="px-3 py-1 bg-black text-white rounded-full">{project.type}</span>
								<span class="text-black/60">{project.metrics}</span>
							</div>
							<h3 class="font-header text-2xl md:text-3xl mt-3 mb-2">{project.name}</h3>
							<p class="font-cabinet text-base md:text-lg text-black/70 leading-relaxed">
								{project.description}
							</p>
							<div class="mt-4 flex items-center gap-3 font-link text-sm uppercase tracking-[0.12em] text-black">
								<span class="px-3 py-1 bg-primary text-white rounded-full group-hover:bg-black transition-colors duration-200">View</span>
								<span class="group-hover:translate-x-1 transition-transform duration-200">&#8600;</span>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
