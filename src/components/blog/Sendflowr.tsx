import { useState, useEffect } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

const API_RESPONSE_JSON = `{
  "decision_id": "01JGXYZ789ABCDEF",
  "universal_id": "sf_b8783dbfc0024695",
  "target_minute_utc": 7195,
  "trigger_timestamp_utc": "2026-01-16T23:55:00Z",
  "latency_estimate_seconds": 300,
  "confidence_score": 0.72,
  "model_version": "baseline_v1",
  "explanation_ref": "exp_abc123",
  "created_at_utc": "2026-01-10T12:00:00Z",
  "debug": {
    "base_curve_peak_minute": 7200,
    "applied_weights": [
      {"signal": "shopify_browse", "weight": 0.3}
    ],
    "suppressed": false
  }
}`;

// Generate minute-level engagement probabilities (simulating real user pattern)
const generateMinuteData = () => {
	return Array.from({ length: 60 }).map((_, i) => {
		// Peak at minute 37 (2:37 PM)
		const distance = Math.abs(i - 37);
		const probability = Math.max(0, 1 - distance / 20) * 0.8;
		return Math.random() * 0.2 + probability; // Add some noise
	});
};

const MINUTE_PROBABILITIES = generateMinuteData();

export default function Sendflowr() {
	const [animatedIndex, setAnimatedIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setAnimatedIndex((prev) => {
				// When we reach minute 37 (peak), pause
				if (prev === 37) {
					setIsPaused(true);
					setTimeout(() => {
						setIsPaused(false);
						setAnimatedIndex(0); // Restart
					}, 2000); // Pause for 2 seconds
					return prev;
				}
				// Don't increment if paused
				if (isPaused) return prev;
				// Continue to 60, then reset
				return prev >= 59 ? 0 : prev + 1;
			});
		}, 100);
		return () => clearInterval(interval);
	}, [isPaused]);

	return (
		<>
			<h1 className="font-header text-3xl md:text-4xl lg:text-5xl text-black dark:text-white mb-4">
				🌸 The Sendflowr idea
			</h1>
			<p className="text-black dark:text-white/90">
				SendFlowr is a personal project trying to tackle this problem:{' '}
				<em>when is the best time to send an email to a specific person for maximum engagement? And how do you account for email delivery latency to ensure that your email lands at the top of the inbox at the right moment?</em> 
			</p>

			<p className="text-black dark:text-white/90 font-medium">The Core Problem</p>
			<p className="text-black dark:text-white/90">
				Traditional email timing tools group users into broad &quot;engagement blocks&quot; and send at the
				most popular hour. SendFlowr tries to take a different approach: it tracks user activity at a
				minute-by-minute level, builds probability curves for engagement based on real events
				(opens, clicks, site visits), and updates predictions in real time as new data streams in.
			</p>

			{/* Animated Timing Comparison - Minute vs Hour Resolution */}
			<div className="my-8 p-6 border border-black/10 dark:border-white/10 rounded-xl bg-white/50 dark:bg-black/50">
				<p className="font-header text-black dark:text-white mb-2 text-center">
					Hour-Level Buckets vs. Minute-Level Precision
				</p>
				<p className="text-xs text-black/60 dark:text-white/60 text-center mb-6">
					Traditional tools group all activity from 2:00-3:00 PM together
				</p>
				
				{/* Hour-level (Traditional) */}
				<div className="mb-6">
					<p className="text-sm font-medium text-black dark:text-white mb-2">Traditional (Hour-Level)</p>
					<div className="flex gap-1">
						<div className="flex-1 h-16 bg-black/20 dark:bg-white/20 rounded flex items-center justify-center">
							<span className="text-xs text-black/50 dark:text-white/50">2-3 PM</span>
						</div>
					</div>
					<p className="text-xs text-black/60 dark:text-white/60 mt-2">
						Everyone in the &quot;2-3 PM&quot; bucket gets the same send time (e.g., 2:00 PM)
					</p>
				</div>

				{/* Minute-level (SendFlowr) */}
				<div>
					<p className="text-sm font-medium text-black dark:text-white mb-2">
						SendFlowr (Minute-Level)
						{animatedIndex === 37 && (
							<span className="ml-2 text-xs text-blue-500 animate-pulse">
								✓ Peak found: 2:37 PM
							</span>
						)}
					</p>
					<div className="relative">
						<div className="flex gap-px">
							{MINUTE_PROBABILITIES.map((prob, i) => {
								const isScanning = i === animatedIndex;
								const isScanned = i < animatedIndex;
								const isPeak = i === 37;
								const height = prob * 100;
								
								return (
									<div
										key={i}
										className="flex-1 relative"
										title={`2:${String(i).padStart(2, '0')} PM - ${(prob * 100).toFixed(1)}% probability`}
									>
										<div className="h-16 flex items-end">
											<div
												className={`w-full rounded-t-sm transition-all duration-300 ${
													isScanning
														? 'bg-yellow-400 animate-pulse'
														: isScanned
														? isPeak
															? 'bg-blue-500'
															: 'bg-blue-400/60'
														: 'bg-black/10 dark:bg-white/10'
												}`}
												style={{ height: `${height}%` }}
											/>
										</div>
									</div>
								);
							})}
						</div>
						{/* Scanning line */}
						<div
							className="absolute top-0 w-0.5 h-16 bg-yellow-400 transition-all duration-100"
							style={{ left: `${(animatedIndex / 60) * 100}%` }}
						/>
					</div>
					<p className="text-xs text-black/60 dark:text-white/60 mt-2">
						Scanning through the hour... SendFlowr finds the exact minute with highest engagement probability.
					</p>
				</div>

				<div className="mt-6 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
					<p className="text-xs text-black dark:text-white/90">
						<strong>The difference:</strong> 10,080 minute slots per week vs. 168 hour buckets. 
						That&apos;s 60x more precision in understanding when someone actually engages.
					</p>
				</div>
			</div>

			<p className="text-black dark:text-white/90 font-medium">How It Works</p>
			
			<p className="text-black dark:text-white/90">
				SendFlowr implements two core systems working in tandem:
			</p>

			<div className="my-6 pl-4 border-l-2 border-black/20 dark:border-white/20">
				<p className="text-black dark:text-white/90 font-medium mb-2">1. Universal Identity Resolution</p>
				<p className="text-black dark:text-white/80 text-base">
					Before making any timing decision, SendFlowr stitches together your scattered identity signals into a single Universal ID. It combines <strong>deterministic keys</strong> (email hash, phone number) with <strong>probabilistic keys</strong> (Klaviyo ID, Shopify customer ID) using a graph-based resolution algorithm.
				</p>
				<p className="text-black dark:text-white/70 text-sm mt-2">
					This means when someone opens an email from Klaviyo, clicks a link, then later buys something on Shopify with a different email—SendFlowr knows it&apos;s the same person.
				</p>
			</div>

			<div className="my-6 pl-4 border-l-2 border-black/20 dark:border-white/20">
				<p className="text-black dark:text-white/90 font-medium mb-2">2. Minute-Level Timing Intelligence</p>
				<p className="text-black dark:text-white/80 text-base">
					Instead of simple hourly buckets, SendFlowr operates on a <strong>10,080-slot weekly grid</strong> (every minute of the week). It builds continuous probability curves from your engagement history, then finds the optimal send window based on your constraints.
				</p>
				<p className="text-black dark:text-white/70 text-sm mt-2">
					The system even accounts for platform latency—if Klaviyo typically takes 5 minutes to process sends, it triggers early so your email lands exactly when engagement probability peaks.
				</p>
			</div>

			<p className="text-black dark:text-white/90">
				When you make a timing decision request, SendFlowr:
			</p>
			<ul className="list-disc list-inside space-y-2 text-black dark:text-white/80">
				<li>Resolves your identity signals to a Universal ID (via graph traversal)</li>
				<li>Pulls minute-level engagement features from ClickHouse (cached in Redis)</li>
				<li>Generates a continuous probability curve across 10,080 time slots</li>
				<li>Finds the optimal window respecting your send_after/send_before constraints</li>
				<li>Compensates for platform latency to calculate the trigger timestamp</li>
				<li>Returns a decision with confidence score and explanation</li>
			</ul>

			<p className="text-black dark:text-white/90 font-medium">Example API Response</p>
			<div className="my-4 overflow-x-auto rounded-lg border border-black/10 dark:border-white/10">
				<Highlight theme={themes.nightOwl} code={API_RESPONSE_JSON} language="json">
					{({ style, tokens, getLineProps, getTokenProps }) => (
						<pre style={style} className="p-4 text-sm overflow-x-auto">
							{tokens.map((line, i) => (
								<div key={i} {...getLineProps({ line })}>
									{line.map((token, key) => (
										<span key={key} {...getTokenProps({ token })} />
									))}
								</div>
							))}
						</pre>
					)}
				</Highlight>
			</div>

			<p className="text-black dark:text-white/90 font-medium">The Architecture</p>
			<p className="text-black dark:text-white/80 text-base">
				The system is built as a headless timing intelligence layer—it doesn&apos;t own campaign UIs or ESP execution, just the timing logic.
			</p>
			<ul className="list-disc list-inside space-y-2 text-black dark:text-white/80">
				<li><strong>Kafka</strong> – Real-time event streaming from webhooks (Klaviyo, Shopify, etc.)</li>
				<li><strong>ClickHouse</strong> – Columnar analytics database for fast time-series queries on millions of events</li>
				<li><strong>Redis</strong> – Feature cache for sub-10ms lookups</li>
				<li><strong>FastAPI</strong> (Python) – Inference API that orchestrates identity resolution and timing decisions</li>
				<li><strong>C# Connectors</strong> – Process incoming webhook events into canonical format</li>
			</ul>

			<p className="text-black dark:text-white/90 font-medium mt-6">Key Technical Choices</p>
			<div className="space-y-3 text-sm my-4">
				<div className="pl-4 border-l-2 border-blue-500/30">
					<p className="text-black dark:text-white/90 font-medium">Why minute-level, not hourly?</p>
					<p className="text-black dark:text-white/70">
						User behavior doesn&apos;t snap to hour boundaries. Someone who always opens emails at 2:37 PM shouldn&apos;t get lumped into a &quot;2-3 PM&quot; bucket with people who engage at 2:05 PM.
					</p>
				</div>
				<div className="pl-4 border-l-2 border-blue-500/30">
					<p className="text-black dark:text-white/90 font-medium">Why graph-based identity?</p>
					<p className="text-black dark:text-white/70">
						People use multiple emails, change phone numbers, and interact across platforms. A simple key-value lookup misses cross-platform identity connections.
					</p>
				</div>
				<div className="pl-4 border-l-2 border-blue-500/30">
					<p className="text-black dark:text-white/90 font-medium">Why latency compensation?</p>
					<p className="text-black dark:text-white/70">
						If you want an email to land at 3:00 PM but your ESP takes 5 minutes to send, you need to trigger at 2:55 PM. Most tools ignore this.
					</p>
				</div>
			</div>

			<p className="text-black dark:text-white/90 font-medium">Project Structure</p>
			<p className="text-black dark:text-white/70 text-sm">
				<code>src/SendFlowr.Inference/</code> – Python FastAPI service<br />
				<code>src/SendFlowr.Connectors/</code> – C# webhook connectors<br />
				<code>src/SendFlowr.Consumer/</code> – Kafka consumer<br />
				<code>schemas/</code> – ClickHouse SQL and JSON schemas
			</p>

			<p className="text-black dark:text-white/90 font-medium mt-6">What I Learned</p>
			<p className="text-black dark:text-white/90">
				This project taught me about:
			</p>
			<ul className="list-disc list-inside space-y-2 text-black dark:text-white/80">
				<li>Treating identity as a graph problem, not a lookup table</li>
				<li>Building continuous probability models instead of discrete buckets</li>
				<li>Accounting for platform-specific latency, and latency as a problem in general</li>
				<li>Making architectural decisions auditable and explainable</li>
			</ul>

			<p className="text-black dark:text-white/90">
				It&apos;s not production-ready (or even mostly development-ready), but it&apos;s been a good playground for exploring concepts that I&apos;m trying to get better at, all of which I certainly have not mastered.
			</p>

			<p className="text-black dark:text-white/90">
				Check it out on{' '}
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
