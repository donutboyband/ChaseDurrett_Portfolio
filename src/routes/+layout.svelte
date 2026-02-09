<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import MouseBlob from '$lib/components/MouseBlob.svelte';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	$: metaData = $page.data || {};
	$: title = metaData.title || 'Chase Durrett | Full-Stack Developer';
	$: description =
		metaData.description ||
		'Full-stack developer specializing in React, .NET, and Svelte. Building clean, scalable applications.';
	$: keywords = metaData.keywords || 'Chase Durrett, Full Stack Developer, Web Development';
	$: ogImage = metaData.ogImage || '/og-image.png';
	$: url = $page.url.href;

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

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content="Chase Durrett" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={ogImage} />

	<!-- Canonical URL -->
	<link rel="canonical" href={url} />
</svelte:head>

<MouseBlob />

<div
	class="fixed top-0 z-[-1] h-screen w-screen bg-white dark:bg-slate-950 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"
></div>
<Header />
{#key $page.url.pathname}
	<div in:fade={{ duration: 250 }}>
		<slot />
	</div>
{/key}
<Footer />
