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
			[
				`Email: ${form.email}`,
				'',
				`Details:`,
				form.project || 'I want to chat about...'
			].join('\n')
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
		] =
			await Promise.all([
				import('d3'),
				import('topojson-client'),
				import('world-atlas/countries-110m.json')
			]);

		const worldData: any = (worldAtlas as any).default ?? worldAtlas;
		const land = topojson.feature(worldData, worldData.objects.countries);

		const size = 400;
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

		const landPath = svg.append('path').datum(land).attr('fill', '#0f172a').attr('fill-opacity', 0.72);

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
			.attr('fill', '#3b82f6')
			.attr('stroke', '#1d4ed8')
			.attr('stroke-width', 1.5);

		const okcPulse = svg
			.append('circle')
			.attr('r', 6)
			.attr('fill', 'none')
			.attr('stroke', '#3b82f6')
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

<section class="w-full min-h-screen bg-white text-black py-16 px-6 md:py-20 md:px-12 lg:px-20">
	<div class="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr,1fr] gap-12">
		<div>
			<div class="space-y-6">
				<p class="font-link text-xs tracking-[0.25em] uppercase text-black/60">Contact</p>
				<h1 class="font-header text-4xl md:text-5xl leading-tight">Let's get connected!</h1>
				<p class="font-cabinet text-lg text-black leading-relaxed max-w-2xl">(if you want)</p>

				<div class="grid sm:grid-cols-2 gap-4">
					<div class="p-4 border border-black/10 rounded-2xl bg-white/80 shadow-sm">
						<p class="font-link text-xs uppercase tracking-[0.18em] text-black/60">Email</p>
						<p class="font-header text-xl mt-2 break-all">{recipientEmail}</p>
					</div>
					<div class="p-4 border border-black/10 rounded-2xl bg-white/80 shadow-sm">
						<p class="font-link text-xs uppercase tracking-[0.18em] text-black/60">Based in</p>
						<p class="font-header text-xl mt-2 flex items-center">
							Remote — OKC <span><CowboyHat /></span>
						</p>
					</div>
				</div>
			</div>
				<div class="globe-wrapper" bind:this={globeRef}></div>
		</div>

		<div class="flex items-center justify-center">
		<form
			class="p-6 md:p-8 border border-black/10 rounded-3xl bg-white/90 shadow-sm space-y-5 flex flex-col justify-center"
			on:submit|preventDefault={handleSubmit}
		>
			<div class="space-y-2">
				<label class="font-link text-xs uppercase tracking-[0.18em] text-black/60" for="email"
					>Email</label
				>
				<input
					id="email"
					type="email"
					class="w-full bg-white border border-black/15 rounded-xl px-4 py-3 font-cabinet text-base focus:outline-none focus:border-black transition"
					placeholder="you@email.com"
					bind:value={form.email}
					required
				/>
			</div>

			<div class="space-y-2">
				<label class="font-link text-xs uppercase tracking-[0.18em] text-black/60" for="project"
					>Details</label
				>
				<textarea
					id="project"
					class="w-full bg-white border border-black/15 rounded-xl px-4 py-3 font-cabinet text-base focus:outline-none focus:border-black transition min-h-[140px]"
					placeholder="Site, product launch, creative direction, motion..."
					bind:value={form.project}
					required
				></textarea>
			</div>
			<button
				type="submit"
				class="w-full bg-black text-white font-link uppercase tracking-[0.2em] rounded-xl py-4 hover:bg-primary transition-colors"
			>
				Send email
			</button>
			<p class="font-cabinet text-sm text-black/90 text-center">
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
	}

	:global(.globe-svg) {
		max-width: 360px;
		filter: drop-shadow(0 12px 30px rgba(0, 0, 0, 0.1));
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
