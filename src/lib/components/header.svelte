<script lang="ts">
	import { slide, fly, fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import MenuItem from './menuItem.svelte';
	import { theme, type Theme } from '$lib/stores/theme';
	import { onDestroy } from 'svelte';
	import ChipButton from './ChipButton.svelte';
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

	if (typeof window !== 'undefined') {
		unsubscribe = theme.subscribe((value) => {
			currentTheme = value;
		});
	}

	const toggleTheme = () => theme.toggle();

	onDestroy(() => unsubscribe());

	const workArr = [
		'EDITS',
		'WEBSITES',
		'CREATIVE DIRECTION',
		'PHOTOGRAPHY',
		'EDITS',
		'WEBSITES',
		'CREATIVE DIRECTION',
		'PHOTOGRAPHY'
	];

	const aboutArr = [
		'WHO WE ARE',
		'WHAT WE DO',
		'HOW WE WORK',
		'HOW LONG IT TAKES',
		'WHO MADE THIS SITE',
		'WHAT IS OUR FAVORITE COLOR',
		'HOW MUCH DO WE CHARGE',
		'HOW WE CAN WORK TOGETHER'
	];

	const contactArr = [
		'IDEAS',
		'GOALS',
		'DREAMS',
		'IDEAS',
		'GOALS',
		'DREAMS'
	];
</script>

<header
	class="w-full h-16 sticky top-0 grid grid-cols-2 text-black dark:text-white z-10 transition-colors"
>
	<div class="flex flex-row items-center gap-8">
		<a href="/">
			<h1
				class="h-full w-full font-header font-extrabold text-3xl flex justify-start items-center pl-4"
				in:fly={{ y: -12, opacity: 0, duration: 250, delay: 200 }}
			>
				Chase Durrett <span class="text-blue-500">.</span>
			</h1>
		</a>
		<ChipButton
			className="hidden sm:inline-flex"
			tone="primary"
			size="sm"
			on:click={toggleTheme}
			ariaLabel="Toggle theme"
		>
			<span class="h-2 w-2 rounded-full {currentTheme === 'dark' ? 'bg-blue-400' : 'bg-black'}"
			></span>
			{currentTheme === 'dark' ? 'Light' : 'Dark'}
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
	<div class="menu fixed top-0 left-0 w-screen h-screen z-20">
		<!-- Close button and Menu Items (z-index above background parts) -->
		<div class="relative w-full h-full z-30 flex flex-col">
			<div class="flex flex-row justify-between items-center">
				<div
					class="hidden sm:flex flex-row items-end gap-2 font-header px-8"
					in:slide={{
						duration: 300,
						delay: 200,
						easing: cubicInOut,
						axis: 'x'
					}}
					out:slide={{ duration: 300, easing: cubicInOut, axis: 'x' }}
				>
					<ChipButton tone="default" size="sm" href="/" ariaLabel="Toggle theme">
						Spotify
					</ChipButton>
					<ChipButton tone="default" size="sm" href="/" ariaLabel="Toggle theme">
						LinkedIn
					</ChipButton>
					<ChipButton tone="default" size="sm" href="/" ariaLabel="Toggle theme">GitHub</ChipButton>
				</div>
				<div
					class="flex flex-row items-center gap-4 md:gap-6 text-white/75 text-sm font-link uppercase tracking-[0.16em]"
				>
					<button
						class="w-32 h-32"
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
							class="w-32 h-32"
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
				<MenuItem itemsArr={workArr} link="WORK" href="/work" borders={true}></MenuItem>
				<MenuItem itemsArr={aboutArr} link="ABOUT" href="/about" borders={false}></MenuItem>
				<MenuItem itemsArr={contactArr} link="CONTACT" href="/contact" borders={true}></MenuItem>
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
