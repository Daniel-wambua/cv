<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	/** Optional mono index label, e.g. "01" */
	export let index = '';
	export let title = '';
	/** Optional count shown at the right of the rule, e.g. "13 items" */
	export let meta = '';
	let className = '';
	export { className as class };
</script>

<div class="section-heading" use:reveal>
	<div class="heading-row">
		{#if index}<span class="index">{index}</span>{/if}
		<h2 class="heading">{title}</h2>
		{#if meta}<span class="meta">{meta}</span>{/if}
	</div>
	<span class="rule" aria-hidden="true"></span>
	{#if $$slots.default}
		<div class="lede">
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	.section-heading {
		margin: var(--space-2xl) 0 var(--space-lg);
	}

	.heading-row {
		display: flex;
		align-items: baseline;
		gap: var(--space-sm);
	}

	.index {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--accent);
		letter-spacing: var(--tracking-label);
	}

	.heading {
		font-size: clamp(1.375rem, 3vw, 1.75rem);
		font-weight: 700;
		letter-spacing: var(--tracking-tight);
	}

	.meta {
		margin-left: auto;
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-muted);
	}

	.rule {
		display: block;
		margin-top: var(--space-sm);
		height: 1px;
		background: linear-gradient(90deg, var(--border-color-lighter), var(--border-color) 60%, transparent);
	}

	.lede {
		margin-top: var(--space-sm);
		color: var(--text-color-dim);
		max-width: 60ch;
	}
</style>
