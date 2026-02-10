import { useState, useEffect } from 'react';

const LOOP_STEPS = [
	{ step: 1, actor: 'Agent', action: 'enters long-polling state, waiting for requests' },
	{ step: 2, actor: 'Browser', action: 'sends user request via MCP server' },
	{ step: 3, actor: 'Agent', action: 'completes work, communicates progress back' },
	{ step: 4, actor: 'Loop', action: 'returns to step 1' },
];

export default function BuildingEyeglass() {
	const [currentStep, setCurrentStep] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentStep((prev) => (prev + 1) % LOOP_STEPS.length);
		}, 2000);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<h1 className="font-header text-4xl md:text-5xl text-black dark:text-white mb-4">
				Building Eyeglass
			</h1>
			<p className="text-black dark:text-white/90">
				I was exploring the tool—and rapidly evolving Agentic semantic understanding standard—{' '}
				<a
					href="https://agentation.dev"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 hover:underline font-header"
				>
					Agentation
				</a>{' '}
				recently. It's a simple idea, but the execution is incredible and once I started using it I
				started dreading chatting to an agent about frontend changes <em>NOT</em> using Agentation.
			</p>

			<p className="text-black dark:text-white/90">
				As I used it, I wanted more and more to not leave the browser for the requests. It sounds
				spoiled, but I imagined there were real benefits from not leaving the browser. Some being
				less context-switching and a constraint that forces the tool's UI to be <em>really</em>{' '}
				comprehensive. Thus the idea for <strong className="font-header">Eyeglass</strong> was born.
			</p>

			<p className="text-black dark:text-white/90">
				Over one week I fervently recreated Agentation in my own way with <em>one goal</em>: two-way
				communication from the browser.
			</p>

			<div className="my-8 p-6 border border-black/10 dark:border-white/10 rounded-xl bg-black/5 dark:bg-white/5">
				<p className="text-black dark:text-white/90 mb-3">
					<strong className="font-header">Why?</strong>
				</p>
				<ul className="space-y-2 text-black/80 dark:text-white/80">
					<li>→ Prove to myself I could make a "magic" tool (it's kind of magic)</li>
					<li>→ Prove Geoffrey Huntley's point: with Agentic AI, there are no software moats</li>
					<li>→ The only limit in development is now imagination</li>
				</ul>
				<p className="text-sm text-black/60 dark:text-white/60 mt-4 italic">
					Though, you get better (and{' '}
					<a
						className="text-blue-500"
						href="https://acuvity.ai/the-clawdbot-dumpster-fire-72-hours-that-exposed-everything-wrong-with-ai-security/"
						target="_blank"
						rel="noreferrer"
					>
						safer
					</a>
					) results if you know what you're doing technically.
				</p>
			</div>

			<p className="text-black dark:text-white/90">
				AI coding agents are incredible, but as Benji Taylor, the creator of Agentation, pointed
				out:
			</p>

			<div className="my-10 p-6 border-l-4 border-blue-500 bg-blue-500/5 dark:bg-blue-500/10 rounded-r-lg">
				<p className="text-black/70 dark:text-white/90 text-sm font-header">
					"When you describe a problem in words, precision gets lost. "The button hover feels
					sluggish": which part? The delay before it starts? The duration? The easing? "The sidebar
					looks off": which element? What's off about it? I know exactly what I mean when I see it,
					but translating that into text loses information... The agent has to guess which element
					you mean, search for it in the codebase, and hope it found the right one. The more
					specific your feedback, the less guesswork for the agent, but specificity is tedious to
					type out. Screenshots are only somewhat better because the agent still has to infer which
					part you're referring to."
				</p>
			</div>

			<p className="text-black dark:text-white/90">
				So, I gave myself a challenge: build a dev tool like Agentation that communicates a sematic
				snapshot to an agent via an MCP server, and create the UI so that the dev/user never has to
				leave the browser. 96 hours later, <strong className="font-header">Eyeglass</strong> was
				born.
			</p>

			{/* The Challenge Section */}
			<h2 className="font-header text-2xl md:text-3xl text-black dark:text-white mt-12 mb-6">
				The Challenge
			</h2>

			<p className="text-black dark:text-white/90 mb-6">
				How do you make an agent respond to browser events without the user leaving the page?
			</p>

			{/* Two Approaches */}
			<div className="grid md:grid-cols-2 gap-4 my-8">
				{/* First Approach - Failed */}
				<div className="p-5 border border-black/20 dark:border-white/20 rounded-xl bg-white dark:bg-black">
					<div className="flex items-center gap-2 mb-3">
						<span className="text-black/40 dark:text-white/40 text-xl">✕</span>
						<span className="font-header text-black dark:text-white">Approach 1: MCP Sampling</span>
					</div>
					<p className="text-sm text-black/60 dark:text-white/60">
						The MCP protocol has nascent support for <em>sampling</em>, which allows an MCP server
						to prompt an agent directly. However, even Claude Code doesn't support this yet.
					</p>
				</div>

				{/* Second Approach - Success */}
				<div className="p-5 border-2 border-black dark:border-white rounded-xl bg-white dark:bg-black">
					<div className="flex items-center gap-2 mb-3">
						<span className="text-black dark:text-white text-xl">✓</span>
						<span className="font-header text-black dark:text-white">Approach 2: Long-Polling</span>
					</div>
					<p className="text-sm text-black/70 dark:text-white/70">
						Put the agent in a waiting state that <em>doesn't consume tokens</em>. When the browser
						sends a request, the agent wakes up and processes it.
					</p>
				</div>
			</div>

			{/* The Loop Diagram - Creative Circular */}
			<div className="my-12 relative">
				{/* Floating particles */}
				<div className="particle particle-1" />
				<div className="particle particle-2" />
				<div className="particle particle-3" />

				<div className="p-8 relative overflow-hidden">
					{/* Hand-drawn style title */}
					<p className="font-header text-black dark:text-white mb-2 text-center text-2xl">
						The Loop
					</p>
					<p className="text-center text-black/50 dark:text-white/50 text-sm mb-10 italic">
						it just keeps going...
					</p>

					{/* Circular visualization */}
					<div className="relative w-72 h-72 mx-auto">
						{/* Orbit ring - aligned with center of blobs */}
						<div className="absolute inset-6 rounded-full border-2 border-dashed border-black/10 dark:border-white/10 orbit-spin" />

						{/* The 4 nodes arranged in a circle */}
						{LOOP_STEPS.map((step, idx) => {
							const angle = (idx * 90 - 90) * (Math.PI / 180);
							const radius = 120;
							const x = Math.cos(angle) * radius;
							const y = Math.sin(angle) * radius;
							const isActive = idx === currentStep;

							return (
								<div
									key={idx}
									className="absolute transition-all duration-500"
									style={{
										left: `calc(50% + ${x}px - 24px)`,
										top: `calc(50% + ${y}px - 24px)`,
									}}
								>
									<div
										className={`
											w-12 h-12 rounded-full flex items-center justify-center
											font-header text-lg transition-all duration-300
											${isActive
												? 'bg-black dark:bg-white text-white dark:text-black scale-125 shadow-lg'
												: 'bg-white dark:bg-black border-2 border-black/30 dark:border-white/30 text-black/50 dark:text-white/50'
											}
										`}
									>
										{step.step}
									</div>
									{/* Label that appears on active */}
									<div
										className={`
											absolute whitespace-nowrap text-xs font-header
											transition-all duration-300
											${idx === 0 ? 'top-full mt-2 left-1/2 -translate-x-1/2' : ''}
											${idx === 1 ? 'left-full ml-2 top-1/2 -translate-y-1/2' : ''}
											${idx === 2 ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' : ''}
											${idx === 3 ? 'right-full mr-2 top-1/2 -translate-y-1/2' : ''}
											${isActive ? 'opacity-100' : 'opacity-0'}
										`}
									>
										<span className="highlight-text">{step.actor}</span>
									</div>
								</div>
							);
						})}

						{/* Center content */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div
								key={currentStep}
								className="text-center max-w-[140px] animate-fade-in"
							>
								<p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
									{LOOP_STEPS[currentStep].action}
								</p>
							</div>
						</div>
					</div>

					{/* Whimsical arrow */}
					<div className="text-center mt-8 text-black/30 dark:text-white/30">
						<span className="text-2xl wiggle">↻</span>
					</div>
				</div>
			</div>

			<style>{`
				@keyframes fade-in {
					from { opacity: 0; transform: scale(0.95); }
					to { opacity: 1; transform: scale(1); }
				}
				.animate-fade-in {
					animation: fade-in 0.4s ease-out;
				}

				@keyframes float {
					0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
					50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
				}
				.particle {
					position: absolute;
					width: 6px;
					height: 6px;
					border-radius: 50%;
					background: currentColor;
					opacity: 0.3;
				}
				.particle-1 {
					top: 20%;
					left: 10%;
					animation: float 4s ease-in-out infinite;
				}
				.particle-2 {
					top: 60%;
					right: 15%;
					animation: float 5s ease-in-out infinite 1s;
				}
				.particle-3 {
					bottom: 20%;
					left: 20%;
					animation: float 6s ease-in-out infinite 2s;
				}

				@keyframes orbit {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
				.orbit-spin {
					animation: orbit 20s linear infinite;
				}

				.highlight-text {
					background: linear-gradient(120deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%);
					padding: 2px 8px;
					border-radius: 4px;
				}
				:is(.dark) .highlight-text {
					background: linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
				}

				.traveling-dot {
					position: absolute;
					width: 8px;
					height: 8px;
					background: black;
					border-radius: 50%;
					left: 50%;
					top: 50%;
					transform: rotate(var(--angle)) translateX(120px) translateY(-50%);
					transition: transform 0.5s ease-in-out;
				}
				:is(.dark) .traveling-dot {
					background: white;
				}

				@keyframes wiggle {
					0%, 100% { transform: rotate(0deg); }
					25% { transform: rotate(-10deg); }
					75% { transform: rotate(10deg); }
				}
				.wiggle {
					display: inline-block;
					animation: wiggle 2s ease-in-out infinite;
				}
			`}</style>
		</>
	);
}
