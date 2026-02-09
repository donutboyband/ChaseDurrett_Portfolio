<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	export let itemsArr: any[] = [];
	export let link = '';
	export let borders = true;
	export let href = '/';

	const dispatch = createEventDispatcher<{
		close: void;
		navigate: { href: string };
	}>();

	function navigate() {
		dispatch('close');
		dispatch('navigate', { href });
	}
</script>

<button
	type="button"
	class="relative w-full flex-center py-4 sm:py-2 cursor-pointer hover:text-black transition-all duration-200 group min-h-[56px] sm:min-h-0"
	class:border-b={borders}
	class:border-t={borders}
	class:border-white={borders}
	in:fly={{ y: 20, opacity: 0, duration: 300, delay: 200 }}
	out:fly={{ y: 20, opacity: 0, duration: 200 }}
	on:click={navigate}
>
	<div
		class="embla absolute w-0 h-full bg-tertiary inset-0 group-hover:w-full transition-all duration-200 ease-in-out opacity-0 group-hover:opacity-100 flex-center overflow-hidden"
	>
		<div class="embla__container w-full h-full flex">
			{#each itemsArr as item}
				<div class="embla__slide flex-center h-full">
					<p class="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
						{item}
					</p>
					<span>&#8600;</span>
				</div>
			{/each}
		</div>
	</div>
	<div
		class="w-full h-full flex-center transition-all duration-100 text-white group-hover:text-black"
	>
		{link}
	</div>
</button>

<style>
	.embla__slide {
		flex: 1 0 auto;
	}
</style>
