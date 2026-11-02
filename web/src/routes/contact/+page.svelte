<script lang="ts">
	import { onDestroy } from 'svelte';
	import PageHero from '$components/PageHero.svelte';

	import ArrowUpRightIcon from '~icons/fa6-solid/arrow-up-right-from-square';
	import CheckIcon from '~icons/fa6-solid/check';
	import CopyIcon from '~icons/fa6-solid/copy';
	import EyeIcon from '~icons/fa6-solid/eye';
	import EyeSlashIcon from '~icons/fa6-solid/eye-slash';
	import GithubIcon from '~icons/fa6-brands/github';
	import LinkedinIcon from '~icons/fa6-brands/linkedin';
	import FlagIcon from '~icons/fa6-solid/flag';
	import LinkIcon from '~icons/fa6-solid/link';

	export let data: { email: string };

	let emailRevealed = false;
	let copied = false;
	let feedback = '';
	let feedbackTimeout: ReturnType<typeof setTimeout>;

	function maskEmail(email: string) {
		const [localPart, domain] = email.split('@');
		if (!localPart || !domain) return '••••••••';
		return `${localPart[0]}${'•'.repeat(Math.max(4, localPart.length - 1))}@${domain}`;
	}

	$: maskedEmail = maskEmail(data.email);

	const channels = [
		{
			name: 'GitHub',
			description: 'Projects, tools, and experiments',
			url: 'https://github.com/Daniel-wambua?tab=repositories',
			icon: GithubIcon
		},
		{
			name: 'LinkedIn',
			description: 'Professional updates and connections',
			url: 'https://www.linkedin.com/in/daniel-wambua-a312b32b8/',
			icon: LinkedinIcon
		},
		{
			name: 'CTFtime',
			description: 'Competition history and team activity',
			url: 'https://ctftime.org/team/409004',
			icon: FlagIcon
		},
		{
			name: 'guns.lol',
			description: '0xhavoc · all my links',
			url: 'https://guns.lol/0xhavoc',
			icon: LinkIcon
		}
	];

	function toggleEmail() {
		emailRevealed = !emailRevealed;
		copied = false;
		feedback = '';
		clearTimeout(feedbackTimeout);
	}

	async function copyEmail() {
		try {
			if (!navigator.clipboard?.writeText) throw new Error('Clipboard access is unavailable');
			await navigator.clipboard.writeText(data.email);
			copied = true;
			feedback = 'Copied to clipboard';
		} catch {
			copied = false;
			feedback = 'Select the address to copy it';
		}

		clearTimeout(feedbackTimeout);
		feedbackTimeout = setTimeout(() => {
			copied = false;
			feedback = '';
		}, 2400);
	}

	onDestroy(() => clearTimeout(feedbackTimeout));
</script>

<svelte:head>
	<title>Contact | Daniel Wambua</title>
	<meta
		name="description"
		content="Contact Daniel Wambua for cybersecurity roles, internships, collaborations, and technical conversations."
	/>
</svelte:head>

<div class="contact-page">
	<PageHero
		title="Contact Daniel"
		summary="Open to security roles, internships, and collaborations. Email is the best way to reach me."
	/>

	<section class="contact-card" aria-labelledby="email-title">
		<div class="contact-card-copy">
			<p class="eyebrow">The quickest route</p>
			<h2 id="email-title">Send me a note.</h2>
			<p>For opportunities, project ideas, or a good technical question.</p>
		</div>
		<div class="email-actions">
			{#if !emailRevealed}<span class="email-mask" aria-hidden="true">{maskedEmail}</span>{/if}
			<button
				class="reveal-button"
				type="button"
				on:click={toggleEmail}
				aria-expanded={emailRevealed}
				aria-controls="revealed-email"
			>
				{#if emailRevealed}<EyeSlashIcon />{:else}<EyeIcon />{/if}
				{emailRevealed ? 'Hide email' : 'Reveal email'}
			</button>
			{#if emailRevealed}
				<div class="revealed-email" id="revealed-email">
					<a class="email-link" href={`mailto:${data.email}`}>{data.email}</a>
					<button class="copy-button" type="button" on:click={copyEmail}>
						{#if copied}<CheckIcon />{:else}<CopyIcon />{/if}
						{copied ? 'Copied' : 'Copy address'}
					</button>
				</div>
			{/if}
			<span class="feedback" aria-live="polite">{feedback}</span>
		</div>
	</section>

	<section class="channels" aria-labelledby="channels-title">
		<div class="section-heading">
			<div>
				<p class="eyebrow">Elsewhere</p>
				<h2 id="channels-title">Find me online.</h2>
			</div>
		</div>
		<div class="channel-grid">
			{#each channels as channel (channel.url)}
				<a class="channel-card" href={channel.url} target="_blank" rel="noopener noreferrer">
					<span class="channel-icon" aria-hidden="true"
						><svelte:component this={channel.icon} /></span
					>
					<span class="channel-copy">
						<strong>{channel.name}</strong>
						<span>{channel.description}</span>
					</span>
					<ArrowUpRightIcon class="channel-arrow" />
				</a>
			{/each}
		</div>
	</section>

	<div class="contact-note">
		<span class="availability-dot" aria-hidden="true"></span>
		<p>
			Based in Nairobi, Kenya. You can also explore my <a href="/experience">experience</a>,
			<a href="/achievements">achievements</a>, or <a href="/download">download my resume</a>.
		</p>
	</div>
</div>

<style lang="scss">
	.contact-page {
		padding-top: clamp(2.5rem, 7vw, 5rem);
	}

	:global(.contact-page .page-hero) {
		padding-top: 0;
	}

	.contact-card {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(18rem, 1.1fr);
		align-items: center;
		gap: 2rem;
		padding: clamp(1.4rem, 4vw, 2.5rem);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		background: linear-gradient(120deg, var(--accent-transparent), transparent 58%), var(--surface);
		box-shadow: var(--shadow-sm);

		.eyebrow {
			margin-bottom: 0.8rem;
		}

		h2 {
			font-size: clamp(1.6rem, 3.5vw, 2.35rem);
			letter-spacing: var(--tracking-tight);
		}

		.contact-card-copy > p:last-child {
			margin-top: 0.65rem;
			color: var(--text-color-dim);
			font-size: var(--font-size-sm);
		}
	}

	.email-actions {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.email-mask {
		color: var(--text-color-dim);
		font-family: var(--font-mono);
		font-size: clamp(1rem, 2.2vw, 1.2rem);
		letter-spacing: -0.035em;
	}

	.reveal-button {
		display: inline-flex;
		min-height: 2.5rem;
		align-items: center;
		gap: 0.45rem;
		padding: 0.55rem 0.85rem;
		border: 1px solid var(--border-color-light);
		border-radius: var(--radius-full);
		background: var(--background-elevated);
		color: var(--text-color-secondary);
		font-size: var(--font-size-xs);
		font-weight: 600;
		white-space: nowrap;
		transition:
			background var(--transition-fast),
			border-color var(--transition-fast),
			color var(--transition-fast);

		:global(svg) {
			width: 0.8rem;
			height: 0.8rem;
		}

		&:hover {
			border-color: var(--border-color-accent);
			background: var(--accent-transparent);
			color: var(--text-color);
		}

		&:focus-visible {
			outline: 2px solid var(--accent);
			outline-offset: 3px;
		}
	}

	.revealed-email {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
		animation: reveal-email 320ms cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes reveal-email {
		from {
			clip-path: inset(0 100% 0 0);
			filter: blur(3px);
		}

		to {
			clip-path: inset(0);
			filter: blur(0);
		}
	}

	.email-link {
		max-width: 100%;
		overflow-wrap: anywhere;
		color: var(--text-color);
		font-family: var(--font-mono);
		font-size: clamp(1rem, 2.2vw, 1.2rem);
		font-weight: 500;
		letter-spacing: -0.035em;
	}

	.copy-button {
		display: inline-flex;
		min-height: 2.5rem;
		align-items: center;
		gap: 0.45rem;
		padding: 0.55rem 0.85rem;
		border: 1px solid var(--border-color-light);
		border-radius: var(--radius-full);
		background: var(--background-elevated);
		color: var(--text-color-secondary);
		font-size: var(--font-size-xs);
		font-weight: 600;
		white-space: nowrap;
		transition:
			background var(--transition-fast),
			border-color var(--transition-fast),
			color var(--transition-fast);

		:global(svg) {
			width: 0.8rem;
			height: 0.8rem;
		}

		&:hover {
			border-color: var(--border-color-accent);
			background: var(--accent-transparent);
			color: var(--text-color);
		}
	}

	.feedback {
		min-height: 1em;
		color: var(--text-color-dim);
		font-size: var(--font-size-xs);
	}

	@media (prefers-reduced-motion: reduce) {
		.revealed-email {
			animation: none;
		}
	}

	.channels {
		padding: clamp(3rem, 7vw, 5rem) 0 2.5rem;
	}

	.section-heading {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.2rem;

		.eyebrow {
			margin-bottom: 0.55rem;
		}

		h2 {
			font-size: clamp(1.6rem, 3vw, 2rem);
		}
	}

	.channel-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		border-top: 1px solid var(--border-color);
		border-bottom: 1px solid var(--border-color);
	}

	.channel-card {
		display: flex;
		min-height: 6rem;
		align-items: center;
		gap: 0.85rem;
		padding: 1rem 1.2rem;
		transition: background var(--transition-fast);

		& + & {
			border-left: 1px solid var(--border-color);
		}

		&:hover {
			background: var(--surface);
		}
	}

	.channel-icon {
		display: inline-grid;
		width: 2.5rem;
		height: 2.5rem;
		flex: 0 0 auto;
		place-items: center;
		border: 1px solid var(--border-color);
		border-radius: 50%;
		color: var(--accent);

		:global(svg) {
			width: 1rem;
			height: 1rem;
		}
	}

	.channel-copy {
		display: flex;
		min-width: 0;
		flex: 1;
		flex-direction: column;
		gap: 0.22rem;

		strong {
			color: var(--text-color);
			font-size: var(--font-size-sm);
		}

		> span {
			color: var(--text-color-dim);
			font-size: var(--font-size-xs);
			line-height: 1.45;
		}
	}

	:global(.channel-arrow) {
		width: 0.75rem;
		height: 0.75rem;
		flex: 0 0 auto;
		color: var(--text-color-dim);
	}

	.contact-note {
		display: flex;
		align-items: flex-start;
		gap: 0.7rem;
		padding: 1rem 0;
		border-top: 1px solid var(--border-color);
		color: var(--text-color-dim);
		font-size: var(--font-size-sm);

		a {
			color: var(--text-color);
			text-decoration: underline;
			text-decoration-color: var(--border-color-light);
			text-underline-offset: 0.18em;
		}
	}

	.availability-dot {
		width: 0.5rem;
		height: 0.5rem;
		flex: 0 0 auto;
		margin-top: 0.45rem;
		border-radius: 50%;
		background: var(--secondary);
		box-shadow: 0 0 0 0.25rem var(--accent-transparent);
	}

	@media (max-width: 760px) {
		.contact-card {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}

		.channel-grid {
			grid-template-columns: 1fr;
		}

		.channel-card + .channel-card {
			border-top: 1px solid var(--border-color);
			border-left: 0;
		}
	}

	@media (max-width: 460px) {
		.section-heading {
			align-items: flex-start;
			flex-direction: column;
		}

		.email-actions {
			align-items: flex-start;
			flex-direction: column;
		}
	}
</style>
