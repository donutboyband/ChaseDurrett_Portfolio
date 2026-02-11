import { useState, useEffect } from 'react';

const TIMING_COMPARISON = [
	{ hour: '8 AM', traditional: 5, personalized: 2 },
	{ hour: '10 AM', traditional: 8, personalized: 15 },
	{ hour: '12 PM', traditional: 15, personalized: 8 },
	{ hour: '2 PM', traditional: 20, personalized: 45 },
	{ hour: '4 PM', traditional: 15, personalized: 10 },
	{ hour: '6 PM', traditional: 12, personalized: 5 },
	{ hour: '8 PM', traditional: 18, personalized: 10 },
	{ hour: '10 PM', traditional: 7, personalized: 5 }
];

export default function Sendflowr() {
	const [animatedIndex, setAnimatedIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setAnimatedIndex((prev) => (prev + 1) % TIMING_COMPARISON.length);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<h1 className="font-header text-3xl md:text-4xl lg:text-5xl text-black dark:text-white mb-4">
				The Sendflowr idea
			</h1>
			<p className="text-black dark:text-white/90">
				SendFlowr is a personal project exploring the question:{' '}
				<em>when is the best time to send an email to a specific person?</em> Most email tools pick
				a "best hour" based on simple aggregate stats, but that misses a lot of nuance in how
				individuals actually behave.
			</p>

			<p className="text-black dark:text-white/90 font-medium">The Core Problem</p>
			<p className="text-black dark:text-white/90">
				Traditional email timing tools group users into broad "engagement blocks" and send at the
				most popular hour. SendFlowr takes a different approach: it tracks user activity at a
				minute-by-minute level, builds probability curves for engagement based on real events
				(opens, clicks, site visits), and updates predictions in real time as new data streams in.
			</p>

			{/* Animated Timing Comparison */}
			<div className="my-8 p-6 border border-black/10 dark:border-white/10 rounded-xl bg-white/50 dark:bg-black/50">
				<p className="font-header text-black dark:text-white mb-4 text-center">
					Traditional vs. Personalized Timing
				</p>
				<div className="space-y-3">
					{TIMING_COMPARISON.map((data, idx) => {
						const isActive = idx === animatedIndex;
						return (
							<div key={data.hour} className="space-y-1">
								<div className="flex items-center justify-between text-xs text-black/60 dark:text-white/60">
									<span className={`font-cabinet ${isActive ? 'font-bold text-black dark:text-white' : ''}`}>
										{data.hour}
									</span>
								</div>
								<div className="flex gap-2">
									<div className="flex-1">
										<div className="h-6 bg-black/10 dark:bg-white/10 rounded overflow-hidden">
											<div
												className={`h-full bg-black/30 dark:bg-white/30 transition-all duration-500 ${isActive ? 'bg-black/50 dark:bg-white/50' : ''}`}
												style={{ width: `${data.traditional}%` }}
											/>
										</div>
									</div>
									<div className="flex-1">
										<div className="h-6 bg-black/10 dark:bg-white/10 rounded overflow-hidden">
											<div
												className={`h-full bg-blue-500 transition-all duration-500 ${isActive ? 'bg-blue-600 scale-y-110' : ''}`}
												style={{ width: `${data.personalized}%` }}
											/>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className="flex justify-between mt-4 text-xs text-black/60 dark:text-white/60">
					<span>← Traditional (aggregate)</span>
					<span>Personalized (per-user) →</span>
				</div>
			</div>

			<p className="text-black dark:text-white/90 font-medium">How It Works</p>
			<p className="text-black dark:text-white/90">
				The system processes webhook events from various platforms (Klaviyo, Shopify, etc.) through
				Kafka, resolves identities by stitching together emails, phone numbers, and platform IDs,
				then stores everything in ClickHouse for fast analytics.
			</p>

			<p className="text-black dark:text-white/90">
				When you ask for a timing decision via the FastAPI endpoint, it considers:
			</p>
			<ul className="list-disc list-inside space-y-2 text-black dark:text-white/80">
				<li>Historical engagement patterns for that specific user</li>
				<li>Time-of-day and day-of-week probabilities</li>
				<li>Timing constraints (send_after and send_before)</li>
				<li>Platform-specific latency (ML-predicted delivery delays)</li>
			</ul>

			<p className="text-black dark:text-white/90">
				The API returns a trigger timestamp with a confidence score, telling you exactly when to
				queue the email to land at the optimal moment.
			</p>

			<p className="text-black dark:text-white/90 font-medium">Tech Stack</p>
			<ul className="list-disc list-inside space-y-2 text-black dark:text-white/80">
				<li>
					<strong>Kafka</strong> – Real-time event streaming backbone
				</li>
				<li>
					<strong>ClickHouse</strong> – Fast columnar analytics for time-series queries
				</li>
				<li>
					<strong>FastAPI</strong> (Python) – Inference API for timing decisions
				</li>
				<li>
					<strong>C# Connectors</strong> – Process incoming webhook events into canonical format
				</li>
				<li>
					<strong>Docker Compose</strong> – Orchestrates all services locally
				</li>
			</ul>

			<p className="text-black dark:text-white/90 font-medium">Project Structure</p>
			<p className="text-black dark:text-white/80">
				<code>src/SendFlowr.Inference/</code> – Python FastAPI service
				<br />
				<code>src/SendFlowr.Connectors/</code> – C# webhook connectors
				<br />
				<code>src/SendFlowr.Consumer/</code> – Kafka consumer
				<br />
				<code>schemas/</code> – SQL and JSON schemas
			</p>

			<p className="text-black dark:text-white/90">
				It's not production-ready, but it's been a fantastic playground for learning about
				distributed systems, identity resolution, and event-driven architecture.
			</p>

			<p className="text-black dark:text-white/90">
				Check out the code on{' '}
				<a
					href="https://github.com/donutboyband/SendFlowr"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 hover:underline"
				>
					GitHub
				</a>
				.
			</p>
		</>
	);
}
