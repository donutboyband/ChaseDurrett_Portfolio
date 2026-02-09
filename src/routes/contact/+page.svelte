<script lang="ts">
	import CowboyHat from '../../lib/images/CowboyHat.svelte';
	import { onMount } from 'svelte';
	const recipientEmail = 'chase@cdinfosec.com';
	const okcCoords: [number, number] = [-97.5164, 35.4676];
	let globeRef: HTMLDivElement | null = null;
	let cleanupGlobe: (() => void) | null = null;
	type ArcPath = {
		coords: [number, number];
		pathEl: any;
	};

	let form = {
		name: '',
		email: '',
		project: '',
		timeline: '',
		budget: ''
	};

	const handleSubmit = () => {
		const subject = encodeURIComponent('New project inquiry');
		const body = encodeURIComponent(
			[`Email: ${form.email}`, '', `Details:`, form.project || 'I want to chat about...'].join('\n')
		);

		const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
		window.location.href = mailtoLink;
	};

	const createGlobe = async () => {
		if (!globeRef) return;
		const [
			{ select, geoOrthographic, geoPath, geoGraticule10, timer, easeCubicOut },
			topojson,
			worldAtlas
		] = await Promise.all([
			import('d3'),
			import('topojson-client'),
			import('world-atlas/countries-110m.json')
		]);

		const worldData: any = (worldAtlas as any).default ?? worldAtlas;
		const land = topojson.feature(worldData, worldData.objects.countries);

		// Responsive size: smaller on mobile
		const isMobile = window.innerWidth < 640;
		const size = isMobile ? 280 : 400;
		const svg = select(globeRef)
			.append('svg')
			.attr('viewBox', `0 0 ${size} ${size}`)
			.attr('width', size)
			.attr('height', size)
			.classed('globe-svg', true);

		const projection = geoOrthographic()
			.scale(size * 0.28)
			.translate([size / 2, size / 2])
			.clipAngle(90)
			.precision(0.5);

		const path = geoPath(projection);
		const graticule = geoGraticule10();

		const sphere = svg
			.append('path')
			.datum({ type: 'Sphere' })
			.attr('fill', '#eef2ff')
			.attr('stroke', '#c7d2fe')
			.attr('stroke-width', 1);

		const landPath = svg
			.append('path')
			.datum(land)
			.attr('fill', '#0f172a')
			.attr('fill-opacity', 0.72);

		const grid = svg
			.append('path')
			.datum(graticule)
			.attr('fill', 'none')
			.attr('stroke', '#94a3b8')
			.attr('stroke-width', 0.6)
			.attr('stroke-opacity', 0.25);

		const arcGroup = svg
			.append('g')
			.attr('fill', 'none')
			.attr('stroke', '#3b82f6')
			.attr('stroke-opacity', 0.6);

		const activeArcs: ArcPath[] = [];

		const okcDot = svg
			.append('g')
			.attr('class', 'okc-dot')
			.append('circle')
			.attr('r', 4)
			.attr('fill', '#4939C2')
			.attr('stroke', '#4939C2')
			.attr('stroke-width', 1.5);

		const okcPulse = svg
			.append('circle')
			.attr('r', 6)
			.attr('fill', 'none')
			.attr('stroke', '#4939C2')
			.attr('stroke-width', 1.5)
			.attr('stroke-opacity', 0.5);

		const updatePaths = () => {
			sphere.attr('d', path as any);
			landPath.attr('d', path as any);
			grid.attr('d', path as any);
			activeArcs.forEach((arc) => {
				arc.pathEl.attr(
					'd',
					path({
						type: 'LineString',
						coordinates: [okcCoords, arc.coords]
					} as any)
				);
			});
			const projected = projection(okcCoords);
			if (projected) {
				const [x, y] = projected;
				okcDot.attr('cx', x).attr('cy', y);
				okcPulse.attr('cx', x).attr('cy', y);
			}
		};

		updatePaths();

		const spinSpeed = 0.02; // deg per ms
		const rotateFn = timer((elapsed: number) => {
			const rotation = spinSpeed * elapsed;
			projection.rotate([rotation, -15]);
			updatePaths();
		});

		const pulse = () => {
			okcPulse
				.attr('r', 6)
				.attr('opacity', 0.6)
				.transition()
				.duration(1400)
				.ease(easeCubicOut)
				.attr('r', 22)
				.attr('opacity', 0)
				.on('end', pulse);
		};
		pulse();

		const randomCoord = (): [number, number] => {
			const lon = Math.random() * 360 - 180;
			const lat = Math.random() * 170 - 85;
			return [lon, lat];
		};

		const spawnArc = () => {
			const coords = randomCoord();
			const pathEl = arcGroup
				.append('path')
				.attr('class', 'globe-arc')
				.attr('stroke-width', 1.2)
				.attr('stroke-dasharray', '6 8')
				.attr('stroke-linecap', 'round')
				.style('animation-delay', '0s')
				.style('opacity', 0);

			const arc: ArcPath = { coords, pathEl };
			activeArcs.push(arc);
			updatePaths();

			pathEl
				.transition()
				.duration(250)
				.style('opacity', 1)
				.transition()
				.duration(2500)
				.styleTween('stroke-dashoffset', () => (t) => `${-220 * t}`)
				.style('opacity', 0)
				.on('end', () => {
					pathEl.remove();
					const idx = activeArcs.indexOf(arc);
					if (idx > -1) activeArcs.splice(idx, 1);
				});
		};

		const arcInterval = setInterval(spawnArc, 650);

		cleanupGlobe = () => {
			rotateFn.stop();
			svg.remove();
			clearInterval(arcInterval);
		};
	};

	onMount(() => {
		createGlobe();
		return () => {
			if (cleanupGlobe) cleanupGlobe();
		};
	});
</script>

<section
	class="w-full min-h-screen text-black dark:text-white py-16 px-6 md:py-20 md:px-12 lg:px-20 transition-colors"
>
	<div class="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr,1fr] gap-8 md:gap-12">
		<div class="order-2 lg:order-1">
			<div class="space-y-6">
				<p class="font-link text-xs tracking-[0.25em] uppercase text-black/60 dark:text-white/60">
					Contact
				</p>
				<h1 class="font-header text-3xl sm:text-4xl md:text-5xl leading-tight">Let's get connected!</h1>
				<p class="font-cabinet text-lg text-black dark:text-white/70 leading-relaxed max-w-2xl">
					(if you want)
				</p>

				<div class="grid sm:grid-cols-2 gap-4">
					<div
						class="p-4 border border-black/10 dark:border-white/10 rounded-2xl bg-white/80 dark:bg-slate-900/60 shadow-sm"
					>
						<div class="flex items-center justify-start gap-2">
							<div
								class="animate-pulse w-2 h-2 rounded-full bg-primary ring-2 ring-primary/20"
							></div>
							<p
								class="font-link text-xs uppercase tracking-[0.18em] text-black/60 dark:text-white/60"
							>
								Email
							</p>
						</div>
						<p class="font-header text-xl mt-2 break-all text-black dark:text-white">
							{recipientEmail}
						</p>
					</div>
					<div
						class="p-4 border border-black/10 dark:border-white/10 rounded-2xl bg-white/80 dark:bg-slate-900/60 shadow-sm"
					>
						<div class="flex items-center justify-start gap-2">
							<div
								class="animate-pulse w-2 h-2 rounded-full bg-primary ring-2 ring-primary/20"
							></div>
							<p
								class="font-link text-xs uppercase tracking-[0.18em] text-black/60 dark:text-white/60"
							>
								Based in
							</p>
						</div>
						<p class="font-header text-xl mt-2 flex items-center text-black dark:text-white">
							OKC — Remote
						</p>
					</div>
				</div>
			</div>
			<div class="globe-wrapper" bind:this={globeRef}></div>
		</div>

		<div class="flex items-center justify-center order-1 lg:order-2">
			<form
				class="w-full max-w-md p-6 md:p-8 border border-black/10 dark:border-white/10 rounded-3xl bg-white/90 dark:bg-slate-900 shadow-sm space-y-5 flex flex-col justify-center transition-colors"
				on:submit|preventDefault={handleSubmit}
			>
				<div class="space-y-2">
					<label
						class="font-link text-xs uppercase tracking-[0.18em] text-black/60 dark:text-white/60"
						for="email">Email</label
					>
					<input
						id="email"
						type="email"
						class="w-full bg-white dark:bg-slate-800 border border-black/15 dark:border-white/10 rounded-xl px-4 py-3 font-cabinet text-base text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition"
						placeholder="you@email.com"
						bind:value={form.email}
						required
					/>
				</div>

				<div class="space-y-2">
					<label
						class="font-link text-xs uppercase tracking-[0.18em] text-black/60 dark:text-white/60"
						for="project">Details</label
					>
					<textarea
						id="project"
						class="w-full bg-white dark:bg-slate-800 border border-black/15 dark:border-white/10 rounded-xl px-4 py-3 font-cabinet text-base text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition min-h-[140px]"
						placeholder="What's up?"
						bind:value={form.project}
						required
					></textarea>
				</div>
				<button
					type="submit"
					class="w-full bg-black dark:bg-primary text-white hover:text-black dark:hover:text-white dark:hover:bg-primary font-link uppercase tracking-[0.2em] rounded-xl py-4 hover:bg-[#baff29] transition-colors"
				>
					Send email
				</button>
				<p class="font-cabinet text-sm text-black/90 dark:text-white/70 text-center">
					This opens your email client with the details pre-filled.
				</p>
			</form>
		</div>
	</div>
</section>

<style>
	.globe-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem 0;
	}

	:global(.globe-svg) {
		max-width: 100%;
		width: auto;
		height: auto;
		filter: drop-shadow(0 12px 30px rgba(0, 0, 0, 0.1));
	}

	@media (max-width: 640px) {
		:global(.globe-svg) {
			max-width: 280px;
		}
	}

	:global(.globe-arc) {
		stroke-dasharray: 6 8;
		animation: fly-path 2.2s linear infinite;
	}

	@keyframes fly-path {
		from {
			stroke-dashoffset: 0;
		}
		to {
			stroke-dashoffset: -140;
		}
	}
</style>
