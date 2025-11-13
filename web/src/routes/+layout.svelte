<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { theme, toggleTheme } from '$lib/stores/theme';

	import '../app.css';
	import '../styles/variables.scss';
	import '../styles/link.scss';
	import '../styles/page-global.scss';

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

	let header: HTMLElement | null = null;
  let main: HTMLElement | null = null;

	// Display banner if looking for job, within the specified dates. Format date into human readable string
	const lookingForJobDates = {
		start: new Date('2025-07-01'),
		end: new Date('2026-12-30'),
	};
	const currentDate = new Date();
	const startDateFormatted = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(lookingForJobDates.start);
	const isSeekingOpportunities = currentDate <= lookingForJobDates.end;
	const pagesToShowBanner = ['/', '/achievements', '/skills', '/experience', '/certificates'];

  function handleScroll() {
    if (header && main) {
      if (main.scrollTop > 60) {
        header.style.boxShadow = '24px 0 22px 0 #0000007d';
        header.style.zIndex = '13';
      } else {
        header.style.boxShadow = '';
        header.style.zIndex = '';
      }
    }
  }

  onMount(() => {
    if (browser) {
      main?.addEventListener('scroll', handleScroll);

      return () => {
        main?.removeEventListener('scroll', handleScroll);
      };
    }
  });
	
	let path;
	// @ts-ignore
	$: path = $page.url.pathname;

	const socials = [
		{ name: 'GitHub', url: 'https://github.com/Daniel-wambua', icon: 'fa-github', color: '#333' },
		{ name: 'Twitter', url: 'https://twitter.com/wambuahdaniel', icon: 'fa-twitter', color: '#1DA1F2' },
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/daniel-wambua-a312b32b8', icon: 'fa-linkedin', color: '#0A66C2' },
		{ name: 'CTFtime', url: 'https://ctftime.org/team/409004', icon: 'fa-flag', iconType: 'fa-solid', color: '#00ff41' },
		{ name: 'Linktree', url: 'https://linktree.havocsec.me' , icon: 'fa-tree', iconType: 'fa-solid', color: '#43E55E' },
    ];
	const navLinks = [
		{ name: 'Intro', url: '/intro', icon: 'fa-terminal' },
		{ name: 'Experience', url: '/experience', icon: 'fa-shield-halved' },
		{ name: 'Achievements', url: '/achievements', icon: 'fa-trophy' },
		{ name: 'Skills', url: '/skills', icon: 'fa-code' },
		{ name: 'Certificates', url: '/certificates', icon: 'fa-certificate' },
		{ name: 'Contact', url: '/contact', icon: 'fa-envelope' },
	];

	const headerLinks = [
		{ name: 'Security Blog', url: 'https://havocsec.me/blog' },
		{ name: 'CTF Writeups', url: 'https://havocsec.me/ctf/' },
		{ name: 'Research', url: 'https://havocsec.me/pentesting' },
	];
</script>

<div class="app">
	<aside>
		<div class="aside-inner">
			<a href="/" class="no-underline">
				<h1 class="cyber-title">
					<span class="terminal-prompt">Root@daniel:~$</span>
					<span class="command">whoami</span>
				</h1>
			</a>
			<h2 class="job-title">
				<i class="fa-solid fa-shield-halved cyber-icon"></i>
		Pentester , Ethical Hacker & Developer
			</h2>
			<div class="status-indicator">
				<span class="status-dot"></span>
				<span class="status-text">Available for Security Consulting</span>
			</div>
			<img class="profile-picture" width="300" src="/profile-picture.jpg" alt="Daniel Wambua - Cybersecurity Expert" />
			
			<ul class="socials">
				{#each socials as { url, icon, color, iconType = 'fa-brands' }}
					<li style="--hover-color: {color}">
						<a class="no-underline" href={url} target="_blank" rel="nofollow">
							<i class="{iconType} {icon}"></i>
						</a>
					</li>
				{/each}
			</ul>
			
			<nav class="cv-pages-nav">
				<ul>
					{#each navLinks as { name, url, icon }}
						<li class:is-active={path === url}>
							<a class="no-underline" href={url}><i class="nav-icon fa-solid {icon}"></i>{name}</a>
						</li>
					{/each}
					{ #if path !== '/'}
						<li><a href="/" class="no-underline"><i class="nav-icon fa-solid fa-home"></i>Home</a></li>
					{/if}
				</ul>
			</nav>
			<a href="/download" class="no-underline">
				<button class="download-btn">
					<i class="fa-solid fa-file-arrow-down"></i>
					Download CV
				</button>
			</a>
			<a class="view-code-link" href="https://github.com/Daniel-wambua/cv" target="_blank" rel="nofollow">Or View CV Source Code on GitHub</a>
		</div>
		<div class="aside-bottom">
			<a class="get-in-touch" href="/contact">
				<i class="fa-solid fa-paper-plane"></i>
				Send me a Message
			</a>
			<br>
			<small class="license">
				<a href="https://github.com/Daniel-wambua/cv">Daniel-wambua/cv</a>
				is licensed under <a href="https://github.com/Daniel-wambua/cv/blob/main/LICENSE">MIT</a>, &copy; <a href="https://danielwambua.dev">Daniel Wambua</a> 2025
			</small>
		</div>
	</aside>
	<div class="content-wrapper">
		<header bind:this={header}>
			<div class="nav-links">
				{#each headerLinks as { name, url }}
					<a class="no-underline" target="_blank" href={url}>{name}</a>
				{/each}
			</div>
			<div class="header-actions">
				<a href="/download" class="download-cv-header no-underline">
					<button class="download-btn-header">
						<i class="fa-solid fa-file-arrow-down"></i>
						Download CV
					</button>
				</a>
				<div class="theme-toggle">
					<button 
						on:click={toggleTheme}
						class:active={$theme === 'light'}
						aria-label="Switch to light mode"
						title="Light mode"
					>
						<i class="fa-solid fa-sun"></i>
					</button>
					<button 
						on:click={toggleTheme}
						class:active={$theme === 'dark'}
						aria-label="Switch to dark mode"
						title="Dark mode"
					>
						<i class="fa-solid fa-moon"></i>
					</button>
				</div>
			</div>
		</header>

		<main bind:this={main}>

			{#if pagesToShowBanner.includes(path) && isSeekingOpportunities}
			<div class="job-seeking-banner">
				<div class="banner-content">
					<div class="banner-icon">
						<i class="fa-solid fa-briefcase-medical"></i>
					</div>
					<div class="banner-text">
						<p class="banner-title">
							<strong>As of {startDateFormatted}, I am actively seeking new opportunities!</strong>
						</p>
						<p class="banner-subtitle">
							Read my <a href="/intro">full bio</a> to learn more about me,
							and if you think I could be a good fit for your team,
							please <a href="/contact">get in touch</a>.
						</p>
					</div>
					<div class="banner-action">
						<a href="/ideal-role">
							<button class="cyber-btn">
								<i class="fa-solid fa-bullseye-arrow"></i>
								View Ideal Role
								<i class="fa-solid fa-arrow-right"></i>
							</button>
						</a>
					</div>
				</div>
			</div>
		{/if}

			<div class="page"><slot /></div>
		</main>
	</div>
</div>

<style lang="scss">
	.job-seeking-banner {
		background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%);
		border: 1px solid rgba(6, 182, 212, 0.2);
		border-left: 4px solid #06b6d4;
		border-radius: 0.75rem;
		width: 90%;
		max-width: 1200px;
		margin: 1.5rem auto;
		padding: 2rem;
		backdrop-filter: blur(16px);
		box-shadow: 
			0 4px 6px -1px rgba(0, 0, 0, 0.3), 
			0 2px 4px -1px rgba(0, 0, 0, 0.1),
			0 0 20px rgba(6, 182, 212, 0.1);
		
		.banner-content {
			display: flex;
			align-items: center;
			gap: 1.5rem;
			
			@media (max-width: 768px) {
				flex-direction: column;
				text-align: center;
				gap: 1rem;
			}
		}
		
		.banner-icon {
			background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
			color: #0f172a;
			width: 60px;
			height: 60px;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 1.5rem;
			flex-shrink: 0;
			box-shadow: 
				0 4px 6px -1px rgba(6, 182, 212, 0.4), 
				0 2px 4px -1px rgba(6, 182, 212, 0.1),
				0 0 20px rgba(6, 182, 212, 0.3);
			
			@media (max-width: 768px) {
				width: 50px;
				height: 50px;
			}
		}
		
		.banner-text {
			flex: 1;
			
			.banner-title {
				margin: 0 0 0.5rem 0;
				
				strong {
					color: #f1f5f9;
					font-size: 1.125rem;
					font-weight: 700;
					letter-spacing: -0.025em;
					text-shadow: 0 0 10px rgba(6, 182, 212, 0.2);
				}
			}
			
			.banner-subtitle {
				margin: 0;
				color: #94a3b8;
				font-size: 1rem;
				line-height: 1.6;
				
				a {
					color: #06b6d4;
					text-decoration: none;
					font-weight: 600;
					border-bottom: 1px solid transparent;
					padding-bottom: 1px;
					transition: all 0.3s ease;
					
					&:hover {
						color: #67e8f9;
						border-bottom-color: #06b6d4;
						text-shadow: 0 0 8px rgba(6, 182, 212, 0.4);
					}
				}
			}
		}
		
		.banner-action {
			flex-shrink: 0;
			
			.cyber-btn {
				background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
				color: #0f172a;
				border: 1px solid rgba(6, 182, 212, 0.3);
				padding: 0.875rem 1.75rem;
				border-radius: 0.5rem;
				font-family: var(--font-mono);
				font-weight: 700;
				cursor: pointer;
				transition: all 0.3s ease;
				display: flex;
				align-items: center;
				gap: 0.5rem;
				text-decoration: none;
				font-size: 0.9rem;
				box-shadow: 
					0 4px 6px -1px rgba(6, 182, 212, 0.3), 
					0 2px 4px -1px rgba(6, 182, 212, 0.1),
					0 0 20px rgba(6, 182, 212, 0.2);
				text-transform: uppercase;
				letter-spacing: 0.05em;
				
				&:hover {
					transform: translateY(-2px);
					box-shadow: 
						0 6px 12px -1px rgba(6, 182, 212, 0.4), 
						0 4px 6px -1px rgba(6, 182, 212, 0.1),
						0 0 30px rgba(6, 182, 212, 0.4);
					background: linear-gradient(135deg, #67e8f9 0%, #06b6d4 100%);
					border-color: rgba(6, 182, 212, 0.5);
				}
				
				&:active {
					transform: translateY(-1px);
				}
				
				i {
					font-size: 0.875rem;
				}
			}
		}
	}
</style>
