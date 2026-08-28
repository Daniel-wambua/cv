<script lang="ts">
	import PageHero from '$components/PageHero.svelte';
	import Card from '$components/Card.svelte';
	import { reveal } from '$lib/actions/reveal';

	import EnvelopeIcon from '~icons/fa6-solid/envelope';
	import EyeIcon from '~icons/fa6-solid/eye';
	import FlagIcon from '~icons/fa6-solid/flag';
	import ArrowRightIcon from '~icons/fa6-solid/arrow-right';
	import CompassIcon from '~icons/fa6-solid/compass';
	import HeartIcon from '~icons/fa6-solid/heart';
	import CheckIcon from '~icons/fa6-solid/circle-check';
	import LinkedinIcon from '~icons/fa6-brands/linkedin';
	import GithubIcon from '~icons/fa6-brands/github';

	let emailVisible = false;
	let copied = false;

	const revealEmail = () => {
		emailVisible = true;
		copied = true;
		navigator.clipboard.writeText('wambuahdaniel@gmail.com');
		setTimeout(() => (copied = false), 2000);
	};

	const channels = [
		{
			name: 'LinkedIn',
			description: 'Connect with me professionally',
			url: 'https://www.linkedin.com/in/daniel-wambua-a312b32b8/',
			action: 'View profile',
			icon: LinkedinIcon
		},
		{
			name: 'GitHub',
			description: 'Review my open source work',
			url: 'https://github.com/Daniel-wambua',
			action: 'View repositories',
			icon: GithubIcon
		},
		{
			name: 'CTFtime',
			description: 'Follow my CTF journey',
			url: 'https://ctftime.org/team/409004',
			action: 'View team',
			icon: FlagIcon
		}
	];
</script>

<svelte:head>
	<title>Daniel Wambua | Contact</title>
	<meta
		name="description"
		content="Get in touch with Daniel Wambua for cybersecurity, penetration testing, and ethical hacking opportunities."
	/>
</svelte:head>

<div class="contact">
	<PageHero
		eyebrow="06 / Contact"
		title="Let's talk"
		summary="Open to junior security roles, internships, collaborations, and interesting problems. Email is the fastest way to reach me."
	/>

	<div class="email-panel" use:reveal>
		<span class="panel-icon"><EnvelopeIcon /></span>
		{#if emailVisible}
			<a class="email-link" href="mailto:wambuahdaniel@gmail.com">
				wambuahdaniel@gmail.com
			</a>
			<span class="copied" class:show={copied}>
				<CheckIcon />
				Copied to clipboard
			</span>
		{:else}
			<button class="reveal-btn" on:click={revealEmail} title="Show email address and copy to clipboard">
				<EyeIcon />
				Reveal email address
			</button>
			<span class="panel-hint">Click to reveal and copy</span>
		{/if}
	</div>

	<div class="channels">
		{#each channels as channel, i}
			<Card revealDelay={i * 90} href={channel.url} class="channel-card">
				<span class="channel-icon"><svelte:component this={channel.icon} /></span>
				<h3>{channel.name}</h3>
				<p>{channel.description}</p>
				<span class="channel-link">
					{channel.action}
					<ArrowRightIcon class="arrow" />
				</span>
			</Card>
		{/each}
	</div>

	<div class="elsewhere" use:reveal>
		<p>
			You can also find me on my
			<a href="https://guns.lol/0xhavoc" target="_blank" rel="noopener noreferrer">guns.lol page</a>,
			which lists all my other communication channels.
		</p>
	</div>

	<div class="guide" use:reveal>
		<h3><CompassIcon /> Explore more</h3>
		<p>
			Learn more about me on the <a href="/intro">intro</a> page, or browse my
			<a href="/skills">skills</a>, <a href="/experience">experience</a>, and
			<a href="/achievements">achievements</a> to see whether I align with what you are looking
			for.
		</p>
		<p>
			A shortened version of my CV in PDF format can be downloaded <a href="/download">here</a>.
			To check whether I would be a good fit for your team, view my <a href="/ideal-role">ideal
			role</a> page.
		</p>
	</div>

	<div class="thanks" use:reveal>
		<HeartIcon />
		<p>Thank you for stopping by. I hope to hear from you.</p>
	</div>
</div>

<style lang="scss">
	.contact {
		position: relative;
	}

	/* ============ Email panel ============ */
	.email-panel {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-md);
		padding: var(--space-lg) var(--space-xl);
		margin-bottom: var(--space-xl);
		border: 1px solid var(--border-color-accent);
		border-radius: var(--radius-lg);
		background: var(--accent-transparent);
	}

	.panel-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--radius-md);
		background: var(--accent);
		color: var(--background);
		flex-shrink: 0;

		:global(svg) {
			width: 1.1rem;
			height: 1.1rem;
		}
	}

	.email-link {
		font-family: var(--font-mono);
		font-size: var(--font-size-lg);
		font-weight: 600;
		color: var(--accent);
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	.reveal-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.65rem 1.25rem;
		border: 1px solid var(--accent);
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		cursor: pointer;
		transition: all var(--transition-fast);

		:global(svg) {
			width: 0.9rem;
			height: 0.9rem;
		}

		&:hover {
			background: var(--accent);
			color: var(--background);
		}
	}

	.panel-hint,
	.copied {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-muted);
	}

	.copied {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		color: var(--accent);
		opacity: 0;
		transition: opacity var(--transition-fast);

		&.show {
			opacity: 1;
		}

		:global(svg) {
			width: 0.75rem;
			height: 0.75rem;
		}
	}

	/* ============ Channels ============ */
	.channels {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
		gap: var(--space-md);
		margin-bottom: var(--space-xl);
	}

	:global(.channel-card) {
		text-align: center;
	}

	.channel-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: var(--radius-lg);
		background: var(--accent-transparent);
		color: var(--accent);
		margin-bottom: var(--space-sm);

		:global(svg) {
			width: 1.35rem;
			height: 1.35rem;
		}
	}

	h3 {
		font-size: var(--font-size-lg);
		letter-spacing: var(--tracking-tight);
	}

	.channels p {
		font-size: var(--font-size-sm);
		color: var(--text-color-dim);
		margin-top: 0.25rem;
	}

	.channel-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: var(--space-sm);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--accent);

		:global(.arrow) {
			width: 0.65rem;
			height: 0.65rem;
			transition: transform var(--transition-fast);
		}
	}

	:global(.channel-card:hover .arrow) {
		transform: translateX(3px);
	}

	/* ============ Elsewhere ============ */
	.elsewhere {
		margin-bottom: var(--space-lg);

		p {
			font-size: var(--font-size-sm);
			color: var(--text-color-dim);
		}
	}

	/* ============ Guide ============ */
	.guide {
		padding: var(--space-lg) var(--space-xl);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		background: var(--surface);
		margin-bottom: var(--space-xl);

		h3 {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-size: var(--font-size-lg);
			letter-spacing: var(--tracking-tight);
			margin-bottom: var(--space-sm);

			:global(svg) {
				width: 1rem;
				height: 1rem;
				color: var(--accent);
			}
		}

		p {
			font-size: var(--font-size-sm);
			color: var(--text-color-secondary);
			line-height: var(--line-height-relaxed);
			margin-bottom: var(--space-sm);

			&:last-child {
				margin-bottom: 0;
			}
		}
	}

	/* ============ Thanks ============ */
	.thanks {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-xl);
		border: 1px dashed var(--border-color-light);
		border-radius: var(--radius-lg);
		text-align: center;

		:global(svg) {
			width: 1.5rem;
			height: 1.5rem;
			color: var(--accent);
		}

		p {
			font-size: var(--font-size-base);
			font-weight: 500;
			color: var(--text-color-secondary);
		}
	}
</style>
