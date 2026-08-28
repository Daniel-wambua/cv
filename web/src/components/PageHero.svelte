<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	/** Small mono eyebrow above the title, e.g. "02 / Experience" */
	export let eyebrow = '';
	/** Big display title for the page */
	export let title = '';
	/** One-line summary beneath the title */
	export let summary = '';
	/** Optional slot for actions (buttons, links) rendered after the summary */
	let className = '';
	export { className as class };
</script>

<header class="page-hero" use:reveal>
	{#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
	<h1 class="title">{title}</h1>
	{#if summary}<p class="summary">{summary}</p>{/if}
	{#if $$slots.actions}
		<div class="actions">
			<slot name="actions" />
		</div>
	{/if}
</header>

<style lang="scss">
	.page-hero {
		position: relative;
		padding: var(--space-2xl) 0 var(--space-xl);
	}

	.eyebrow {
		margin-bottom: var(--space-sm);
		display: flex;
		align-items: center;
		gap: var(--space-sm);

		&::before {
			content: '';
			width: 2rem;
			height: 1px;
			background: var(--accent);
			flex-shrink: 0;
		}
	}

	.title {
		font-size: clamp(2.25rem, 6vw, 3.75rem);
		font-weight: 700;
		letter-spacing: var(--tracking-display);
		line-height: 1.05;
		max-width: 20ch;
		text-wrap: balance;
	}

	.summary {
		margin-top: var(--space-md);
		max-width: 56ch;
		font-size: var(--font-size-lg);
		color: var(--text-color-dim);
	}

	.actions {
		margin-top: var(--space-lg);
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}
</style>
