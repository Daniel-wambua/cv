<script lang="ts">
	import PageHero from '$components/PageHero.svelte';
	import Card from '$components/Card.svelte';
	import { reveal } from '$lib/actions/reveal';

	import ShieldIcon from '~icons/fa6-solid/shield-halved';
	import CodeIcon from '~icons/fa6-solid/code';
	import GradCapIcon from '~icons/fa6-solid/graduation-cap';
	import BriefcaseIcon from '~icons/fa6-solid/briefcase';
	import TrophyIcon from '~icons/fa6-solid/trophy';
	import PaperPlaneIcon from '~icons/fa6-solid/paper-plane';
	import ArrowRightIcon from '~icons/fa6-solid/arrow-right';

	const sections = [
		{
			title: 'Security professional',
			icon: ShieldIcon,
			content:
				'IT student specializing in penetration testing, ethical hacking, and secure system design. Active in CTF competitions and bug bounty programs.'
		},
		{
			title: 'Full-stack developer',
			icon: CodeIcon,
			content:
				'Building secure applications with modern technologies. Experienced across frontend and backend development with a security-first approach.'
		},
		{
			title: 'Continuous learner',
			icon: GradCapIcon,
			content:
				'Constantly expanding knowledge through hands-on projects, security research, and participation in the cybersecurity community.'
		}
	];

	const navLinks = [
		{ name: 'Experience', url: '/experience', icon: BriefcaseIcon },
		{ name: 'Achievements', url: '/achievements', icon: TrophyIcon },
		{ name: 'Skills', url: '/skills', icon: CodeIcon },
		{ name: 'Contact', url: '/contact', icon: PaperPlaneIcon }
	];
</script>

<svelte:head>
	<title>Daniel Wambua | Intro</title>
	<meta
		name="description"
		content="IT student at Karatina University with hands-on experience in ethical hacking, penetration
		testing, and secure application development."
	/>
</svelte:head>

<div class="intro">
	<PageHero
		eyebrow="01 / Intro"
		title="Security mindset, developer hands"
		summary="Information Technology student at Karatina University with hands-on experience in ethical hacking, penetration testing, and secure application development. Actively seeking opportunities to apply this expertise to real-world problems."
	/>

	<div class="grid">
		{#each sections as section, i}
			<Card revealDelay={i * 100}>
				<span class="section-icon"><svelte:component this={section.icon} /></span>
				<h3>{section.title}</h3>
				<p>{section.content}</p>
			</Card>
		{/each}
	</div>

	<section class="explore">
		<h2 use:reveal>Keep exploring</h2>
		<div class="explore-grid">
			{#each navLinks as { name, url, icon }, i}
				<a href={url} class="explore-card" use:reveal style={`--reveal-delay: ${i * 80}ms`}>
					<svelte:component this={icon} />
					<span>{name}</span>
					<ArrowRightIcon class="arrow" />
				</a>
			{/each}
		</div>
	</section>
</div>

<style lang="scss">
	.intro {
		position: relative;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: var(--space-md);
		margin-top: var(--space-xl);
	}

	.section-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--radius-md);
		background: var(--accent-transparent);
		color: var(--accent);

		:global(svg) {
			width: 1.1rem;
			height: 1.1rem;
		}
	}

	h3 {
		font-size: var(--font-size-lg);
		letter-spacing: var(--tracking-tight);
	}

	p {
		font-size: var(--font-size-sm);
		color: var(--text-color-dim);
	}

	.explore {
		margin-top: var(--space-2xl);
	}

	.explore h2 {
		font-size: var(--font-size-xl);
		letter-spacing: var(--tracking-tight);
		margin-bottom: var(--space-md);
	}

	.explore-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		gap: var(--space-sm);
	}

	.explore-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: var(--space-md);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--surface);
		color: var(--text-color-secondary);
		text-decoration: none;
		font-size: var(--font-size-sm);
		font-weight: 500;
		transition: all var(--transition-base);

		:global(svg) {
			width: 1rem;
			height: 1rem;
			color: var(--accent);
			flex-shrink: 0;
		}

		:global(.arrow) {
			margin-left: auto;
			width: 0.75rem;
			height: 0.75rem;
			opacity: 0.5;
			transition: transform var(--transition-fast), opacity var(--transition-fast);
		}

		&:hover {
			border-color: var(--border-color-accent);
			background: var(--surface-elevated);
			color: var(--text-color);
			transform: translateY(-2px);

			:global(.arrow) {
				transform: translateX(3px);
				opacity: 1;
			}
		}
	}
</style>
