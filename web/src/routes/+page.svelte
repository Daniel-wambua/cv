<script lang="ts">
	import ArrowRightIcon from '~icons/fa6-solid/arrow-right';
	import ArrowUpRightIcon from '~icons/fa6-solid/arrow-up-right-from-square';
	import GithubIcon from '~icons/fa6-brands/github';

	interface Project {
		name: string;
		description: string;
		url?: string;
		github?: string;
		language?: string;
	}

	interface Experience {
		name: string;
		position: string;
		startDate?: string;
		endDate?: string;
		highlights?: string[];
	}

	interface SkillGroup {
		name: string;
		keywords?: string[];
	}

	interface Achievement {
		text: string;
		source?: string;
	}

	interface Education {
		institution: string;
		studyType?: string;
		area?: string;
	}

	interface ResumeData {
		basics?: {
			name?: string;
			email?: string;
			location?: { address?: string };
		};
		'personal-statement'?: string;
		projects?: Project[];
		work?: Experience[];
		skills?: SkillGroup[];
		achievements?: Achievement[];
		education?: Education[];
	}

	export let data: ResumeData;

	$: name = data?.basics?.name ?? 'Daniel Wambua';
	$: email = data?.basics?.email ?? 'havocxsec@proton.me';
	$: location = data?.basics?.location?.address ?? 'Nairobi, Kenya';
	$: summary =
		data?.['personal-statement'] ??
		'Cybersecurity-focused IT student exploring practical security, software, and research.';
	$: projects = Array.isArray(data?.projects) ? (data.projects as Project[]) : [];
	$: experience = Array.isArray(data?.work) ? (data.work as Experience[]) : [];
	$: skills = Array.isArray(data?.skills) ? data.skills : [];
	$: achievements = Array.isArray(data?.achievements) ? data.achievements : [];
	$: education = Array.isArray(data?.education) ? data.education : [];

	const repositoryUrl = (repository: string) =>
		repository.startsWith('http') ? repository : `https://github.com/${repository}`;

	const plainText = (value: string) => value.replace(/\*\*/g, '');

	const formatDate = (date: string) => {
		if (!date) return '';
		if (date.toLowerCase() === 'present') return 'Present';
		const match = date.match(/^(\d{4})-(\d{2})$/);
		if (!match) return date;
		const month = Number(match[2]) - 1;
		return `${new Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(2000, month, 1))} ${match[1]}`;
	};
</script>

<svelte:head>
	<title>Daniel Wambua | Cybersecurity &amp; Software</title>
	<meta
		name="description"
		content="Daniel Wambua is an IT student focused on practical cybersecurity, secure software, CTFs, and security research."
	/>
</svelte:head>

<div class="home">
	<section class="hero" aria-labelledby="home-title">
		<div class="hero-copy">
			<h1 id="home-title">{name}</h1>
			<p class="hero-summary">{summary}</p>
			<div class="hero-meta">
				<span>{location}</span>
				<span>Open to security roles</span>
				<a href="https://github.com/Daniel-wambua" target="_blank" rel="noopener noreferrer">
					GitHub <ArrowUpRightIcon />
				</a>
			</div>
			<div class="hero-actions">
				<a class="button primary" href="/work">Explore my work <ArrowRightIcon /></a>
				<a class="button secondary" href="/download">View resume</a>
				<a class="text-link" href={`mailto:${email}`}>Get in touch</a>
			</div>
		</div>
		<figure class="hero-visual">
			<img
				src="/profile-picture.webp"
				alt="Daniel Wambua"
				width="600"
				height="563"
				fetchpriority="high"
			/>
		</figure>
	</section>

	<section class="intro-strip" aria-label="Professional focus">
		<p class="eyebrow">About</p>
		<p>
			I’m an Information Technology student drawn to how software can be made safer. My work spans
			hands-on security practice, open-source projects, and technical writing.
		</p>
		<a href="/intro">More about me <ArrowRightIcon /></a>
	</section>

	{#if projects.length}
		<section class="section" aria-labelledby="work-heading">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Selected work</p>
					<h2 id="work-heading">Tools and projects.</h2>
				</div>
				<a class="section-link" href="/work">Selected projects <ArrowRightIcon /></a>
			</div>
			<div class="project-grid">
				{#each projects.slice(0, 3) as project, index (project.name)}
					<article class:featured={index === 0} class="project-card">
						{#if project.language}
							<p class="project-kicker">
								{#if project.language}<span>{project.language}</span>{/if}
							</p>
						{/if}
						<h3>{project.name}</h3>
						<p>{project.description}</p>
						<div class="project-links">
							{#if project.url}
								<a href={project.url} target="_blank" rel="noopener noreferrer">
									Visit <ArrowUpRightIcon />
								</a>
							{/if}
							{#if project.github}
								<a href={repositoryUrl(project.github)} target="_blank" rel="noopener noreferrer">
									<GithubIcon /> Source
								</a>
							{/if}
						</div>
					</article>
				{/each}
			</div>
			<a
				class="repository-link"
				href="https://github.com/Daniel-wambua?tab=repositories"
				target="_blank"
				rel="noopener noreferrer"
			>
				Explore all GitHub repositories <ArrowUpRightIcon />
			</a>
		</section>
	{/if}

	{#if achievements.length}
		<section class="section recognition" aria-labelledby="recognition-heading">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Recognition</p>
					<h2 id="recognition-heading">Competition results.</h2>
				</div>
				<a class="section-link" href="/achievements">Achievements <ArrowRightIcon /></a>
			</div>
			<div class="recognition-list">
				{#each achievements.slice(0, 3) as achievement (achievement.text ?? achievement)}
					<div class="recognition-item">
						<p>{plainText(achievement.text ?? String(achievement))}</p>
						{#if achievement.source}
							<a
								href={achievement.source}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="View achievement source"
							>
								<ArrowUpRightIcon />
							</a>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if experience.length}
		<section class="section experience-preview" aria-labelledby="experience-heading">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Experience</p>
					<h2 id="experience-heading">Experience.</h2>
				</div>
				<a class="section-link" href="/experience">Full experience <ArrowRightIcon /></a>
			</div>
			<div class="experience-list">
				{#each experience.slice(0, 2) as role (`${role.name}-${role.position}`)}
					<article class="experience-item">
						<div>
							<h3>{role.position}</h3>
							<p>{role.name}</p>
						</div>
						<span>{formatDate(role.startDate ?? '')} – {formatDate(role.endDate ?? '')}</span>
					</article>
				{/each}
			</div>
		</section>
	{/if}

	<section class="section about-grid">
		<div>
			<p class="eyebrow">Focus</p>
			<h2>Security and software.</h2>
			<p class="about-copy">
				I’m interested in application and web security, offensive security practice, and building
				tools that make technical work clearer. I value careful research, readable software, and
				sharing what I learn.
			</p>
			<a class="section-link" href="/skills">Explore skills <ArrowRightIcon /></a>
		</div>
		{#if skills.length}
			<div class="skill-preview">
				{#each skills.slice(0, 4) as group (group.name)}
					<div class="skill-row">
						<h3>{group.name}</h3>
						<div class="skill-tags">
							{#each (group.keywords ?? []).slice(0, 5) as skill (skill)}
								<span>{skill}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>

	{#if education.length}
		<section class="education-strip">
			<div>
				<p class="eyebrow">Currently studying</p>
				<h2>{education[0].institution}</h2>
			</div>
			<p>{education[0].studyType} · {education[0].area}</p>
			<a href="/experience">Education &amp; experience <ArrowRightIcon /></a>
		</section>
	{/if}

	<section class="contact-cta">
		<p class="eyebrow">Contact</p>
		<h2>Open to security roles and collaborations.</h2>
		<p>Reach out about a role, a project, or a technical question.</p>
		<a class="button primary" href="/contact">Get in touch <ArrowRightIcon /></a>
	</section>
</div>

<style lang="scss">
	.home {
		padding-top: clamp(2.5rem, 7vw, 5.5rem);
	}

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		align-items: center;
		gap: clamp(2rem, 6vw, 5rem);
		padding-bottom: clamp(3rem, 7vw, 5rem);
	}

	.hero-copy {
		max-width: 38rem;
	}

	.hero h1 {
		max-width: 8ch;
		font-size: clamp(3.2rem, 7.6vw, 6rem);
		line-height: 0.99;
		text-wrap: balance;
	}

	.hero-summary {
		max-width: 55ch;
		margin-top: 1.5rem;
		font-size: clamp(1.05rem, 2vw, 1.22rem);
		line-height: 1.7;
		white-space: pre-line;
	}

	.hero-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.3rem;
		margin-top: 1.25rem;
		color: var(--text-color-dim);
		font-size: var(--font-size-sm);

		span:nth-child(2) {
			color: var(--accent);
			font-weight: 600;
		}

		a {
			display: inline-flex;
			align-items: center;
			gap: 0.4rem;
		}

		:global(svg) {
			width: 0.75rem;
			height: 0.75rem;
		}
	}

	.hero-visual {
		min-width: 0;
		margin: 0;

		img {
			width: 100%;
			aspect-ratio: 1 / 1;
			object-fit: cover;
			object-position: center 32%;
			border-radius: var(--radius-xl);
			animation: proof-reveal 850ms cubic-bezier(0.16, 1, 0.3, 1) both;
		}
	}

	@keyframes proof-reveal {
		from {
			clip-path: inset(0 0 12% 0);
			filter: saturate(0.75);
			transform: scale(1.025);
		}
		to {
			clip-path: inset(0);
			filter: saturate(1);
			transform: scale(1);
		}
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.65rem 1rem;
		margin-top: 1.75rem;
	}

	.button {
		display: inline-flex;
		min-height: 2.85rem;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		padding: 0.7rem 1.1rem;
		border: 1px solid transparent;
		border-radius: var(--radius-full);
		font-size: 0.9rem;
		font-weight: 600;
		transition:
			transform var(--transition-fast),
			background var(--transition-fast),
			border-color var(--transition-fast);

		:global(svg) {
			width: 0.8rem;
			height: 0.8rem;
			transition: transform var(--transition-fast);
		}

		&:hover {
			transform: translateY(-1px);

			:global(svg) {
				transform: translateX(2px);
			}
		}
	}

	.button.primary {
		background: var(--accent);
		color: var(--background-elevated);

		&:hover {
			background: var(--accent-dim);
			color: var(--background-elevated);
		}
	}

	.button.secondary {
		border-color: var(--border-color-light);
		color: var(--text-color);

		&:hover {
			border-color: var(--border-color-accent);
			background: var(--surface);
		}
	}

	.text-link {
		padding: 0.5rem 0.25rem;
		font-size: var(--font-size-sm);
		font-weight: 550;
	}

	.intro-strip {
		display: grid;
		grid-template-columns: minmax(10rem, 0.6fr) minmax(0, 1.4fr) auto;
		align-items: start;
		gap: 1rem 2rem;
		padding: 1.6rem 0;
		border-top: 1px solid var(--border-color);
		border-bottom: 1px solid var(--border-color);

		.eyebrow {
			margin: 0.25rem 0 0;
		}

		p:not(.eyebrow) {
			max-width: 62ch;
			font-size: 1rem;
		}

		a {
			display: inline-flex;
			align-items: center;
			gap: 0.45rem;
			font-size: var(--font-size-sm);
			font-weight: 600;
			white-space: nowrap;
		}

		:global(svg) {
			width: 0.8rem;
			height: 0.8rem;
		}
	}

	.section {
		padding: clamp(3.3rem, 8vw, 5.5rem) 0;
		border-bottom: 1px solid var(--border-color);
	}

	.section-heading {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1.5rem;
		margin-bottom: 1.6rem;

		.eyebrow {
			margin-bottom: 0.7rem;
		}

		h2 {
			max-width: 22ch;
			font-size: clamp(1.85rem, 4vw, 3rem);
		}
	}

	.section-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		flex-shrink: 0;
		padding: 0.5rem 0;
		font-size: var(--font-size-sm);
		font-weight: 600;

		:global(svg) {
			width: 0.8rem;
			height: 0.8rem;
		}
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.9rem;
	}

	.project-card {
		display: flex;
		min-height: 17rem;
		flex-direction: column;
		padding: clamp(1.2rem, 3vw, 1.8rem);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		background: var(--surface);
		transition:
			transform var(--transition-base),
			border-color var(--transition-base),
			box-shadow var(--transition-base);

		&:hover {
			transform: translateY(-2px);
			border-color: var(--border-color-accent);
			box-shadow: var(--shadow-md);
		}

		&.featured {
			grid-column: 1 / -1;
			min-height: 19rem;
			background:
				linear-gradient(125deg, var(--accent-transparent), transparent 58%), var(--surface);
		}

		h3 {
			margin-top: auto;
			padding-top: 2.8rem;
			font-size: clamp(1.4rem, 3vw, 2rem);
		}

		> p:not(.project-kicker) {
			max-width: 67ch;
			margin-top: 0.65rem;
			font-size: var(--font-size-sm);
		}
	}

	.project-kicker {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		color: var(--text-color-dim);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		text-transform: uppercase;
	}

	.repository-link {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		margin-top: 1.1rem;
		color: var(--text-color-secondary);
		font-size: var(--font-size-sm);
		font-weight: 600;

		:global(svg) {
			width: 0.75rem;
			height: 0.75rem;
		}

		&:hover {
			color: var(--accent);
		}
	}

	.project-links {
		display: flex;
		gap: 1rem;
		margin-top: 1.25rem;

		a {
			display: inline-flex;
			align-items: center;
			gap: 0.4rem;
			font-size: var(--font-size-xs);
			font-weight: 600;
		}

		:global(svg) {
			width: 0.75rem;
			height: 0.75rem;
		}
	}

	.recognition-list,
	.experience-list {
		border-top: 1px solid var(--border-color);
	}

	.recognition-item,
	.experience-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.05rem 0;
		border-bottom: 1px solid var(--border-color);
	}

	.recognition-item p {
		color: var(--text-color);
		font-size: var(--font-size-sm);
	}

	.recognition-item a {
		display: inline-grid;
		width: 2.2rem;
		height: 2.2rem;
		flex-shrink: 0;
		place-items: center;
		border: 1px solid var(--border-color);
		border-radius: 50%;

		:global(svg) {
			width: 0.8rem;
			height: 0.8rem;
		}
	}

	.experience-item h3 {
		font-size: 1rem;
		letter-spacing: -0.02em;
	}

	.experience-item p,
	.experience-item span {
		margin-top: 0.25rem;
		color: var(--text-color-dim);
		font-size: var(--font-size-xs);
	}

	.experience-item > span {
		flex-shrink: 0;
		font-family: var(--font-mono);
	}

	.about-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
		gap: clamp(2rem, 7vw, 5rem);

		h2 {
			max-width: 15ch;
			font-size: clamp(1.85rem, 4vw, 3rem);
		}
	}

	.about-copy {
		max-width: 48ch;
		margin: 1rem 0 1.2rem;
	}

	.skill-preview {
		border-top: 1px solid var(--border-color);
	}

	.skill-row {
		padding: 0.95rem 0;
		border-bottom: 1px solid var(--border-color);

		h3 {
			margin-bottom: 0.6rem;
			font-size: 0.9rem;
			letter-spacing: -0.01em;
		}
	}

	.skill-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;

		span {
			padding: 0.28rem 0.58rem;
			border: 1px solid var(--border-color);
			border-radius: var(--radius-full);
			color: var(--text-color-dim);
			font-size: var(--font-size-xs);
		}
	}

	.education-strip {
		display: grid;
		grid-template-columns: 1fr auto auto;
		align-items: center;
		gap: 1rem;
		padding: 1.4rem 0;
		border-bottom: 1px solid var(--border-color);

		.eyebrow {
			margin-bottom: 0.4rem;
		}

		h2 {
			font-size: 1.1rem;
			letter-spacing: -0.02em;
		}

		> p,
		> a {
			font-size: var(--font-size-xs);
		}

		> a {
			display: inline-flex;
			align-items: center;
			gap: 0.4rem;
			font-weight: 600;
		}

		:global(svg) {
			width: 0.75rem;
			height: 0.75rem;
		}
	}

	.contact-cta {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: clamp(3rem, 8vw, 5.5rem) 0 0;

		.eyebrow {
			margin-bottom: 0.8rem;
		}

		h2 {
			max-width: 18ch;
			font-size: clamp(2rem, 5vw, 3.5rem);
		}

		> p:not(.eyebrow) {
			max-width: 52ch;
			margin-top: 0.8rem;
		}

		.button {
			margin-top: 1.25rem;
		}
	}

	@media (max-width: 720px) {
		.hero {
			grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
			gap: 1.5rem;
		}

		.hero h1 {
			font-size: clamp(2.8rem, 9vw, 4.3rem);
		}

		.intro-strip {
			grid-template-columns: 1fr;
			gap: 0.65rem;
		}

		.intro-strip a {
			justify-self: start;
		}
	}

	@media (max-width: 560px) {
		.home {
			padding-top: 2.4rem;
		}

		.hero {
			grid-template-columns: minmax(0, 1fr);
			gap: 2rem;
			padding-bottom: 3rem;
		}

		.hero h1 {
			max-width: 10ch;
			font-size: clamp(3rem, 13vw, 4.2rem);
		}

		.hero-visual img {
			aspect-ratio: 1.35 / 1;
		}

		.hero-actions {
			gap: 0.5rem;
		}

		.hero-actions .text-link {
			padding-left: 0.6rem;
		}

		.section-heading {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.5rem;
		}

		.project-grid {
			grid-template-columns: 1fr;
		}

		.project-card.featured {
			grid-column: auto;
		}

		.project-card {
			min-height: 15rem;
		}

		.about-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.education-strip {
			grid-template-columns: 1fr;
			align-items: start;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-visual img {
			animation: none;
		}
	}
</style>
