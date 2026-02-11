export default function Sendflowr() {
	return (
		<>
			<p className="text-black dark:text-white/90">
				SendFlowr is a personal project I built to learn about real-time data processing, event streaming, and modern backend technologies.
			</p>

			<p className="text-black dark:text-white/90">
				The core idea: building a system that intelligently determines when to send messages based on user behavior patterns and timing constraints.
			</p>

			<p className="text-black dark:text-white/90 font-medium">Tech Stack:</p>
			<ul className="list-disc list-inside space-y-2 text-black dark:text-white/80">
				<li><strong>Kafka</strong> for real-time event streaming</li>
				<li><strong>ClickHouse</strong> for fast analytics on event data</li>
				<li><strong>FastAPI</strong> (Python) for the inference API</li>
				<li><strong>C# Connectors</strong> for processing incoming events</li>
				<li><strong>Docker Compose</strong> to wire everything together</li>
			</ul>

			<p className="text-black dark:text-white/90">
				The system accepts timing decision requests via API and returns optimal send times based on historical patterns and constraints. It's been a great playground for exploring identity resolution, ML timing logic, and distributed systems.
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
