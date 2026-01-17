<script>
import '../app.css';
import Header from '$lib/components/header.svelte';
import Footer from '$lib/components/footer.svelte';
import { onMount } from 'svelte';
import { theme } from '$lib/stores/theme';

	onMount(() => {
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// Listen to the resize event
		window.addEventListener('resize', () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});

		theme.init();
	});
</script>

<Header />
<slot />
<Footer />
