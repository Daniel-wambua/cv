<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import SocialLinks from '$components/SocialLinks.svelte';

	import ChevronDownIcon from '~icons/fa6-solid/chevron-down';
	import MoonIcon from '~icons/fa6-solid/moon';
	import SunIcon from '~icons/fa6-solid/sun';

	import '@fontsource/fira-mono/400.css';
	import '@fontsource/fira-mono/500.css';
	import '../app.css';
	import '../styles/variables.scss';

	type MenuName = 'about' | 'work' | null;
	type ThemeName = 'light' | 'dark';

	let path: string;
	let theme: ThemeName = 'light';
	let openMenu: MenuName = null;
	let mobileMenuOpen = false;
	let mobileGroup: MenuName = null;
	let navRoot: HTMLElement;
	let aboutTrigger: HTMLButtonElement;
	let workTrigger: HTMLButtonElement;
	let mobileTrigger: HTMLButtonElement;
	let dropdownCloseTimeout: ReturnType<typeof setTimeout>;

	$: path = $page.url.pathname;
	$: if (path) {
		clearTimeout(dropdownCloseTimeout);
		openMenu = null;
		mobileMenuOpen = false;
		mobileGroup = null;
	}

	const aboutLinks = [
		{ name: 'About me', url: '/intro' },
		{ name: 'Experience', url: '/experience' },
		{ name: 'Achievements', url: '/achievements' },
		{ name: 'Skills', url: '/skills' },
		{ name: 'Certifications', url: '/certificates' }
	];

	const workLinks = [
		{ name: 'Selected projects', url: '/work' },
		{ name: 'Security research', url: 'https://havocsec.dev/pentesting/hackthebox/' },
		{ name: 'CTF writeups', url: 'https://havocsec.dev/ctf/' }
	];

	const socials = [
		{
			name: 'GitHub',
			url: 'https://github.com/Daniel-wambua',
			handle: 'Daniel-wambua',
			icon: 'github'
		},
		{ name: 'X', url: 'https://x.com/HavocRichie', handle: 'HavocRichie', icon: 'twitter' },
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/daniel-wambua-a312b32b8',
			handle: 'daniel-wambua',
			icon: 'linkedin'
		}
	];

	const isActive = (url: string) => path === url || (url !== '/' && path.startsWith(`${url}/`));
	const isExternal = (url: string) => url.startsWith('http');

	onMount(() => {
		theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.dataset.theme = theme;
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute('content', theme === 'dark' ? '#101311' : '#F4F1EA');
		try {
			localStorage.setItem('havocsec-theme', theme);
		} catch {
			// The selected theme remains active for this page even when storage is unavailable.
		}
	}

	function handleOutsideClick(event: MouseEvent) {
		if (navRoot && event.target instanceof Node && !navRoot.contains(event.target)) {
			openMenu = null;
			mobileMenuOpen = false;
			mobileGroup = null;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape') return;

		if (mobileMenuOpen) {
			mobileMenuOpen = false;
			mobileGroup = null;
			mobileTrigger?.focus();
			return;
		}

		if (openMenu) {
			const trigger = openMenu === 'about' ? aboutTrigger : workTrigger;
			openMenu = null;
			trigger?.focus();
		}
	}

	function openDropdown(menu: Exclude<MenuName, null>) {
		clearTimeout(dropdownCloseTimeout);
		openMenu = menu;
	}

	function closeDropdown(menu: Exclude<MenuName, null>) {
		clearTimeout(dropdownCloseTimeout);
		dropdownCloseTimeout = setTimeout(() => {
			if (openMenu === menu) openMenu = null;
		}, 140);
	}
</script>

<svelte:window on:keydown={handleKeydown} />
<svelte:document on:click={handleOutsideClick} />

<svelte:head>
	<link rel="canonical" href={`https://cv.havocsec.me${path || '/'}`} />
</svelte:head>

<div class="app-backdrop" aria-hidden="true"></div>
<div class="site-shell">
	<a class="skip-link" href="#main">Skip to content</a>

	<header class="site-header" bind:this={navRoot}>
		<a class="brand" href="/" aria-label="Home">
			<img class="brand-mark" src="/favicon.png" alt="" width="40" height="40" />
		</a>

		<nav class="primary-nav" aria-label="Primary navigation">
			<ul>
				<li>
					<a class:active={path === '/'} href="/" aria-current={path === '/' ? 'page' : undefined}>
						Home
					</a>
				</li>
				<li
					class="nav-group"
					class:menu-open={openMenu === 'about'}
					on:mouseenter={() => openDropdown('about')}
					on:mouseleave={() => closeDropdown('about')}
				>
					<button
						bind:this={aboutTrigger}
						class:active={aboutLinks.some((item) => isActive(item.url))}
						type="button"
						aria-haspopup="true"
						aria-expanded={openMenu === 'about'}
						on:click={() => openDropdown('about')}
					>
						About <ChevronDownIcon />
					</button>
					{#if openMenu === 'about'}
						<ul class="dropdown" aria-label="About">
							{#each aboutLinks as item (item.url)}
								<li>
									<a
										class:active={isActive(item.url)}
										href={item.url}
										aria-current={isActive(item.url) ? 'page' : undefined}
									>
										{item.name}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
				<li
					class="nav-group"
					class:menu-open={openMenu === 'work'}
					on:mouseenter={() => openDropdown('work')}
					on:mouseleave={() => closeDropdown('work')}
				>
					<button
						bind:this={workTrigger}
						class:active={isActive('/work')}
						type="button"
						aria-haspopup="true"
						aria-expanded={openMenu === 'work'}
						on:click={() => openDropdown('work')}
					>
						Work <ChevronDownIcon />
					</button>
					{#if openMenu === 'work'}
						<ul class="dropdown" aria-label="Work">
							{#each workLinks as item (item.url)}
								<li>
									<a
										class:active={isActive(item.url)}
										href={item.url}
										target={isExternal(item.url) ? '_blank' : undefined}
										rel={isExternal(item.url) ? 'noopener noreferrer' : undefined}
										aria-current={isActive(item.url) ? 'page' : undefined}
									>
										{item.name}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
				<li>
					<a
						class:active={isActive('/download')}
						href="/download"
						aria-current={isActive('/download') ? 'page' : undefined}
					>
						Resume
					</a>
				</li>
				<li>
					<a
						class:active={isActive('/contact')}
						href="/contact"
						aria-current={isActive('/contact') ? 'page' : undefined}
					>
						Contact
					</a>
				</li>
			</ul>
		</nav>

		<div class="header-actions">
			<button
				class="theme-toggle"
				type="button"
				on:click={toggleTheme}
				aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} appearance`}
				title={`Switch to ${theme === 'light' ? 'dark' : 'light'} appearance`}
			>
				{#if theme === 'light'}<MoonIcon />{:else}<SunIcon />{/if}
			</button>
			<button
				bind:this={mobileTrigger}
				class="mobile-menu-trigger"
				type="button"
				on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-navigation"
				class:open={mobileMenuOpen}
			>
				<span class="menu-icon" aria-hidden="true">
					<span></span><span></span>
				</span>
			</button>
		</div>

		{#if mobileMenuOpen}
			<nav class="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation">
				<a class:active={path === '/'} href="/" aria-current={path === '/' ? 'page' : undefined}
					>Home</a
				>
				<div class="mobile-group">
					<button
						type="button"
						aria-expanded={mobileGroup === 'about'}
						on:click={() => (mobileGroup = mobileGroup === 'about' ? null : 'about')}
					>
						About <ChevronDownIcon />
					</button>
					{#if mobileGroup === 'about'}
						<div class="mobile-submenu">
							{#each aboutLinks as item (item.url)}
								<a
									class:active={isActive(item.url)}
									href={item.url}
									aria-current={isActive(item.url) ? 'page' : undefined}
								>
									{item.name}
								</a>
							{/each}
						</div>
					{/if}
				</div>
				<div class="mobile-group">
					<button
						type="button"
						aria-expanded={mobileGroup === 'work'}
						on:click={() => (mobileGroup = mobileGroup === 'work' ? null : 'work')}
					>
						Work <ChevronDownIcon />
					</button>
					{#if mobileGroup === 'work'}
						<div class="mobile-submenu">
							{#each workLinks as item (item.url)}
								<a
									class:active={isActive(item.url)}
									href={item.url}
									target={isExternal(item.url) ? '_blank' : undefined}
									rel={isExternal(item.url) ? 'noopener noreferrer' : undefined}
								>
									{item.name}
								</a>
							{/each}
						</div>
					{/if}
				</div>
				<a
					class:active={isActive('/download')}
					href="/download"
					aria-current={isActive('/download') ? 'page' : undefined}>Resume</a
				>
				<a
					class:active={isActive('/contact')}
					href="/contact"
					aria-current={isActive('/contact') ? 'page' : undefined}>Contact</a
				>
			</nav>
		{/if}
	</header>

	<main id="main" class="main-content">
		<slot />
	</main>

	<footer class="site-footer">
		<a class="footer-brand" href="/">Daniel Wambua <span>·</span> HavocSec</a>
		<p>Cybersecurity, software, and practical research.</p>
		<SocialLinks {socials} />
		<small>© {new Date().getFullYear()} Daniel Wambua</small>
	</footer>
</div>

<style lang="scss">
	.site-shell {
		width: min(var(--max-content-width), calc(100% - 3rem));
		margin: 0 auto;
	}

	.skip-link {
		position: fixed;
		z-index: 300;
		top: 0.75rem;
		left: 0.75rem;
		padding: 0.65rem 1rem;
		transform: translateY(-180%);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--surface);
		color: var(--text-color);
		box-shadow: var(--shadow-md);

		&:focus {
			transform: translateY(0);
		}
	}

	.site-header {
		position: sticky;
		z-index: 100;
		top: max(0.85rem, env(safe-area-inset-top));
		display: flex;
		align-items: center;
		gap: 1.4rem;
		width: fit-content;
		max-width: 100%;
		min-height: 3.75rem;
		margin: 1rem auto 0;
		padding: 0.4rem 0.55rem 0.4rem 0.8rem;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		background: var(--glass);
		box-shadow:
			var(--shadow-md),
			inset 0 1px 0 var(--glass-highlight);
		backdrop-filter: blur(18px) saturate(130%);
		-webkit-backdrop-filter: blur(18px) saturate(130%);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		color: var(--text-color);
		font-size: 0.95rem;
		font-weight: 650;
		letter-spacing: -0.035em;
		white-space: nowrap;

		&:hover {
			color: var(--text-color);
		}
	}

	.brand-mark {
		display: block;
		width: 2rem;
		height: 2rem;
		object-fit: contain;
	}

	.primary-nav {
		display: block;

		ul {
			display: flex;
			align-items: center;
			gap: 0.12rem;
			margin: 0;
			padding: 0;
			list-style: none;
		}

		li {
			position: relative;
		}

		.nav-group::after {
			position: absolute;
			top: 100%;
			right: 0;
			left: 0;
			height: 0.75rem;
			content: '';
		}

		a,
		button {
			display: inline-flex;
			align-items: center;
			gap: 0.35rem;
			min-height: 2.45rem;
			padding: 0.45rem 0.75rem;
			border-radius: var(--radius-full);
			background: transparent;
			color: var(--text-color-dim);
			font-size: 0.86rem;
			font-weight: 520;
			white-space: nowrap;

			:global(svg) {
				width: 0.65rem;
				height: 0.65rem;
				opacity: 0.65;
				transition: transform var(--transition-fast);
			}

			&:hover {
				background: var(--background-hover);
				color: var(--text-color);
			}

			&.active {
				background: var(--background-hover);
				color: var(--text-color);
			}
		}

		.menu-open > button :global(svg) {
			transform: rotate(180deg);
		}
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 0.6rem);
		left: 50%;
		display: flex !important;
		min-width: 13rem;
		flex-direction: column;
		align-items: stretch !important;
		gap: 0.2rem !important;
		padding: 0.45rem !important;
		transform: translateX(-50%);
		border: 1px solid var(--border-color);
		border-radius: 1.1rem;
		background: var(--surface-elevated);
		box-shadow: var(--shadow-lg);
		animation: menu-in 130ms ease-out both;

		a {
			justify-content: flex-start;
			width: 100%;
			border-radius: 0.7rem !important;
			font-size: 0.84rem !important;
		}
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.theme-toggle,
	.mobile-menu-trigger {
		display: inline-grid;
		width: 2.5rem;
		height: 2.5rem;
		place-items: center;
		border-radius: 50%;
		color: var(--text-color-secondary);
		transition:
			background var(--transition-fast),
			color var(--transition-fast);

		:global(svg) {
			width: 1rem;
			height: 1rem;
		}

		&:hover {
			background: var(--background-hover);
			color: var(--accent);
		}
	}

	.mobile-menu-trigger,
	.mobile-navigation {
		display: none;
	}

	.menu-icon {
		display: flex;
		width: 1.2rem;
		height: 0.9rem;
		flex-direction: column;
		justify-content: space-between;

		span {
			display: block;
			width: 100%;
			height: 2px;
			border-radius: 2px;
			background: currentColor;
			transition:
				transform var(--transition-fast),
				width var(--transition-fast);
		}
	}

	.mobile-menu-trigger.open .menu-icon span:first-child {
		transform: translateY(0.35rem) rotate(45deg);
	}

	.mobile-menu-trigger.open .menu-icon span:last-child {
		transform: translateY(-0.35rem) rotate(-45deg);
	}

	.main-content {
		min-height: 65vh;
		padding: 0 0 4.5rem;
	}

	.site-footer {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 0.6rem 1.5rem;
		padding: 1.5rem 0 calc(2rem + env(safe-area-inset-bottom));
		border-top: 1px solid var(--border-color);

		p,
		small {
			color: var(--text-color-dim);
			font-size: var(--font-size-xs);
		}
	}

	.site-footer :global(.social-links) {
		grid-column: 2;
		grid-row: 1 / span 2;
		justify-content: flex-end;
	}

	.site-footer :global(.social-links a) {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
	}

	.footer-brand {
		color: var(--text-color);
		font-size: 0.9rem;
		font-weight: 600;

		span {
			color: var(--accent);
		}
	}

	@keyframes menu-in {
		from {
			opacity: 0;
			transform: translate(-50%, -0.25rem);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}

	@media (max-width: 860px) {
		.site-shell {
			width: min(100% - 2rem, 42rem);
		}

		.site-header {
			position: sticky;
			width: 100%;
			justify-content: space-between;
			gap: 0.5rem;
			margin-top: max(0.6rem, env(safe-area-inset-top));
			padding-left: 0.7rem;
			border-radius: 1.25rem;
		}

		.primary-nav {
			display: none;
		}

		.mobile-menu-trigger {
			display: inline-grid;
		}

		.mobile-navigation {
			position: absolute;
			top: calc(100% + 0.55rem);
			right: 0;
			left: 0;
			display: flex;
			max-height: min(72vh, 34rem);
			flex-direction: column;
			gap: 0.2rem;
			padding: 0.5rem;
			overflow-y: auto;
			border: 1px solid var(--border-color);
			border-radius: 1.25rem;
			background: var(--surface-elevated);
			box-shadow: var(--shadow-lg);
			animation: mobile-menu-in 140ms ease-out both;

			& > a,
			.mobile-group > button {
				display: flex;
				min-height: 2.9rem;
				align-items: center;
				justify-content: space-between;
				padding: 0.7rem 0.85rem;
				border-radius: 0.8rem;
				color: var(--text-color-secondary);
				font-size: 0.95rem;
				text-align: left;

				&:hover {
					background: var(--background-hover);
					color: var(--text-color);
				}
			}

			.mobile-group > button {
				width: 100%;
				font-weight: 550;

				:global(svg) {
					width: 0.75rem;
					height: 0.75rem;
					transition: transform var(--transition-fast);
				}
			}
		}

		:global(.mobile-group > button[aria-expanded='true'] svg) {
			transform: rotate(180deg);
		}

		.mobile-navigation > a.active {
			background: var(--background-hover);
			color: var(--text-color);
		}

		.mobile-submenu {
			display: flex;
			flex-direction: column;
			gap: 0.1rem;
			padding: 0 0 0.35rem 0.7rem;

			a {
				display: flex;
				min-height: 2.65rem;
				align-items: center;
				padding: 0.6rem 0.85rem;
				border-left: 1px solid var(--border-color);
				color: var(--text-color-dim);
				font-size: 0.9rem;

				&:hover,
				&.active {
					color: var(--accent);
				}
			}
		}
	}

	@keyframes mobile-menu-in {
		from {
			opacity: 0;
			transform: translateY(-0.2rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 520px) {
		.site-shell {
			width: calc(100% - 1.25rem);
		}

		.site-header {
			min-height: 3.45rem;
		}

		.main-content {
			padding-bottom: 3rem;
		}

		.site-footer {
			grid-template-columns: 1fr;
			gap: 0.7rem;
		}

		.site-footer :global(.social-links) {
			grid-column: 1;
			grid-row: auto;
			justify-content: flex-start;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dropdown,
		.mobile-navigation {
			animation: none;
		}
	}
</style>
