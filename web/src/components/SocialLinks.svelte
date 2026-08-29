<script lang="ts">
	import GithubIcon from '~icons/fa6-brands/github';
	import XTwitterIcon from '~icons/fa6-brands/x-twitter';
	import LinkedinIcon from '~icons/fa6-brands/linkedin';
	import LinktreeIcon from '~icons/fa6-solid/seedling';
	import FlagIcon from '~icons/fa6-solid/flag';

	export let socials: {
		name: string;
		url: string;
		handle: string;
		icon: string;
	}[] = [];

	const iconFor = (icon: string) => {
		switch (icon) {
			case 'github':
				return GithubIcon;
			case 'twitter':
				return XTwitterIcon;
			case 'linkedin':
				return LinkedinIcon;
			case 'linktree':
				return LinktreeIcon;
			case 'ctftime':
				return FlagIcon;
			default:
				return GithubIcon;
		}
	};
</script>

<ul class="social-links">
	{#each socials as social (social.name)}
		<li>
			<a
				href={social.url}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`${social.name}: ${social.handle}`}
				title={`${social.name} - ${social.handle}`}
			>
				<svelte:component this={iconFor(social.icon)} />
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	.social-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		list-style: none;
	}

	a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		color: var(--text-color-dim);
		background: transparent;
		transition:
			color var(--transition-base),
			border-color var(--transition-base),
			background var(--transition-base),
			transform var(--transition-base);

		&:hover {
			color: var(--accent);
			border-color: var(--border-color-accent);
			background: var(--accent-transparent);
			transform: translateY(-2px);
		}

		&:focus-visible {
			outline: 2px solid var(--accent);
			outline-offset: 2px;
		}

		:global(svg) {
			width: 1.1rem;
			height: 1.1rem;
		}
	}
</style>
