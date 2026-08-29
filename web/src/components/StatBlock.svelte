<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	export let value: string | number = '';
	export let label = '';
	export let revealDelay = 0;
</script>

<div class="stat" use:reveal style={`--reveal-delay: ${revealDelay}ms`}>
	<span class="value">{value}</span>
	<span class="label">{label}</span>
</div>

<style lang="scss">
	.stat {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: var(--space-md) var(--space-lg);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--surface);
	}

	.value {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: 700;
		letter-spacing: var(--tracking-tight);
		color: var(--accent);
		line-height: 1;
	}

	.label {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-color-muted);
	}
</style>
