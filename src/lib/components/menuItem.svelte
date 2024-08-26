<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import AutoScroll from 'embla-carousel-auto-scroll';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let itemsArr: any[] = [];
	export let link: string = '';
	export let borders: boolean = true;
	let options = { loop: true };
	let plugins = [
		Autoplay(),
		AutoScroll({
			playOnInit: true,
			startDelay: 0,
			speed: 1,
			stopOnInteraction: false
		})
	];
</script>

<li
	class="relative w-full flex-center py-2 cursor-pointer
hover:text-black transition-all duration-200 group {borders
		? 'border-b border-t border-white'
		: ''}"
	in:fly={{ y: 20, opacity: 0, duration: 300, delay: 200 }}
	out:fly={{ y: 20, opacity: 0, duration: 200 }}
>
	<div
		class="embla absolute w-0 h-full bg-tertiary inset-0 group-hover:w-full transition-all duration-200 ease-in-out opacity-0 group-hover:opacity-100 flex-center overflow-hidden"
		use:emblaCarouselSvelte={{ options, plugins }}
	>
		<div class="embla__container w-full h-full flex">
			{#each itemsArr as item}
				<a href={`/${link}`} class="embla__slide flex-center h-full">
					<p class="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
						{item}
					</p>
					<span>&#8600;</span>
				</a>
			{/each}
		</div>
	</div>
	<a
		class="w-full h-full flex-center transition-all duration-100 text-white group-hover:text-black"
		href="/contact">{link}</a
	>
</li>

<style>
	.embla__slide {
		flex: 1 0 auto;
	}
</style>
