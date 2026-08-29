<script lang="ts">
	export let title = '';
	let className = '';
	export { className as class };
</script>

<span class="tag {className}" {title}>
	<slot />
</span>

<style lang="scss">
	.tag {
		display: inline-flex;
		align-items: center;
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-secondary);
		padding: 0.2rem 0.6rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--accent-transparent);
		white-space: nowrap;
		transition: color var(--transition-fast), border-color var(--transition-fast);
	}

	.tag:hover {
		color: var(--accent);
		border-color: var(--border-color-accent);
	}
</style>
