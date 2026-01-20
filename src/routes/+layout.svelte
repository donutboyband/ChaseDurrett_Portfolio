<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import MouseBlob from '$lib/components/MouseBlob.svelte';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';

	onMount(() => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		window.addEventListener('resize', () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});

		theme.init();
	});
</script>

<MouseBlob />

<div
	class="fixed top-0 z-[-1] h-screen w-screen bg-white dark:bg-slate-950 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"
></div>
<Header />
<slot />
<Footer />
