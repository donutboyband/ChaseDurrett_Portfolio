<script>
	import ChipButton from './ChipButton.svelte';
</script>

<footer class="w-full text-white px-6 md:px-12 lg:px-20 py-6">
	<div
		class="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/10 pt-4"
	>
		<p class="font-cabinet text-sm text-black dark:text-white">
			Made by <span class="font-header text-blue-500">Chase</span> with Svelte, D3, GSAP, & Tailwind —
			Based in OKC.
		</p>
		<div class="hidden sm:flex flex-row items-end gap-2 font-header px-8">
			<ChipButton tone="default" size="sm" href="/contact" ariaLabel="Toggle theme"
				>Contact</ChipButton
			>
			<ChipButton
				tone="default"
				size="sm"
				href="https://www.linkedin.com/in/chasedurrett/"
				target="_blank"
				ariaLabel="LinkedIn">LinkedIn</ChipButton
			>
			<ChipButton
				tone="default"
				size="sm"
				href="https://github.com/donutboyband"
				target="_blank"
				ariaLabel="Github Link">GitHub</ChipButton
			>
		</div>
	</div>
</footer>
