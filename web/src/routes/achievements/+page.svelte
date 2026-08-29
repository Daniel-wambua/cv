<script lang="ts">
	import PageHero from '$components/PageHero.svelte';
	import SectionHeading from '$components/SectionHeading.svelte';
	import Card from '$components/Card.svelte';
	import Language from '$components/Language.svelte';
	import { reveal } from '$lib/actions/reveal';

	import BookIcon from '~icons/fa6-solid/book-open';
	import UsersIcon from '~icons/fa6-solid/users';
	import FlagIcon from '~icons/fa6-solid/flag';
	import BugIcon from '~icons/fa6-solid/bug';
	import TrophyIcon from '~icons/fa6-solid/trophy';
	import MedalIcon from '~icons/fa6-solid/medal';
	import StarIcon from '~icons/fa6-solid/star';
	import LinkIcon from '~icons/fa6-solid/link';
	import GithubIcon from '~icons/fa6-brands/github';
	import ArrowUpRightIcon from '~icons/fa6-solid/arrow-up-right-from-square';

	const stats = [
		{
			stat: 'Published research on web application and API security',
			source: 'https://havocsec.dev',
			icon: BookIcon
		},
		{
			stat: '5k+ followers across GitHub, X, Dev, LinkedIn, Facebook, and Slack',
			source: 'https://github.com/Daniel-wambua',
			icon: UsersIcon
		},
		{
			stat: 'Active CTF competitor and security researcher',
			source: 'https://ctftime.org/team/409004',
			icon: FlagIcon
		},
		{
			stat: 'Bug bounty hunter',
			source: '',
			icon: BugIcon
		}
	];

	const awards = [
		{
			award: 'Top 10 Finalist (6th Place), CyberGame Kenya 2026',
			issuer: 'CyberGame Kenya',
			source: 'https://drive.google.com/file/d/1TnOp-KgKDr4i5hWWWvq6uKJU5GO9brEV/view?usp=sharing',
			date: '2026'
		},
		{
			award: 'Participant, Thryve CTF',
			issuer: 'Thryve',
			source: 'https://drive.google.com/file/d/1gGUIxMeQ6Cqy4N13vQHu7E_-rM9IHw3M/view?usp=sharing',
			date: '2026'
		},
		{
			award: '3rd Place, Connected Africa Summit 2026 CTF',
			issuer: 'Connected Africa Summit (Team JOINT, Karatina University)',
			source: 'https://drive.google.com/file/d/1XTcK8byXo-xYlFFIb6po5rU7VwoUAbl1/view?usp=sharing',
			date: '2026'
		},
		{
			award: 'Best CyberGame male winner, 2025',
			issuer: 'Ministry of ICT Kenya and Embassy of the Slovak Nation Kenya',
			source: '',
			date: '2025'
		},
		{
			award: 'Outstanding CTF Performance',
			issuer: 'CTF Organizers',
			source: '/certificates',
			date: '2025'
		}
	];

	const hackathonWins = [
		{
			title: 'Connected Africa Summit 2026 CTF',
			achievement: '3rd Place',
			description:
				'Collaborated with Team JOINT from Karatina University to solve complex capture the flag challenges, demonstrating advanced offensive security and problem-solving skills in a competitive environment.',
			date: '2026'
		},
		{
			title: 'University Innovation Challenge',
			achievement: '3rd place overall',
			description: 'Developed a cybersecurity awareness platform for students.',
			date: '2024'
		}
	];

	const projects = [
		{
			name: 'blog',
			description:
				'My CTF writeups website with a focus on security topics, penetration testing, and ethical hacking.',
			tech: 'Astro,Yaml,html,css,javascript,markdown',
			stars: '10',
			repo: 'Daniel-wambua/blog',
			web: 'https://havocsec.dev'
		},
		{
			name: 'cyberhub',
			description: 'A curated living, automated knowledge base for cybersecurity professionals.',
			tech: 'Astro,TailwindCSS,JSDOM,node-fetch,yaml',
			stars: '8',
			repo: 'Daniel-wambua/cyberhub',
			web: 'https://cyberhub.havocsec.dev'
		}
	];
</script>

<svelte:head>
	<title>Daniel Wambua | Achievements</title>
	<meta
		name="description"
		content="Awards, competition results, and featured projects of Daniel Wambua: CyberGame Kenya
		finalist, Connected Africa Summit CTF podium finisher, and active security researcher."
	/>
</svelte:head>

<div class="achievements">
	<PageHero
		eyebrow="04 / Achievements"
		title="Results on the board"
		summary="Competition placements, published research, and projects that keep shipping. Every claim links to something you can verify."
	/>

	<SectionHeading index="01" title="Highlights">
		Activity and reach across research, community, and competition.
	</SectionHeading>
	<div class="stats-grid">
		{#each stats as { stat, source, icon }, i}
			<Card revealDelay={i * 80} class="stat-card">
				<span class="stat-icon"><svelte:component this={icon} /></span>
				<div class="stat-body">
					<p>{stat}</p>
					{#if source}
						<a
							class="verify"
							href={source}
							target={source.startsWith('/') ? undefined : '_blank'}
							rel={source.startsWith('/') ? undefined : 'noopener noreferrer'}
						>
							<LinkIcon />
							Verify
						</a>
					{/if}
				</div>
			</Card>
		{/each}
	</div>

	<SectionHeading index="02" title="Awards and recognition" meta={`${awards.length} entries`}>
		Formal recognition from competitions and programs.
	</SectionHeading>
	<div class="awards-grid">
		{#each awards as { award, issuer, source, date }, i}
			<Card revealDelay={i * 70} class="award-card">
				<div class="award-head">
					<span class="award-icon"><TrophyIcon /></span>
					<span class="award-date">{date}</span>
				</div>
				<h3>{award}</h3>
				<p class="issuer">Issued by {issuer}</p>
				{#if source}
					<a
						class="award-link"
						href={source}
						target={source.startsWith('/') ? undefined : '_blank'}
						rel={source.startsWith('/') ? undefined : 'noopener noreferrer'}
					>
						<LinkIcon />
						View certificate
					</a>
				{/if}
			</Card>
		{/each}
	</div>

	<SectionHeading index="03" title="Featured projects" meta={`${projects.length} highlighted`}>
		Open source work maintained in public.
	</SectionHeading>
	<div class="projects-grid">
		{#each projects as project, i}
			<Card revealDelay={i * 100} class="project-card">
				<div class="project-head">
					<h3>{project.name}</h3>
					<div class="project-links">
						<a
							href="https://github.com/{project.repo}"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="View repository"
							title="View repository"
						>
							<GithubIcon />
						</a>
						<a
							href={project.web}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="View live site"
							title="View live site"
						>
							<ArrowUpRightIcon />
						</a>
					</div>
				</div>
				<p class="description">{project.description}</p>
				<div class="tech">
					<Language language={project.tech} small={true} />
				</div>
				<div class="project-meta">
					<span class="stars"><StarIcon /> {project.stars}</span>
					<span class="repo">{project.repo}</span>
				</div>
			</Card>
		{/each}
	</div>
	<p class="more-link" use:reveal>
		More projects live on my
		<a href="https://github.com/Daniel-wambua" target="_blank" rel="noopener noreferrer">GitHub profile</a>.
	</p>

	<SectionHeading index="04" title="Hackathons and competitions">
		Team-based work under competitive conditions.
	</SectionHeading>
	<div class="competitions-grid">
		{#each hackathonWins as win, i}
			<Card revealDelay={i * 100} class="competition-card">
				<div class="competition-head">
					<h3>{win.title}</h3>
					<span class="competition-date">{win.date}</span>
				</div>
				<span class="badge"><MedalIcon /> {win.achievement}</span>
				<p class="description">{win.description}</p>
			</Card>
		{/each}
	</div>

	<figure class="hackathon-figure" use:reveal>
		<img
			src="/assets/Hackathon-win-pictures.webp"
			alt="Photos from hackathon and competition wins"
			width="1600"
			height="800"
			loading="lazy"
		/>
		<figcaption>Competition moments from the Connected Africa Summit 2026 CTF.</figcaption>
	</figure>
</div>

<style lang="scss">
	.achievements {
		position: relative;
	}

	/* ============ Stats ============ */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--space-md);
	}

	:global(.stat-card) {
		flex-direction: row;
		align-items: flex-start;
		gap: var(--space-md);
	}

	.stat-icon {
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

	.stat-body {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;

		p {
			font-size: var(--font-size-sm);
			font-weight: 500;
			color: var(--text-color);
			line-height: var(--line-height-normal);
		}
	}

	.verify {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--accent);
		text-decoration: none;

		:global(svg) {
			width: 0.65rem;
			height: 0.65rem;
		}

		&:hover {
			text-decoration: underline;
		}
	}

	/* ============ Awards ============ */
	.awards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		gap: var(--space-md);
	}

	:global(.award-card) {
		gap: var(--space-sm);
	}

	.award-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.award-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: var(--radius-md);
		background: var(--accent-transparent);
		color: var(--accent);

		:global(svg) {
			width: 1rem;
			height: 1rem;
		}
	}

	.award-date {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-muted);
		padding: 0.2rem 0.6rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-full);
	}

	h3 {
		font-size: var(--font-size-base);
		letter-spacing: var(--tracking-tight);
		line-height: var(--line-height-normal);
	}

	.issuer {
		font-size: var(--font-size-sm);
		color: var(--text-color-dim);
	}

	.award-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		margin-top: auto;
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--accent);
		text-decoration: none;

		:global(svg) {
			width: 0.65rem;
			height: 0.65rem;
		}

		&:hover {
			text-decoration: underline;
		}
	}

	/* ============ Projects ============ */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
		gap: var(--space-md);
	}

	.project-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-sm);

		h3 {
			font-family: var(--font-mono);
			font-size: var(--font-size-lg);
		}
	}

	.project-links {
		display: flex;
		gap: 0.375rem;

		a {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 2rem;
			height: 2rem;
			border: 1px solid var(--border-color);
			border-radius: var(--radius-sm);
			color: var(--text-color-dim);
			transition: all var(--transition-fast);

			:global(svg) {
				width: 0.9rem;
				height: 0.9rem;
			}

			&:hover {
				color: var(--accent);
				border-color: var(--border-color-accent);
				background: var(--accent-transparent);
			}
		}
	}

	.description {
		font-size: var(--font-size-sm);
		color: var(--text-color-dim);
		line-height: var(--line-height-normal);
	}

	.tech {
		margin-top: auto;
	}

	.project-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-sm);
		font-size: var(--font-size-xs);
		color: var(--text-color-muted);
	}

	.stars {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		color: var(--accent);

		:global(svg) {
			width: 0.7rem;
			height: 0.7rem;
		}
	}

	.repo {
		font-family: var(--font-mono);
	}

	.more-link {
		margin-top: var(--space-md);
		text-align: center;
		font-size: var(--font-size-sm);
		color: var(--text-color-dim);

		a {
			color: var(--accent);
		}
	}

	/* ============ Competitions ============ */
	.competitions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		gap: var(--space-md);
	}

	.competition-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-sm);

		h3 {
			font-size: var(--font-size-base);
		}
	}

	.competition-date {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-muted);
		white-space: nowrap;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		align-self: flex-start;
		padding: 0.35rem 0.75rem;
		border-radius: var(--radius-sm);
		background: var(--accent);
		color: var(--background);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		font-weight: 600;

		:global(svg) {
			width: 0.75rem;
			height: 0.75rem;
		}
	}

	/* ============ Hackathon image ============ */
	.hackathon-figure {
		margin-top: var(--space-xl);

		img {
			width: 100%;
			border-radius: var(--radius-lg);
			border: 1px solid var(--border-color);
		}

		figcaption {
			margin-top: var(--space-sm);
			text-align: center;
			font-family: var(--font-mono);
			font-size: var(--font-size-xs);
			color: var(--text-color-muted);
		}
	}
</style>
