<script lang="ts">
	import { marked } from 'marked';
	import PageHero from '$components/PageHero.svelte';
	import SectionHeading from '$components/SectionHeading.svelte';
	import Card from '$components/Card.svelte';
	import Tag from '$components/Tag.svelte';
	import StatBlock from '$components/StatBlock.svelte';
	import { reveal } from '$lib/actions/reveal';

	import EnvelopeIcon from '~icons/fa6-solid/envelope';
	import GithubIcon from '~icons/fa6-brands/github';
	import LocationIcon from '~icons/fa6-solid/location-dot';
	import ArrowRightIcon from '~icons/fa6-solid/arrow-right';
	import TrophyIcon from '~icons/fa6-solid/trophy';
	import LinkIcon from '~icons/fa6-solid/link';
	import ShieldIcon from '~icons/fa6-solid/shield-halved';
	import CrosshairsIcon from '~icons/fa6-solid/crosshairs';
	import SatelliteDishIcon from '~icons/fa6-solid/satellite-dish';
	import BugIcon from '~icons/fa6-solid/bug';

	export let data: any;

	const focusAreas = [
		{ label: 'Penetration testing', icon: CrosshairsIcon },
		{ label: 'SOC operations', icon: SatelliteDishIcon },
		{ label: 'Application security', icon: BugIcon }
	];

	// Certificate activity window start year; the end year always rolls forward
	const certStartYear = 2023;
	const currentYear = new Date().getFullYear();

	const prettifyUrl = (url: string) => url.replace(/(^\w+:|^)\/\//, '');

	const formatDate = (date: string) => {
		if (!date?.match(/^\d{4}-\d{2}$/)) return date;
		const [year, month] = date.split('-');
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		return `${months[parseInt(month, 10) - 1]} ${year}`;
	};

	const stripMd = (md: { text: string }) => {
		if (!md?.text) return '';
		return marked.parse(md.text, { async: false }) as string;
	};

	$: achievementCount = (data.achievements || []).length + (data.awards || []).length;
</script>

<svelte:head>
	<title>Daniel Wambua | Security Analyst and Pentester</title>
	<meta
		name="description"
		content="Cybersecurity analyst and IT student at Karatina University, focused on penetration
		testing, SOC operations, and application security. Active CTF competitor and bug bounty hunter."
	/>
</svelte:head>

<div class="home">
	<!-- Hero -->
	<section class="hero">
		<div class="hero-glow" aria-hidden="true"></div>
		<div class="grid-backdrop" aria-hidden="true"></div>

		<div class="hero-inner">
			<div class="focus-row">
				{#each focusAreas as area, i}
					<span
						class="focus-chip"
						use:reveal
						style={`--reveal-delay: ${i * 70}ms`}
					>
						<svelte:component this={area.icon} />
						{area.label}
					</span>
				{/each}
			</div>
			<h1 class="hero-title" use:reveal style="--reveal-delay: 80ms">
				{data.basics.name}
			</h1>
			<div class="statement" use:reveal style="--reveal-delay: 160ms">
				<p class="hero-summary">
					{data['personal-statement']}
				</p>
			</div>

			<div class="hero-meta" use:reveal style="--reveal-delay: 240ms">
				<span class="meta-item">
					<EnvelopeIcon />
					{data.basics.email}
				</span>
				<a class="meta-item" href={data.basics.url} target="_blank" rel="noopener noreferrer">
					<GithubIcon />
					{prettifyUrl(data.basics.url)}
				</a>
				<span class="meta-item">
					<LocationIcon />
					{data.basics.location.address}
				</span>
			</div>

			<div class="hero-actions" use:reveal style="--reveal-delay: 320ms">
				<a href="/intro" class="btn primary">
					More about me
					<ArrowRightIcon />
				</a>
				<a href="/contact" class="btn ghost">
					<EnvelopeIcon />
					Get in touch
				</a>
			</div>
		</div>
	</section>

	<!-- Quick stats -->
	{#if achievementCount}
		<section class="stats">
			<StatBlock value="Top 10" label="CyberGame Kenya 2026" revealDelay={0} />
			<StatBlock value="3rd" label="Connected Africa CTF 2026" revealDelay={80} />
			<StatBlock value="2x" label="CyberGame finalist" revealDelay={160} />
			<StatBlock value="5+" label="Certificates earned" revealDelay={240} />
		</section>
	{/if}

	<!-- Recent experience -->
	{#if data.work && data.work.length > 0}
		<SectionHeading index="01" title="Recent experience" meta={`${data.work.length} roles`}>
			A snapshot of where I have been working. The full history lives on the experience page.
		</SectionHeading>
		<div class="stack">
			{#each data.work.slice(0, 2) as job, i}
				<Card revealDelay={i * 100}>
					<div class="job-head">
						<h3>{job.name}</h3>
						<span class="date">{formatDate(job.startDate)} to {formatDate(job.endDate)}</span>
					</div>
					<p class="position">{job.position}</p>
					<ul class="highlights">
						{#each job.highlights.slice(0, 3) as highlight}
							<li>{highlight}</li>
						{/each}
					</ul>
				</Card>
			{/each}
		</div>
		<a href="/experience" class="view-more" use:reveal>
			View all experience
			<ArrowRightIcon />
		</a>
	{/if}

	<!-- Education -->
	{#if data.education && data.education.length > 0}
		<SectionHeading index="02" title="Education" meta={`${data.education.length} entries`}>
			Academic background and training.
		</SectionHeading>
		<div class="stack">
			{#each data.education as edu, i}
				<Card revealDelay={i * 100}>
					<div class="job-head">
						<h3>{edu.institution}</h3>
						{#if edu.startDate && edu.endDate}
							<span class="date">{formatDate(edu.startDate)} to {formatDate(edu.endDate)}</span>
						{/if}
					</div>
					<p class="position">{edu.area} ({edu.studyType})</p>
					{#if edu.score}<p class="score">{edu.score}</p>{/if}
				</Card>
			{/each}
		</div>
	{/if}

	<!-- Key skills -->
	<SectionHeading index="03" title="Key skills" meta="Top categories">
		The tools and techniques I reach for most often.
	</SectionHeading>
	<div class="skills-grid">
		{#each data.skills.slice(0, 4) as skill, i}
			<Card revealDelay={i * 80} class="skill-card">
				<h3 class="skill-name">{skill.name}</h3>
				<div class="tags">
					{#each skill.keywords.slice(0, 4) as keyword}
						<Tag>{keyword}</Tag>
					{/each}
					{#if skill.keywords.length > 4}
						<Tag>+{skill.keywords.length - 4} more</Tag>
					{/if}
				</div>
			</Card>
		{/each}
	</div>
	<a href="/skills" class="view-more" use:reveal>
		View all skills
		<ArrowRightIcon />
	</a>

	<!-- Achievements -->
	{#if data.achievements && data.achievements.length > 0}
		<SectionHeading index="04" title="Recent achievements" meta={`${achievementCount} total`}>
			Competition results and recognition from security work.
		</SectionHeading>
		<div class="stack">
			{#each data.achievements.slice(0, 3) as achievement, i}
				<Card revealDelay={i * 80} class="achievement-card">
					<span class="achievement-icon"><TrophyIcon /></span>
					<div class="achievement-text">
						{@html stripMd(achievement)}
						{#if achievement.source}
							<a
								href={achievement.source}
								target="_blank"
								rel="noopener noreferrer"
								class="source-link"
								title={prettifyUrl(achievement.source)}
							>
								<LinkIcon />
							</a>
						{/if}
					</div>
				</Card>
			{/each}
		</div>
		<a href="/achievements" class="view-more" use:reveal>
			View all achievements
			<ArrowRightIcon />
		</a>
	{/if}

	<!-- Awards -->
	{#if data.awards && data.awards.length > 0}
		<SectionHeading index="05" title="Awards">
			Formal recognition with the full story behind each one.
		</SectionHeading>
		<div class="stack">
			{#each data.awards as award, i}
				<Card revealDelay={i * 80}>
					<div class="job-head">
						<h3>{award.title}</h3>
						{#if award.date}<span class="date">{formatDate(award.date)}</span>{/if}
					</div>
					<p class="position">{award.summary}</p>
				</Card>
			{/each}
		</div>
	{/if}

	<!-- Certificates -->
	<SectionHeading index="06" title="Certificates">
		Continuous learning through professional certifications and specialized training.
	</SectionHeading>
	<a href="/certificates" class="cert-cta" use:reveal>
		<span class="cert-icon"><ShieldIcon /></span>
		<span class="cert-copy">
			<strong>5+ certificates earned between {certStartYear} and {currentYear}</strong>
			<span>Browse the full gallery with verification links.</span>
		</span>
		<ArrowRightIcon />
	</a>
</div>

<style lang="scss">
	.home {
		position: relative;
	}

	/* ============ Hero ============ */
	.hero {
		position: relative;
		padding: var(--space-2xl) var(--space-2xl) var(--space-xl);
		overflow: hidden;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		background: var(--glass-soft);
		backdrop-filter: blur(14px) saturate(135%);
		-webkit-backdrop-filter: blur(14px) saturate(135%);
		box-shadow: var(--shadow-lg), inset 0 1px 0 var(--glass-highlight);
		margin-bottom: var(--space-xl);

		@media (max-width: 600px) {
			padding: var(--space-xl) var(--space-lg);
		}
	}

	.hero-inner {
		position: relative;
		max-width: 52rem;
	}

	.focus-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.focus-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.45rem 0.9rem;
		border: 1px solid var(--border-color-accent);
		border-radius: var(--radius-full);
		background: var(--accent-transparent);
		backdrop-filter: blur(10px) saturate(130%);
		-webkit-backdrop-filter: blur(10px) saturate(130%);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		letter-spacing: 0.04em;
		color: var(--accent);
		transition: all var(--transition-base);

		&:hover {
			background: var(--accent-transparent-hover);
			box-shadow: var(--glow-effect);
		}

		:global(svg) {
			width: 0.85rem;
			height: 0.85rem;
			flex-shrink: 0;
		}
	}

	.hero-title {
		font-size: clamp(2.75rem, 8vw, 5rem);
		font-weight: 700;
		letter-spacing: var(--tracking-display);
		line-height: 1.02;
		margin: var(--space-lg) 0 var(--space-md);
	}

	.statement {
		padding: var(--space-md) var(--space-lg);
		border: 1px solid var(--border-color);
		border-left: 3px solid var(--accent);
		border-radius: 0 var(--radius-md) var(--radius-md) 0;
		background: linear-gradient(90deg, var(--accent-transparent), transparent 75%);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.hero-summary {
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--text-color-secondary);
		max-width: 64ch;
		white-space: pre-line;
	}

	.hero-meta {
		margin-top: var(--space-lg);
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm) var(--space-lg);
	}

	.meta-item {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-color-secondary);
		text-decoration: none;

		:global(svg) {
			width: 0.95rem;
			height: 0.95rem;
			color: var(--accent);
			flex-shrink: 0;
		}

		&:hover {
			color: var(--accent);
		}
	}

	.hero-actions {
		margin-top: var(--space-xl);
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.7rem 1.25rem;
		border-radius: var(--radius-md);
		font-size: var(--font-size-sm);
		font-weight: 600;
		text-decoration: none;
		transition: all var(--transition-base);

		:global(svg) {
			width: 0.95rem;
			height: 0.95rem;
			transition: transform var(--transition-fast);
		}
	}

	.btn.primary {
		background: var(--accent);
		color: var(--background);

		&:hover {
			background: var(--accent-dim);
			color: var(--background);
			transform: translateY(-2px);
			box-shadow: var(--shadow-colored);

			:global(svg) {
				transform: translateX(3px);
			}
		}
	}

	.btn.ghost {
		border: 1px solid var(--border-color-light);
		color: var(--text-color);

		&:hover {
			border-color: var(--border-color-accent);
			background: var(--accent-transparent);
			color: var(--accent);
		}
	}

	/* ============ Stats ============ */
	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
		gap: var(--space-md);
		margin-bottom: var(--space-xl);
	}

	/* ============ Content stacks ============ */
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.job-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-md);
		flex-wrap: wrap;

		h3 {
			font-size: var(--font-size-lg);
			letter-spacing: var(--tracking-tight);
		}
	}

	.date {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-muted);
		white-space: nowrap;
	}

	.position {
		font-size: var(--font-size-sm);
		font-weight: 500;
		color: var(--accent);
	}

	.score {
		font-size: var(--font-size-sm);
		color: var(--text-color-dim);
	}

	.highlights {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;

		li {
			position: relative;
			padding-left: 1.125rem;
			color: var(--text-color-secondary);
			font-size: var(--font-size-sm);
			line-height: var(--line-height-normal);

			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 0.55em;
				width: 0.4rem;
				height: 1px;
				background: var(--accent);
			}
		}
	}

	/* ============ Skills ============ */
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		gap: var(--space-md);
		margin-bottom: var(--space-md);
	}

	.skill-name {
		font-size: var(--font-size-base);
		letter-spacing: var(--tracking-tight);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	/* ============ Achievements ============ */
	:global(.achievement-card) {
		flex-direction: row;
		align-items: flex-start;
		gap: var(--space-md);
	}

	.achievement-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: var(--radius-md);
		background: var(--accent-transparent);
		color: var(--accent);
		flex-shrink: 0;

		:global(svg) {
			width: 1rem;
			height: 1rem;
		}
	}

	.achievement-text {
		font-size: var(--font-size-sm);
		color: var(--text-color-secondary);
		line-height: var(--line-height-normal);

		:global(strong) {
			color: var(--text-color);
		}
	}

	.source-link {
		margin-left: 0.375rem;
		color: var(--text-color-muted);

		&:hover {
			color: var(--accent);
		}

		:global(svg) {
			width: 0.7rem;
			height: 0.7rem;
		}
	}

	/* ============ View more links ============ */
	.view-more {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: var(--space-md);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--accent);
		text-decoration: none;

		:global(svg) {
			width: 0.85rem;
			height: 0.85rem;
			transition: transform var(--transition-fast);
		}

		&:hover {
			:global(svg) {
				transform: translateX(4px);
			}
		}
	}

	/* ============ Certificates CTA ============ */
	.cert-cta {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
		padding: var(--space-lg);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		background: var(--surface);
		text-decoration: none;
		color: inherit;
		transition: all var(--transition-base);

		&:hover {
			border-color: var(--border-color-accent);
			background: var(--surface-elevated);
			transform: translateY(-2px);
			box-shadow: var(--shadow-colored);
		}

		.cert-icon {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 2.75rem;
			height: 2.75rem;
			border-radius: var(--radius-md);
			background: var(--accent-transparent);
			color: var(--accent);
			flex-shrink: 0;

			:global(svg) {
				width: 1.25rem;
				height: 1.25rem;
			}
		}

		.cert-copy {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			flex: 1;

			strong {
				color: var(--text-color);
				font-size: var(--font-size-base);
			}

			span {
				color: var(--text-color-dim);
				font-size: var(--font-size-sm);
			}
		}

		& > :global(svg) {
			width: 1rem;
			height: 1rem;
			color: var(--accent);
			flex-shrink: 0;
		}
	}
</style>
