export default function Sendflowr() {
	return (
		<>
			<p className="text-black dark:text-white/90">
				SendFlowr is a personal project exploring the question: <em>when is the best time to send an email to a specific person?</em> Most email tools pick a "best hour" based on simple aggregate stats, but that misses a lot of nuance in how individuals actually behave.
			</p>

			<p className="text-black dark:text-white/90 font-medium">The Core Problem</p>
			<p className="text-black dark:text-white/90">
				Traditional email timing tools group users into broad "engagement blocks" and send at the most popular hour. SendFlowr takes a different approach: it tracks user activity at a minute-by-minute level, builds probability curves for engagement based on real events (opens, clicks, site visits), and updates predictions in real time as new data streams in.
			</p>

			<p className="text-black dark:text-white/90 font-medium">How It Works</p>
			<p className="text-black dark:text-white/90">
				The system processes webhook events from various platforms (Klaviyo, Shopify, etc.) through Kafka, resolves identities by stitching together emails, phone numbers, and platform IDs, then stores everything in ClickHouse for fast analytics.
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
				The API returns a trigger timestamp with a confidence score, telling you exactly when to queue the email to land at the optimal moment.
			</p>

			<p className="text-black dark:text-white/90 font-medium">Tech Stack</p>
			<ul className="list-disc list-inside space-y-2 text-black dark:text-white/80">
				<li><strong>Kafka</strong> – Real-time event streaming backbone</li>
				<li><strong>ClickHouse</strong> – Fast columnar analytics for time-series queries</li>
				<li><strong>FastAPI</strong> (Python) – Inference API for timing decisions</li>
				<li><strong>C# Connectors</strong> – Process incoming webhook events into canonical format</li>
				<li><strong>Docker Compose</strong> – Orchestrates all services locally</li>
			</ul>

			<p className="text-black dark:text-white/90 font-medium">Project Structure</p>
			<p className="text-black dark:text-white/80">
				<code>src/SendFlowr.Inference/</code> – Python FastAPI service<br />
				<code>src/SendFlowr.Connectors/</code> – C# webhook connectors<br />
				<code>src/SendFlowr.Consumer/</code> – Kafka consumer<br />
				<code>schemas/</code> – SQL and JSON schemas
			</p>

			<p className="text-black dark:text-white/90">
				It's not production-ready, but it's been a fantastic playground for learning about distributed systems, identity resolution, and event-driven architecture.
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
