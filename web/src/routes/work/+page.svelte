<script lang="ts">
	import ArrowUpRightIcon from '~icons/fa6-solid/arrow-up-right-from-square';
	import GithubIcon from '~icons/fa6-brands/github';

	interface Project {
		name: string;
		description: string;
		url?: string;
		github?: string;
		language?: string;
	}

	export let data: { projects?: Project[] };

	$: projects = Array.isArray(data?.projects) ? data.projects : [];

	const repositoryUrl = (repository: string) =>
		repository.startsWith('http') ? repository : `https://github.com/${repository}`;
</script>

<svelte:head>
	<title>Selected work | Daniel Wambua</title>
	<meta
		name="description"
		content="Selected open-source software, security research, and CTF writing by Daniel Wambua."
	/>
</svelte:head>

<div class="work-page">
	<header class="page-intro">
		<p class="eyebrow">Selected work</p>
		<h1>Projects made to be explored.</h1>
		<p class="intro-copy">
			A selection of software, research notes, and security writing from my public work. Project
			details come from the same CV data used elsewhere on this site.
		</p>
	</header>

	{#if projects.length}
		<section class="projects" aria-label="Selected projects">
			{#each projects as project, index (project.name)}
				<article class:featured={index === 0} class="project">
					{#if project.language}
						<div class="project-topline"><span>{project.language}</span></div>
					{/if}
					<h2>{project.name}</h2>
					<p class="description">{project.description}</p>
					<div class="project-links">
						{#if project.url}
							<a href={project.url} target="_blank" rel="noopener noreferrer">
								Visit project <ArrowUpRightIcon />
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
		</section>
	{:else}
		<p class="empty-state">Project details are temporarily unavailable. Please check back soon.</p>
	{/if}

	<aside class="research-note">
		<p class="eyebrow">Further reading</p>
		<h2>Security notes and writeups</h2>
		<p>
			Research notes and published CTF writeups live on
			<a href="https://havocsec.dev" target="_blank" rel="noopener noreferrer">HavocSec.dev</a>. The
			project cards above are a selection; the full, current repository list lives on
			<a
				href="https://github.com/Daniel-wambua?tab=repositories"
				target="_blank"
				rel="noopener noreferrer">GitHub</a
			>.
		</p>
		<div class="research-links">
			<a
				href="https://havocsec.dev/pentesting/hackthebox/"
				target="_blank"
				rel="noopener noreferrer"
			>
				Security research <ArrowUpRightIcon />
			</a>
			<a href="https://havocsec.dev/ctf/" target="_blank" rel="noopener noreferrer">
				CTF writeups <ArrowUpRightIcon />
			</a>
		</div>
	</aside>
</div>

<style lang="scss">
	.work-page {
		padding-top: clamp(2.5rem, 7vw, 5rem);
	}

	.page-intro {
		max-width: 52rem;
		margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
	}

	.eyebrow {
		margin-bottom: 1.1rem;
	}

	h1 {
		max-width: 12ch;
		font-size: clamp(2.8rem, 8vw, 5.2rem);
	}

	.intro-copy {
		max-width: 56ch;
		margin-top: 1.35rem;
		font-size: clamp(1.05rem, 2vw, 1.2rem);
	}

	.projects {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.project {
		display: flex;
		min-height: 18rem;
		flex-direction: column;
		padding: clamp(1.25rem, 3vw, 2rem);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		background: var(--surface);
		transition:
			transform var(--transition-base),
			border-color var(--transition-base),
			box-shadow var(--transition-base);

		&:hover {
			transform: translateY(-3px);
			border-color: var(--border-color-accent);
			box-shadow: var(--shadow-md);
		}

		&.featured {
			grid-column: 1 / -1;
			min-height: 21rem;
			background:
				linear-gradient(125deg, var(--accent-transparent), transparent 52%), var(--surface);
		}
	}

	.project-topline {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		color: var(--text-color-dim);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.project h2 {
		margin-top: auto;
		padding-top: 3rem;
		font-size: clamp(1.6rem, 3vw, 2.4rem);
	}

	.description {
		max-width: 60ch;
		margin-top: 0.8rem;
	}

	.project-links,
	.research-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem 1.25rem;
		margin-top: 1.5rem;

		a {
			display: inline-flex;
			align-items: center;
			gap: 0.45rem;
			font-size: var(--font-size-sm);
			font-weight: 600;
		}

		:global(svg) {
			width: 0.85rem;
			height: 0.85rem;
		}
	}

	.research-note {
		display: grid;
		grid-template-columns: minmax(12rem, 0.8fr) minmax(0, 1.2fr);
		gap: 0.75rem 2rem;
		margin-top: clamp(3rem, 8vw, 6rem);
		padding: clamp(1.25rem, 4vw, 2.25rem) 0;
		border-top: 1px solid var(--border-color);

		.eyebrow {
			grid-column: 1 / -1;
		}

		h2 {
			font-size: clamp(1.4rem, 3vw, 2rem);
		}

		> p:not(.eyebrow) {
			max-width: 55ch;
		}
	}

	.research-links {
		grid-column: 2;
		margin-top: 0.5rem;
	}

	.empty-state {
		padding: 2rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		background: var(--surface);
	}

	@media (max-width: 640px) {
		.projects {
			grid-template-columns: 1fr;
		}

		.project.featured {
			grid-column: auto;
		}

		.project {
			min-height: 16rem;
		}

		.research-note {
			grid-template-columns: 1fr;

			.eyebrow {
				grid-column: 1;
			}
		}

		.research-links {
			grid-column: 1;
		}
	}
</style>
