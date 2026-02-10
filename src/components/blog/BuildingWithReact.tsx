export default function BuildingWithReact() {
	return (
		<>
			<p className="text-black dark:text-white/90">
				React continues to be my framework of choice for building modern web applications. The component-based architecture makes it easy to create reusable, maintainable code.
			</p>

			<p className="text-black dark:text-white/90">
				Recently, I've been exploring the new React Server Components and how they can improve performance for content-heavy applications. The ability to render components on the server and stream them to the client is a game-changer.
			</p>

			<p className="text-black dark:text-white/90">
				Some key takeaways from my experience:
			</p>

			<ul className="list-disc list-inside space-y-2 text-black dark:text-white/90">
				<li>Keep components small and focused</li>
				<li>Use TypeScript for better type safety</li>
				<li>Leverage hooks for cleaner state management</li>
				<li>Test components in isolation</li>
			</ul>
		</>
	);
}
