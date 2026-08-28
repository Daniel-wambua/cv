<script lang="ts">
	import PageHero from '$components/PageHero.svelte';
	import SectionHeading from '$components/SectionHeading.svelte';
	import StatBlock from '$components/StatBlock.svelte';
	import Language from '$components/Language.svelte';
	import { reveal } from '$lib/actions/reveal';

	import BoltIcon from '~icons/fa6-solid/bolt';
	import PuzzleIcon from '~icons/fa6-solid/puzzle-piece';
	import MagnifierIcon from '~icons/fa6-solid/magnifying-glass';
	import UsersIcon from '~icons/fa6-solid/users';
	import RotateIcon from '~icons/fa6-solid/rotate';
	import LockIcon from '~icons/fa6-solid/lock';
	import InfoIcon from '~icons/fa6-solid/circle-info';
	import FolderIcon from '~icons/fa6-solid/folder-open';
	import ArrowUpRightIcon from '~icons/fa6-solid/arrow-up-right-from-square';

	export let data: any = {};

	const techStack = data.additionalData?.techStack || data.techStack || {};
	const techStackExtras = data.additionalData?.techStackExtras || data.techStackExtras || {};

	let totalTechnologies = 0;
	let totalProjects = 0;
	Object.values(techStack).forEach((category: any) => {
		totalTechnologies += category.length;
		category.forEach((tech: any) => {
			totalProjects += tech.projects.length;
		});
	});

	const softSkills = [
		{ name: 'Quick learner', description: 'Fast at picking up new concepts and technologies', icon: BoltIcon },
		{ name: 'Problem solver', description: 'Approaches challenges with a solution-oriented mindset', icon: PuzzleIcon },
		{ name: 'Attention to detail', description: 'Careful and thorough in all aspects of work', icon: MagnifierIcon },
		{ name: 'Team player', description: 'Comfortable working collaboratively in team environments', icon: UsersIcon },
		{ name: 'Adaptable', description: 'Flexible and able to adjust to changing requirements', icon: RotateIcon },
		{ name: 'Security focused', description: 'Prioritizes security best practices in development', icon: LockIcon }
	];

	const categoryInfo: Record<string, { name: string; description: string }> = {
		backend: { name: 'Backend', description: 'Server-side development and APIs' },
		frontend: { name: 'Frontend', description: 'UI and client-side frameworks' },
		mobile: { name: 'Mobile', description: 'iOS and Android development' },
		security: { name: 'Cybersecurity Tools', description: 'Penetration testing and security tooling' },
		other: { name: 'Other Technologies', description: 'DevOps, scripting, and tooling' }
	};
</script>

<svelte:head>
	<title>Daniel Wambua | Skills</title>
	<meta
		name="description"
		content="Technical skills of Daniel Wambua across cybersecurity tooling, backend and frontend
		development, and scripting, backed by public GitHub projects."
	/>
</svelte:head>

<section class="skills">
	<PageHero
		eyebrow="03 / Skills"
		title="Tools I work with"
		summary="A technology stack built through coursework, CTF competitions, and shipped projects. Every entry links back to public work."
	/>

	<div class="stats">
		<StatBlock value={totalTechnologies} label="Technologies" revealDelay={0} />
		<StatBlock value={totalProjects} label="Projects" revealDelay={80} />
		<StatBlock value={Object.keys(techStack).length} label="Categories" revealDelay={160} />
	</div>

	{#each Object.keys(techStack) as categoryKey, catIndex}
		<SectionHeading
			index={String(catIndex + 1).padStart(2, '0')}
			title={categoryInfo[categoryKey]?.name || categoryKey}
			meta={`${techStack[categoryKey].length} technologies`}
		>
			{categoryInfo[categoryKey]?.description || ''}
		</SectionHeading>

		<div class="tech-grid">
			{#each techStack[categoryKey] as tech, techIndex}
				<div class="tech-card" use:reveal style={`--reveal-delay: ${(catIndex * 4 + techIndex) * 60}ms`}>
					<div class="tech-head">
						<Language language={tech.language} />
						<span class="count">{tech.projects.length} project{tech.projects.length !== 1 ? 's' : ''}</span>
					</div>
					<ul class="projects">
						{#each tech.projects as project}
							<li>
								<a
									href="https://github.com/Daniel-wambua/{project.trim()}"
									target="_blank"
									rel="noopener noreferrer"
									title="View on GitHub"
								>
									<FolderIcon />
									<span>{project}</span>
									<ArrowUpRightIcon class="external" />
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	{/each}

	{#if techStackExtras && Object.keys(techStackExtras).length > 0}
		<SectionHeading title="Additional technologies">
			Working knowledge across adjacent areas.
		</SectionHeading>
		<div class="extras-grid">
			{#each Object.keys(techStackExtras) as extraCategory, index}
				<div class="extra-card" use:reveal style={`--reveal-delay: ${index * 80}ms`}>
					<h3>{extraCategory.charAt(0).toUpperCase() + extraCategory.slice(1)}</h3>
					<div class="extra-list">
						{#each techStackExtras[extraCategory] as tech}
							<Language language={tech} small={true} />
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<SectionHeading title="Working style">
		The habits behind the technical list.
	</SectionHeading>
	<div class="soft-grid">
		{#each softSkills as skill, index}
			<div class="soft-card" use:reveal style={`--reveal-delay: ${index * 60}ms`}>
				<span class="soft-icon"><svelte:component this={skill.icon} /></span>
				<h3>{skill.name}</h3>
				<p>{skill.description}</p>
			</div>
		{/each}
	</div>

	<div class="note" use:reveal>
		<InfoIcon />
		<p>
			<strong>Note:</strong>
			this list reflects public GitHub repositories and may not cover every technology and project I have worked with.
		</p>
	</div>
</section>

<style lang="scss">
	.skills {
		position: relative;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: var(--space-md);
		margin-bottom: var(--space-xl);
	}

	.tech-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
		gap: var(--space-md);
		margin-bottom: var(--space-lg);

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}
	}

	.tech-card {
		padding: var(--space-lg);
		background: var(--card-background);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		transition:
			border-color var(--transition-base),
			background var(--transition-base),
			transform var(--transition-base);

		&:hover {
			background: var(--card-background-hover);
			border-color: var(--border-color-accent);
			transform: translateY(-2px);
		}
	}

	.tech-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		padding-bottom: var(--space-sm);
		border-bottom: 1px solid var(--border-color);
		margin-bottom: var(--space-sm);
	}

	.count {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-muted);
		white-space: nowrap;
	}

	.projects {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;

		a {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.5rem 0.625rem;
			border: 1px solid var(--border-color);
			border-radius: var(--radius-sm);
			color: var(--text-color-secondary);
			font-family: var(--font-mono);
			font-size: var(--font-size-xs);
			text-decoration: none;
			transition: all var(--transition-fast);

			:global(svg) {
				width: 0.8rem;
				height: 0.8rem;
				color: var(--accent);
				flex-shrink: 0;
			}

			span {
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			:global(.external) {
				width: 0.7rem;
				height: 0.7rem;
				opacity: 0;
				transition: opacity var(--transition-fast);
			}

			&:hover {
				background: var(--accent-transparent);
				border-color: var(--border-color-accent);
				color: var(--accent);

				:global(.external) {
					opacity: 1;
				}
			}
		}
	}

	.extras-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
		gap: var(--space-md);
		margin-bottom: var(--space-lg);
	}

	.extra-card {
		padding: var(--space-lg);
		background: var(--card-background);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);

		h3 {
			font-size: var(--font-size-base);
			letter-spacing: var(--tracking-tight);
			margin-bottom: var(--space-sm);
		}
	}

	.extra-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.soft-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
		gap: var(--space-md);
		margin-bottom: var(--space-xl);
	}

	.soft-card {
		padding: var(--space-lg);
		background: var(--card-background);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		transition:
			border-color var(--transition-base),
			transform var(--transition-base);

		&:hover {
			border-color: var(--border-color-accent);
			transform: translateY(-2px);
		}

		h3 {
			font-size: var(--font-size-base);
			letter-spacing: var(--tracking-tight);
		}

		p {
			font-size: var(--font-size-sm);
			color: var(--text-color-dim);
		}
	}

	.soft-icon {
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

	.note {
		display: flex;
		align-items: flex-start;
		gap: var(--space-sm);
		padding: var(--space-md) var(--space-lg);
		border: 1px solid rgba(245, 185, 62, 0.25);
		border-left: 3px solid var(--warning);
		border-radius: var(--radius-md);
		background: rgba(245, 185, 62, 0.05);

		:global(svg) {
			width: 1rem;
			height: 1rem;
			color: var(--warning);
			margin-top: 0.2rem;
			flex-shrink: 0;
		}

		p {
			font-size: var(--font-size-sm);
			color: var(--text-color-secondary);
			line-height: var(--line-height-normal);
		}

		strong {
			color: var(--warning);
		}
	}
</style>
