export default function About() {
	return (
		<>
			<p className="text-black dark:text-white/90">
				I&apos;m a full-stack developer based in Oklahoma City.
			</p>

			<p className="text-black dark:text-white/90">
				I am a builder that loves creating things in whatever medium I can-be it coding or music.
			</p>

			<p className="text-black dark:text-white/90">
				You can reach me on{' '}
				<a
					href="https://www.linkedin.com/in/chasedurrett/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 hover:underline"
				>
					LinkedIn
				</a>
				, check out my code on{' '}
				<a
					href="https://github.com/donutboyband"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 hover:underline"
				>
					GitHub
				</a>
				, or email me at{' '}
				<a href="mailto:chase@cdinfosec.com" className="text-blue-500 hover:underline">
					chase@cdinfosec.com
				</a>
				. Or check out my{' '}
				<a
					className="text-blue-500 hover:underline"
					href="https://open.spotify.com/artist/4e0F3Bqyp0BpE3VmNh4qKS?si=nYTZK383TaS3o9OfpHtDrA"
					target="_blank" rel="noreferrer"
				>
					band
				</a>
				.
			</p>
		</>
	);
}
