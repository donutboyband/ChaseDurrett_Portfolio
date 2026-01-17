<script lang="ts">
	import { slide, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import MenuItem from './menuItem.svelte';
	import { theme, type Theme } from '$lib/stores/theme';
	import { onDestroy } from 'svelte';
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
		'YOUR BUSINESS',
		'IDEAS',
		'GOALS',
		'DREAMS',
		'DEADLINES',
		'YOUR AUDIENCE',
		'YOUR BUSINESS',
		'IDEAS',
		'GOALS',
		'DREAMS',
		'DEADLINES',
		'YOUR AUDIENCE'
	];
</script>

<header class="w-full h-16 sticky top-0 grid grid-cols-2 bg-white dark:bg-slate-950 text-black dark:text-white z-10 transition-colors">
	<a href="/">
		<h1
			class="h-full w-full font-header font-extrabold text-3xl flex justify-start items-center pl-4"
			in:fly={{ y: -12, opacity: 0, duration: 250, delay: 100 }}
		>
			Chase Durrett <span class="text-blue-500">.</span>
		</h1>
	</a>
	<div class="flex justify-end items-center gap-3 pr-2">
		<button
			class="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-black/15 dark:border-white/20 bg-white/80 dark:bg-white/10 text-xs font-link uppercase tracking-[0.18em] transition-colors"
			on:click={toggleTheme}
			aria-label="Toggle theme"
		>
			<span class="h-2 w-2 rounded-full {currentTheme === 'dark' ? 'bg-blue-400' : 'bg-black'}"></span>
			{currentTheme === 'dark' ? 'Dark' : 'Light'}
		</button>
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
					duration: 100,
					easing: cubicInOut,
					axis: 'x'
				}}
				out:slide={{ duration: 100, easing: cubicInOut, axis: 'x' }}
			>
				<div
					class="absolute h-0 w-full bg-black dark:bg-white inset-0 group-hover:h-full z-0 transition-all ease-in-out duration-200"
				></div>
				<span class="w-3/4 h-[2px] bg-black dark:bg-white mx-2 group-hover:bg-white dark:group-hover:bg-black z-10"></span>
				<span class="w-4/6 h-[2px] bg-black dark:bg-white mx-2 group-hover:bg-white dark:group-hover:bg-black z-10"></span>
				<span class="w-3/6 h-[2px] bg-black dark:bg-white mx-2 group-hover:bg-white dark:group-hover:bg-black z-10"></span>
			</button>
		{/if}
	</div>
</header>

<!-- Background Parts (conditionally rendered) -->
{#if isOpen}
	<div
		class="menu-bg-part fixed top-0 left-0 w-1/2 h-full bg-black dark:bg-slate-900 z-10"
		in:slide={{ duration: 300, easing: cubicInOut, axis: 'y' }}
		out:slide={{ duration: 200, delay: 200, easing: cubicInOut, axis: 'y' }}
	></div>
	<div
		class="menu-bg-part fixed top-0 right-0 w-1/2 h-full bg-black dark:bg-slate-900 z-10"
		in:slide={{ duration: 300, delay: 100, easing: cubicInOut, axis: 'y' }}
		out:slide={{ duration: 200, delay: 300, easing: cubicInOut, axis: 'y' }}
	></div>
{/if}

<!-- Transparent Menu Container (conditionally rendered) -->
{#if isOpen}
	<div class="menu fixed top-0 left-0 w-screen h-screen z-20">
		<!-- Close button and Menu Items (z-index above background parts) -->
		<div class="relative w-full h-full z-30 flex flex-col">
			<div class="grid grid-cols-2 pb-16">
				<div class="flex justify-start items-center px-4">
					<span in:fly={{ delay: 300 }} class="text-blue-500 transition-opacity duration-150 text-9xl font-header">.</span>
				</div>
				<div class="flex justify-end items-center px-4">
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
