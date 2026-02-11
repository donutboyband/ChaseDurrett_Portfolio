import { useEffect, useRef, useState } from 'react';

export default function MouseBlob() {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const rafRef = useRef(0);
	const stateRef = useRef({
		tx: 0,
		ty: 0,
		cx: 0,
		cy: 0,
		vx: 0,
		vy: 0,
		lastTS: 0,
		lastMove: 0
	});

	const size = 420;
	const idleThreshold = 600;
	const stiffness = 0.01;
	const damping = 0.85;
	const idleDriftForce = 0.3;
	const maxVelocity = 15;
	const bounceElasticity = 0.6;

	useEffect(() => {
		const state = stateRef.current;

		// Initialize to center
		state.cx = window.innerWidth / 2;
		state.cy = window.innerHeight / 2;
		state.tx = state.cx;
		state.ty = state.cy;
		state.lastMove = performance.now();
		setPosition({ x: state.cx, y: state.cy });

		function onPointerMove(e: PointerEvent) {
			state.tx = e.clientX;
			state.ty = e.clientY;
			state.lastMove = performance.now();
		}

		function animate(ts: number) {
			if (state.lastTS === 0) state.lastTS = ts;
			const dt = Math.min((ts - state.lastTS) / 16.67, 2);
			state.lastTS = ts;

			const timeSinceMove = ts - state.lastMove;
			const isIdle = timeSinceMove > idleThreshold;

			const dx = state.tx - state.cx;
			const dy = state.ty - state.cy;

			let fx = dx * stiffness;
			let fy = dy * stiffness;

			if (isIdle) {
				const driftX = Math.sin(ts * 0.0003) * idleDriftForce;
				const driftY = Math.cos(ts * 0.00025) * idleDriftForce;
				fx += driftX;
				fy += driftY;
			}

			state.vx += fx * dt;
			state.vy += fy * dt;

			state.vx *= damping;
			state.vy *= damping;

			const speed = Math.sqrt(state.vx * state.vx + state.vy * state.vy);
			if (speed > maxVelocity) {
				state.vx = (state.vx / speed) * maxVelocity;
				state.vy = (state.vy / speed) * maxVelocity;
			}

			state.cx += state.vx * dt;
			state.cy += state.vy * dt;

			const padding = size / 2;
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;

			if (state.cx - padding < 0) {
				state.cx = padding;
				state.vx = Math.abs(state.vx) * bounceElasticity;
			} else if (state.cx + padding > windowWidth) {
				state.cx = windowWidth - padding;
				state.vx = -Math.abs(state.vx) * bounceElasticity;
			}

			if (state.cy - padding < 0) {
				state.cy = padding;
				state.vy = Math.abs(state.vy) * bounceElasticity;
			} else if (state.cy + padding > windowHeight) {
				state.cy = windowHeight - padding;
				state.vy = -Math.abs(state.vy) * bounceElasticity;
			}

			setPosition({ x: state.cx, y: state.cy });
			rafRef.current = requestAnimationFrame(animate);
		}

		window.addEventListener('pointermove', onPointerMove, { passive: true });
		rafRef.current = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener('pointermove', onPointerMove);
			cancelAnimationFrame(rafRef.current);
		};
	}, []);

	return (
		<div
			className="mouse-blob"
			style={{
				transform: `translate3d(${position.x - size / 2}px, ${position.y - size / 2}px, 0)`,
				width: `${size}px`,
				height: `${size}px`
			}}
		/>
	);
}
