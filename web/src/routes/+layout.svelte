<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import SocialLinks from '$components/SocialLinks.svelte';

	import TerminalIcon from '~icons/fa6-solid/terminal';
	import ShieldIcon from '~icons/fa6-solid/shield-halved';
	import TrophyIcon from '~icons/fa6-solid/trophy';
	import CodeIcon from '~icons/fa6-solid/code';
	import CertificateIcon from '~icons/fa6-solid/certificate';
	import EnvelopeIcon from '~icons/fa6-solid/envelope';
	import HouseIcon from '~icons/fa6-solid/house';
	import FileDownIcon from '~icons/fa6-solid/file-arrow-down';
	import PaperPlaneIcon from '~icons/fa6-solid/paper-plane';
	import BriefcaseIcon from '~icons/fa6-solid/briefcase';
	import ArrowRightIcon from '~icons/fa6-solid/arrow-right';
	import BarsIcon from '~icons/fa6-solid/bars';
	import XMarkIcon from '~icons/fa6-solid/xmark';

	import '@fontsource/space-grotesk/400.css';
	import '@fontsource/space-grotesk/500.css';
	import '@fontsource/space-grotesk/600.css';
	import '@fontsource/space-grotesk/700.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/fira-mono/400.css';
	import '@fontsource/fira-mono/500.css';

	import '../app.css';
	import '../styles/variables.scss';

	// Initialize Vercel Speed Insights
	injectSpeedInsights();

	interface Document {
		startViewTransition?: (callback: () => Promise<void>) => void;
	}

	onNavigate((navigation) => {
		const doc = document as Document;
		if (!doc.startViewTransition) return;
		return new Promise<void>((resolve) => {
			doc.startViewTransition && doc.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// Display banner if looking for job, within the specified dates
	const lookingForJobDates = {
		start: new Date('2025-07-01'),
		end: new Date('2026-12-30'),
	};
	const currentDate = new Date();
	const startDateFormatted = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long'
	}).format(lookingForJobDates.start);
	const isSeekingOpportunities = currentDate <= lookingForJobDates.end;
	const pagesToShowBanner = ['/', '/achievements', '/skills', '/experience', '/certificates'];

	// Footer copyright rolls forward automatically
	const startYear = 2025;
	const currentYear = currentDate.getFullYear();

	$: path = $page.url.pathname;

	// Mobile drawer state
	let drawerOpen = false;
	$: if (drawerOpen && path) drawerOpen = false;

	const socials = [
		{ name: 'GitHub', url: 'https://github.com/Daniel-wambua', handle: 'Daniel-wambua', icon: 'github' },
		{ name: 'Twitter', url: 'https://twitter.com/wambuahdaniel', handle: 'wambuahdaniel', icon: 'twitter' },
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/daniel-wambua-a312b32b8',
			handle: 'daniel-wambua',
			icon: 'linkedin'
		},
		{ name: 'CTFtime', url: 'https://ctftime.org/team/409004', handle: 'team 409004', icon: 'ctftime' },
		{ name: 'Linktree', url: 'https://guns.lol/0xhavoc', handle: '0xhavoc', icon: 'linktree' }
	];

	const navLinks = [
		{ name: 'Intro', url: '/intro', icon: TerminalIcon },
		{ name: 'Experience', url: '/experience', icon: ShieldIcon },
		{ name: 'Achievements', url: '/achievements', icon: TrophyIcon },
		{ name: 'Skills', url: '/skills', icon: CodeIcon },
		{ name: 'Certificates', url: '/certificates', icon: CertificateIcon },
		{ name: 'Contact', url: '/contact', icon: EnvelopeIcon }
	];

	const headerLinks = [
		{ name: 'Blog', url: 'https://havocsec.dev/blog' },
		{ name: 'CTF Writeups', url: 'https://havocsec.dev/ctf/' },
		{ name: 'Research', url: 'https://havocsec.dev/pentesting' }
	];
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && (drawerOpen = false)} />

<div class="app-backdrop" aria-hidden="true"></div>

<div class="app">
	<a class="skip-link visually-hidden" href="#main">Skip to content</a>

	<!-- Mobile top bar -->
	<div class="mobile-bar">
		<a class="mobile-name" href="/">Daniel Wambua</a>
		<div class="mobile-actions">
			<a class="icon-button" href="/download" aria-label="Download CV" title="Download CV">
				<FileDownIcon />
			</a>
			<button
				class="icon-button"
				on:click={() => (drawerOpen = !drawerOpen)}
				aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={drawerOpen}
			>
				{#if drawerOpen}<XMarkIcon />{:else}<BarsIcon />{/if}
			</button>
		</div>
	</div>

	<!-- Sidebar / mobile drawer -->
	<aside class:open={drawerOpen} aria-label="Site navigation">
		<div class="aside-inner">
			<a href="/" class="identity">
				<p class="eyebrow">havocsec</p>
				<h1 class="name">Daniel Wambua</h1>
				<p class="role">Security Analyst, Pentester and Developer</p>
			</a>

			<div class="status">
				<span class="status-dot" aria-hidden="true"></span>
				<span class="status-text">Available for security consulting</span>
			</div>

			<SocialLinks {socials} />

			<nav class="nav">
				<ul>
					{#each navLinks as { name, url, icon }}
						<li class:is-active={path === url}>
							<a href={url} aria-current={path === url ? 'page' : undefined}>
								<svelte:component this={icon} />
								{name}
							</a>
						</li>
					{/each}
					{#if path !== '/'}
						<li>
							<a href="/"><HouseIcon />Home</a>
						</li>
					{/if}
				</ul>
			</nav>

			<a href="/download" class="download">
				<FileDownIcon />
				Download CV
			</a>
			<a class="source-link" href="https://github.com/Daniel-wambua/cv" target="_blank" rel="noopener noreferrer">
				View the source on GitHub
			</a>
		</div>

		<div class="aside-bottom">
			<a class="contact-link" href="/contact">
				<PaperPlaneIcon />
				Send me a message
			</a>
			<small class="license">
				<a href="https://github.com/Daniel-wambua/cv" target="_blank" rel="noopener noreferrer">Daniel-wambua/cv</a>
				is licensed under
				<a href="https://github.com/Daniel-wambua/cv/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT</a>,
				&copy; <a href="https://cv.havocsec.me">Daniel Wambua</a>
				{startYear === currentYear ? startYear : `${startYear} to ${currentYear}`}
			</small>
		</div>
	</aside>

	{#if drawerOpen}
		<button class="drawer-backdrop" on:click={() => (drawerOpen = false)} aria-label="Close menu"></button>
	{/if}

	<div class="content-wrapper">
		<header>
			<div class="header-links">
				{#each headerLinks as { name, url }}
					<a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
				{/each}
			</div>
			<a href="/download" class="header-download">
				<FileDownIcon />
				CV
			</a>
		</header>

		<main id="main">
			{#if pagesToShowBanner.includes(path) && isSeekingOpportunities}
				<div class="banner-wrap">
					<div class="banner">
					<span class="banner-icon" aria-hidden="true"><BriefcaseIcon /></span>
					<p class="banner-text">
						<strong>Open to new opportunities since {startDateFormatted}.</strong>
						Read my <a href="/intro">full bio</a> to learn more, and if I could be a good
						fit for your team, <a href="/contact">get in touch</a>.
					</p>
					<a href="/ideal-role" class="banner-action">
						View ideal role
						<ArrowRightIcon />
					</a>
				</div>
				</div>
			{/if}

			<div class="page"><slot /></div>
		</main>
	</div>
</div>

<style lang="scss">
	.app {
		display: flex;
		height: 100vh;
		/* No background here: the fixed .app-backdrop layer (glows + grid) must
		   show through the glass panels, and body already paints the ink base. */
		color: var(--text-color);
		overflow: hidden;

		@media (max-width: 900px) {
			flex-direction: column;
			height: auto;
			min-height: 100vh;
			overflow: visible;
		}
	}

	.skip-link:focus {
		position: fixed;
		top: 0.5rem;
		left: 0.5rem;
		width: auto;
		height: auto;
		margin: 0;
		padding: 0.5rem 1rem;
		clip: auto;
		white-space: normal;
		z-index: 200;
		background: var(--surface-elevated);
		border: 1px solid var(--accent);
		border-radius: var(--radius-sm);
	}

	/* ============ Sidebar ============ */
	aside {
		width: var(--sidebar-width);
		background: var(--glass);
		backdrop-filter: blur(24px) saturate(150%);
		-webkit-backdrop-filter: blur(24px) saturate(150%);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-lg), inset 0 1px 0 var(--glass-highlight);
		display: flex;
		flex-direction: column;
		position: fixed;
		top: var(--space-md);
		bottom: var(--space-md);
		left: var(--space-md);
		z-index: 100;
		overflow-y: auto;
		overflow-x: hidden;

		@media (max-width: 900px) {
			top: 0;
			bottom: 0;
			left: 0;
			width: min(20rem, 85vw);
			border-radius: 0 var(--radius-xl) var(--radius-xl) 0;
			transform: translateX(-100%);
			transition: transform var(--transition-medium);
			box-shadow: none;

			&.open {
				transform: translateX(0);
				box-shadow: var(--shadow-2xl);
			}
		}

		&::-webkit-scrollbar {
			width: 6px;
		}

		&::-webkit-scrollbar-thumb {
			background: var(--border-color);
			border-radius: var(--radius-full);
		}
	}

	.aside-inner {
		flex: 1;
		padding: var(--space-xl) var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.identity {
		text-decoration: none;
		color: inherit;

		.eyebrow {
			margin-bottom: 0.375rem;
		}

		.name {
			font-size: 1.625rem;
			font-weight: 700;
			letter-spacing: var(--tracking-tight);
			line-height: 1.1;
		}

		.role {
			margin-top: 0.375rem;
			font-size: var(--font-size-sm);
			color: var(--text-color-dim);
			line-height: var(--line-height-normal);
		}
	}

	.status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--accent-transparent);
	}

	.status-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 8px var(--accent);
		flex-shrink: 0;
		animation: pulse 2.4s ease-in-out infinite;
	}

	.status-text {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-secondary);
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.45; }
	}

	.nav ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin: 0;
		padding: 0;
	}

	.nav a {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius-md);
		color: var(--text-color-dim);
		font-size: var(--font-size-sm);
		font-weight: 500;
		text-decoration: none;
		border-left: 2px solid transparent;
		transition:
			color var(--transition-fast),
			background var(--transition-fast),
			border-color var(--transition-fast);

		:global(svg) {
			width: 0.95rem;
			height: 0.95rem;
			flex-shrink: 0;
			opacity: 0.7;
		}

		&:hover {
			color: var(--text-color);
			background: var(--accent-transparent);
			border-left-color: var(--border-color-accent);
		}
	}

	.nav li.is-active a {
		color: var(--accent);
		background: var(--accent-transparent);
		border-left-color: var(--accent);

		:global(svg) {
			opacity: 1;
		}
	}

	.download {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.7rem 1rem;
		border-radius: var(--radius-md);
		background: var(--accent);
		color: var(--background);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		font-weight: 600;
		text-decoration: none;
		letter-spacing: 0.02em;
		transition:
			background var(--transition-base),
			transform var(--transition-base),
			box-shadow var(--transition-base);

		:global(svg) {
			width: 1rem;
			height: 1rem;
		}

		&:hover {
			background: var(--accent-dim);
			color: var(--background);
			transform: translateY(-1px);
			box-shadow: var(--shadow-colored);
		}
	}

	.source-link {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-muted);
		text-decoration: none;
		text-align: center;

		&:hover {
			color: var(--accent);
		}
	}

	.aside-bottom {
		padding: var(--space-md) var(--space-lg) var(--space-lg);
		border-top: 1px solid var(--border-color);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.contact-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: var(--font-size-sm);
		font-weight: 500;
		color: var(--text-color-secondary);
		text-decoration: none;

		:global(svg) {
			width: 0.9rem;
			height: 0.9rem;
		}

		&:hover {
			color: var(--accent);
		}
	}

	.license {
		font-size: var(--font-size-xs);
		color: var(--text-color-muted);
		line-height: var(--line-height-normal);

		a {
			color: var(--text-color-dim);
		}
	}

	/* ============ Mobile bar ============ */
	.mobile-bar {
		display: none;
		position: sticky;
		top: 0;
		z-index: 90;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		background: var(--glass-strong);
		backdrop-filter: blur(20px) saturate(150%);
		-webkit-backdrop-filter: blur(20px) saturate(150%);
		border-bottom: 1px solid var(--glass-border);

		@media (max-width: 900px) {
			display: flex;
		}
	}

	.mobile-name {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: var(--font-size-base);
		color: var(--text-color);
		text-decoration: none;
		letter-spacing: var(--tracking-tight);
	}

	.mobile-actions {
		display: flex;
		gap: 0.5rem;
	}

	.icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		color: var(--text-color-secondary);
		background: transparent;
		text-decoration: none;

		:global(svg) {
			width: 1.1rem;
			height: 1.1rem;
		}

		&:hover {
			color: var(--accent);
			border-color: var(--border-color-accent);
		}
	}

	.drawer-backdrop {
		display: none;
		position: fixed;
		inset: 0;
		z-index: 99;
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(2px);
		border: none;
		cursor: pointer;

		@media (max-width: 900px) {
			display: block;
		}
	}

	/* ============ Content ============ */
	.content-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 0;
		height: 100vh;
		overflow: hidden;
		margin-left: var(--content-offset);

		@media (max-width: 900px) {
			height: auto;
			overflow: visible;
			margin-left: 0;
		}
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-lg);
		margin: var(--space-md) var(--space-lg) 0;
		padding: var(--space-sm) var(--space-lg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		background: var(--glass);
		backdrop-filter: blur(20px) saturate(150%);
		-webkit-backdrop-filter: blur(20px) saturate(150%);
		box-shadow: var(--shadow-md), inset 0 1px 0 var(--glass-highlight);
		position: sticky;
		top: var(--space-md);
		z-index: 50;

		@media (max-width: 900px) {
			top: calc(4rem + var(--space-sm));
			margin: var(--space-sm) var(--space-md) 0;
		}
	}

	.header-links {
		display: flex;
		gap: var(--space-lg);

		a {
			font-family: var(--font-mono);
			font-size: var(--font-size-xs);
			letter-spacing: 0.04em;
			color: var(--text-color-dim);
			text-decoration: none;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				left: 0;
				bottom: -3px;
				width: 100%;
				height: 1px;
				background: var(--accent);
				transform: scaleX(0);
				transform-origin: right;
				transition: transform var(--transition-base);
			}

			&:hover {
				color: var(--accent);

				&::after {
					transform-origin: left;
					transform: scaleX(1);
				}
			}
		}

		@media (max-width: 600px) {
			gap: var(--space-md);

			a:nth-child(3) {
				display: none;
			}
		}
	}

	.header-download {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.35rem 0.75rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-weight: 500;
		color: var(--text-color-secondary);
		text-decoration: none;
		transition: all var(--transition-fast);

		:global(svg) {
			width: 0.85rem;
			height: 0.85rem;
		}

		&:hover {
			color: var(--accent);
			border-color: var(--border-color-accent);
			background: var(--accent-transparent);
		}
	}

	main {
		flex: 1;
		overflow-y: auto;
		scroll-behavior: smooth;
		margin: var(--space-md) var(--space-lg) var(--space-lg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		background: var(--glass-soft);
		backdrop-filter: blur(24px) saturate(150%);
		-webkit-backdrop-filter: blur(24px) saturate(150%);
		box-shadow: var(--shadow-lg), inset 0 1px 0 var(--glass-highlight);

		@media (max-width: 900px) {
			overflow: visible;
			margin: var(--space-sm) var(--space-md) var(--space-md);
		}
	}

	.page {
		max-width: var(--max-content-width);
		margin: 0 auto;
		padding: 0 var(--space-xl) var(--space-2xl);

		@media (max-width: 600px) {
			padding: 0 var(--space-md) var(--space-xl);
		}
	}

	/* ============ Banner ============ */
	.banner-wrap {
		max-width: var(--max-content-width);
		margin: var(--space-lg) auto 0;
		padding: 0 var(--space-xl);

		@media (max-width: 600px) {
			padding: 0 var(--space-md);
		}
	}

	.banner {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
		padding: var(--space-md) var(--space-lg);
		border: 1px solid var(--border-color-accent);
		border-left: 3px solid var(--accent);
		border-radius: var(--radius-md);
		background: linear-gradient(90deg, var(--accent-transparent), transparent 70%);

		@media (max-width: 768px) {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-sm);
		}
	}

	.banner-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--radius-md);
		background: var(--accent-transparent);
		color: var(--accent);
		flex-shrink: 0;

		:global(svg) {
			width: 1.1rem;
			height: 1.1rem;
		}
	}

	.banner-text {
		flex: 1;
		font-size: var(--font-size-sm);
		color: var(--text-color-dim);
		line-height: var(--line-height-normal);

		strong {
			color: var(--text-color);
		}

		a {
			color: var(--accent);
			font-weight: 500;
		}
	}

	.banner-action {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-weight: 500;
		color: var(--accent);
		text-decoration: none;
		border: 1px solid var(--border-color-accent);
		white-space: nowrap;
		transition: all var(--transition-fast);

		:global(svg) {
			width: 0.75rem;
			height: 0.75rem;
			transition: transform var(--transition-fast);
		}

		&:hover {
			background: var(--accent);
			color: var(--background);

			:global(svg) {
				transform: translateX(3px);
			}
		}
	}
</style>
