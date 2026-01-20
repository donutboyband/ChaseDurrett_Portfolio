<script lang="ts" context="module">
	export type ChipTone = 'default' | 'primary' | 'ghost';
	export type ChipSize = 'sm' | 'md';
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type ChipTone = 'default' | 'primary' | 'ghost';
	type ChipSize = 'sm' | 'md';

	export let label = '';
	export let href: string | null = null;
	export let target: string | undefined = undefined;
	export let rel: string | undefined = undefined;
	export let tone: ChipTone = 'default';
	export let size: ChipSize = 'sm';
	export let active = false;
	export let className = '';
	export let ariaLabel: string | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	const dispatch = createEventDispatcher<{ click: MouseEvent }>();

	const toneClasses: Record<ChipTone, string> = {
		default:
			'border-black/15 dark:border-white/20 bg-white/80 dark:bg-white/10 text-black dark:text-white hover:bg-white',
		primary:
			'border-primary/40 bg-primary text-white hover:bg-black hover:border-black dark:hover:bg-white dark:hover:text-black',
		ghost: 'border-white/25 bg-white/5 text-white hover:bg-white/10'
	};

	const sizeClasses: Record<ChipSize, string> = {
		sm: 'px-3 py-1 text-xs',
		md: 'px-4 py-2 text-sm'
	};

	$: composedClasses = [
		'inline-flex items-center gap-2 rounded-full font-link uppercase tracking-[0.18em] transition-colors backdrop-blur',
		toneClasses[tone],
		sizeClasses[size],
		active ? 'ring-2 ring-offset-2 ring-primary/70 ring-offset-white dark:ring-offset-slate-900' : '',
		className
	]
		.filter(Boolean)
		.join(' ');

	const handleClick = (event: MouseEvent) => {
		dispatch('click', event);
	};
</script>

{#if href}
	<a
		class={composedClasses}
		href={href}
		target={target}
		rel={rel}
		aria-label={ariaLabel || label}
		on:click={handleClick}
	>
		<slot />
		{#if label}{label}{/if}
	</a>
{:else}
	<button
		class={composedClasses}
		aria-label={ariaLabel || label}
		aria-pressed={active}
		type={type}
		on:click={handleClick}
	>
		<slot />
		{#if label}{label}{/if}
	</button>
{/if}
