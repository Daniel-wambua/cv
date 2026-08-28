<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	export let href: string | undefined = undefined;
	export let external = false;
	export let revealDelay = 0;
	let className = '';
	export { className as class };

	const style = `--reveal-delay: ${revealDelay}ms`;
</script>

{#if href}
	<a
		class="card {className}"
		{href}
		{...external ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
		use:reveal
		{style}
	>
		<slot />
	</a>
{:else}
	<div class="card {className}" use:reveal {style}>
		<slot />
	</div>
{/if}

<style lang="scss">
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-lg);
		background: var(--card-background);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		transition:
			background var(--transition-base),
			border-color var(--transition-base),
			transform var(--transition-base),
			box-shadow var(--transition-base);
	}

	a.card {
		text-decoration: none;
		color: inherit;

		&:hover {
			background: var(--card-background-hover);
			border-color: var(--border-color-accent);
			transform: translateY(-3px);
			box-shadow: var(--shadow-colored);
		}
	}
</style>
