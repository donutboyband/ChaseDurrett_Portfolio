<script lang="ts">
	import { onMount } from 'svelte';

	let x = 0,
		y = 0;
	let tx = 0,
		ty = 0;
	let cx = 0,
		cy = 0;
	let vx = 0,
		vy = 0;
	let lastTS = 0,
		lastMove = 0;
	let raf = 0;
	const size = 420;
	const idleThreshold = 600;

	// Physics parameters
	const stiffness = 0.01;
	const damping = 0.85;
	const idleDriftForce = 0.3;
	const maxVelocity = 15;
	const bounceElasticity = 0.6;

	function onPointerMove(e: PointerEvent) {
		tx = e.clientX;
		ty = e.clientY;
		lastMove = performance.now();
	}

	function animate(ts: number) {
		if (lastTS === 0) lastTS = ts;
		const dt = Math.min((ts - lastTS) / 16.67, 2); // Normalize to 60fps frame, cap at 2 frames
		lastTS = ts;

		const timeSinceMove = ts - lastMove;
		const isIdle = timeSinceMove > idleThreshold;

		// Calculate forces
		const dx = tx - cx;
		const dy = ty - cy;

		// Spring force towards target
		let fx = dx * stiffness;
		let fy = dy * stiffness;

		// Idle drift (gentle wandering when mouse hasn't moved)
		if (isIdle) {
			const driftX = Math.sin(ts * 0.0003) * idleDriftForce;
			const driftY = Math.cos(ts * 0.00025) * idleDriftForce;
			fx += driftX;
			fy += driftY;
		}

		// Apply forces to velocity (F = ma, simplified: a = F)
		vx += fx * dt;
		vy += fy * dt;

		// Apply damping
		vx *= damping;
		vy *= damping;

		// Clamp velocity
		const speed = Math.sqrt(vx * vx + vy * vy);
		if (speed > maxVelocity) {
			vx = (vx / speed) * maxVelocity;
			vy = (vy / speed) * maxVelocity;
		}

		// Update position
		cx += vx * dt;
		cy += vy * dt;

		// Boundary bounce with window dimensions
		const padding = size / 2;
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		if (cx - padding < 0) {
			cx = padding;
			vx = Math.abs(vx) * bounceElasticity;
		} else if (cx + padding > windowWidth) {
			cx = windowWidth - padding;
			vx = -Math.abs(vx) * bounceElasticity;
		}

		if (cy - padding < 0) {
			cy = padding;
			vy = Math.abs(vy) * bounceElasticity;
		} else if (cy + padding > windowHeight) {
			cy = windowHeight - padding;
			vy = -Math.abs(vy) * bounceElasticity;
		}

		x = cx;
		y = cy;
		raf = requestAnimationFrame(animate);
	}

	onMount(() => {
		// Initialize to center
		cx = window.innerWidth / 2;
		cy = window.innerHeight / 2;
		tx = cx;
		ty = cy;
		x = cx;
		y = cy;
		lastMove = performance.now();

		window.addEventListener('pointermove', onPointerMove, { passive: true });
		raf = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener('pointermove', onPointerMove);
			cancelAnimationFrame(raf);
		};
	});
</script>

<div
	class="mouse-blob"
	style="transform: translate3d({x - size / 2}px, {y -
		size / 2}px, 0); width: {size}px; height: {size}px;"
></div>

<style>
	.mouse-blob {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 0;
		border-radius: 50%;
		pointer-events: none;
		background: radial-gradient(
			circle at center,
			rgba(0, 163, 255, 0.2) 0%,
			rgba(0, 163, 255, 0.1) 35%,
			rgba(0, 163, 255, 0.04) 60%,
			transparent 100%
		);
		filter: blur(48px);
		opacity: 0.95;
		transition:
			width 0.2s,
			height 0.2s;
		mix-blend-mode: screen;
		/* ensure visibility on light backgrounds */
		background-blend-mode: normal;
		will-change: transform;
	}

	:global(.dark) .mouse-blob {
		background: radial-gradient(
			circle at center,
			rgba(0, 163, 255, 0.2) 0%,
			rgba(0, 163, 255, 0.1) 35%,
			rgba(0, 163, 255, 0.04) 60%,
			transparent 100%
		);
		mix-blend-mode: screen;
	}
</style>
