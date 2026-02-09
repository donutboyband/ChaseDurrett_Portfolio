<script lang="ts">
	import { slide, fly, fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import MenuItem from './menuItem.svelte';
	import { theme, type Theme } from '$lib/stores/theme';
	import { onDestroy } from 'svelte';
	import ChipButton from './ChipButton.svelte';
	import { goto } from '$app/navigation';
	// custom transitions defined inline
	function slideDownIn(node: Element, { delay = 0, duration = 300, easing = cubicInOut } = {}) {
		return {
			delay,
			duration,
			easing,
			css: (t: number) => `transform: translateY(${(1 - t) * -100}%);`
		};
	}
	function slideDownOut(node: Element, { delay = 0, duration = 300, easing = cubicInOut } = {}) {
		return { delay, duration, easing, css: (t: number) => `transform: translateY(${t * 100}%);` };
	}
	let isOpen = false;
	let currentTheme: Theme = 'light';
	let unsubscribe = () => {};
	let isNavigating = false;

	if (typeof window !== 'undefined') {
		unsubscribe = theme.subscribe((value) => {
			currentTheme = value;
		});
	}

	const toggleTheme = () => theme.toggle();
	const handleNavigate = (event: CustomEvent<{ href: string }>) => {
		if (isNavigating) return;
		isNavigating = true;
		isOpen = false; // start closing animation
		goto(event.detail.href).finally(() => {
			isNavigating = false;
		});
	};

	onDestroy(() => unsubscribe());

	const workArr = ['FRONTEND', 'BACKEND', 'FULLSTACK', 'FRONTEND', 'BACKEND', 'FULLSTACK'];

	const contactArr = ['IDEAS', 'GOALS', 'DREAMS', 'IDEAS', 'GOALS', 'DREAMS'];
</script>

<header
	class="w-full h-16 sticky top-0 grid grid-cols-2 text-black dark:text-white z-10 transition-colors backdrop-blur"
>
	<div class="flex flex-row items-center gap-4 sm:gap-8">
		<a href="/">
			<h1
				class="h-full w-full font-header font-extrabold text-3xl flex justify-start items-center pl-4"
				in:fly={{ y: -12, opacity: 0, duration: 250, delay: 200 }}
			>
				CD <span class="text-blue-500">.</span>
			</h1>
		</a>
		<ChipButton
			tone="primary"
			size="sm"
			on:click={toggleTheme}
			ariaLabel="Toggle theme"
		>
			<span class="h-2 w-2 rounded-full {currentTheme === 'dark' ? 'bg-blue-400' : 'bg-black'}"
			></span>
			<span class="hidden sm:inline">{currentTheme === 'dark' ? 'Light' : 'Dark'}</span>
		</ChipButton>
	</div>
	<div class="flex justify-end items-center gap-3">
		<!-- Hamburger button -->
		{#if !isOpen}
			<button
				class="relative
          w-2/4 h-full group hover:cursor-pointer
          flex flex-col gap-y-2 justify-center items-end"
				on:click={() => (isOpen = !isOpen)}
				aria-label="Open menu"
				in:slide={{
					delay: 600,
					duration: 200,
					easing: cubicInOut,
					axis: 'x'
				}}
				out:slide={{ duration: 200, easing: cubicInOut, axis: 'x' }}
			>
				<div
					class="absolute h-0 w-full bg-black dark:bg-white inset-0 group-hover:h-full z-0 transition-all ease-in-out duration-200"
				></div>
				<span
					class="w-3/4 h-[2px] bg-black dark:bg-white mx-2 group-hover:bg-white dark:group-hover:bg-black z-10"
				></span>
				<span
					class="w-4/6 h-[2px] bg-black dark:bg-white mx-2 group-hover:bg-white dark:group-hover:bg-black z-10"
				></span>
				<span
					class="w-3/6 h-[2px] bg-black dark:bg-white mx-2 group-hover:bg-white dark:group-hover:bg-black z-10"
				></span>
			</button>
		{/if}
	</div>
</header>

<!-- Background Parts (conditionally rendered) -->
{#if isOpen}
	<div
		class="menu-bg-part fixed top-0 left-0 w-1/2 h-full bg-black dark:bg-slate-950 z-10"
		in:fly={{ y: -1000, duration: 300, easing: cubicInOut, opacity: 1 }}
		out:fly={{ y: 1000, duration: 300, delay: 100, easing: cubicInOut, opacity: 1 }}
	></div>

	<div
		class="menu-bg-part fixed top-0 right-0 w-1/2 h-full bg-black dark:bg-slate-950 z-10"
		in:fly={{ y: -1000, duration: 300, delay: 100, easing: cubicInOut, opacity: 1 }}
		out:fly={{ y: 1000, duration: 300, delay: 200, easing: cubicInOut, opacity: 1 }}
	></div>
{/if}

<!-- Transparent Menu Container (conditionally rendered) -->
{#if isOpen}
	<div
		class="menu fixed top-0 left-0 w-screen h-screen z-20"
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 200 }}
	>
		<!-- Close button and Menu Items (z-index above background parts) -->
		<div class="relative w-full h-full z-30 flex flex-col">
			<div class="flex flex-row justify-between items-center w-full px-4 sm:px-0">
				<div
					class="flex flex-row items-end gap-2 font-header sm:px-8"
					in:slide={{
						duration: 300,
						delay: 200,
						easing: cubicInOut,
						axis: 'x'
					}}
					out:slide={{ duration: 300, easing: cubicInOut, axis: 'x' }}
				>
					<ChipButton
						tone="default"
						size="sm"
						href="https://open.spotify.com/artist/4e0F3Bqyp0BpE3VmNh4qKS?si=GsVBTZSeQwqUiRRwFmdTnw"
						ariaLabel="Spotify"
						target="_blank"
					>
						<span class="hidden sm:inline">Spotify</span>
						<svg class="w-4 h-4 sm:hidden" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
						</svg>
					</ChipButton>
					<ChipButton
						tone="default"
						size="sm"
						href="https://www.linkedin.com/in/chasedurrett/"
						ariaLabel="LinkedIn"
						target="_blank"
					>
						<span class="hidden sm:inline">LinkedIn</span>
						<svg class="w-4 h-4 sm:hidden" viewBox="0 0 24 24" fill="currentColor">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
					</ChipButton>
					<ChipButton
						tone="default"
						size="sm"
						href="https://github.com/donutboyband"
						ariaLabel="GitHub"
						target="_blank"
					>
						<span class="hidden sm:inline">GitHub</span>
						<svg class="w-4 h-4 sm:hidden" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
						</svg>
					</ChipButton>
				</div>
				<div
					class="flex flex-row items-center gap-4 md:gap-6 text-white/75 text-sm font-link uppercase tracking-[0.16em]"
				>
					<button
						class="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32"
						on:click={() => (isOpen = false)}
						aria-label="Close menu"
						in:slide={{
							duration: 300,
							delay: 200,
							easing: cubicInOut,
							axis: 'x'
						}}
						out:slide={{ duration: 300, easing: cubicInOut, axis: 'x' }}
					>
						<svg
							class="w-full h-full"
							fill="none"
							stroke="white"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path stroke-width=".3" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</button>
				</div>
			</div>
			<ul
				class="flex flex-col items-center justify-center flex-grow font-link text-5xl md:text-6xl lg:text-8xl"
			>
				<MenuItem
					itemsArr={workArr}
					link="WORK"
					href="/work"
					borders={true}
					on:close={() => (isOpen = false)}
					on:navigate={handleNavigate}
				></MenuItem>
				<MenuItem
					itemsArr={contactArr}
					link="CONTACT"
					href="/contact"
					borders={true}
					on:close={() => (isOpen = false)}
					on:navigate={handleNavigate}
				></MenuItem>
			</ul>
			<div
				class="flex flex-row justify-between items-center px-4 md:px-10 pb-10 text-white/75 text-sm font-cabinet"
			>
				<div
					class="space-y-2"
					in:fade={{ duration: 300, delay: 400, easing: cubicInOut }}
					out:fade={{ duration: 250, easing: cubicInOut }}
				>
					<p class="text-white">chase@cdinfosec.com</p>
					<p class="text-white/70">Based in OKC · Remote</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	svg:hover,
	svg:active,
	svg:focus {
		stroke: #baff29;
	}
</style>
