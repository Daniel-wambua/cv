<script lang="ts">
	import PageHero from '$components/PageHero.svelte';
	import { reveal } from '$lib/actions/reveal';

	import CircleCheckIcon from '~icons/fa6-solid/circle-check';
	import ChevronRightIcon from '~icons/fa6-solid/chevron-right';

	export let data: { combinedJobData: any[] };
	const experience = data.combinedJobData;

	const formatDate = (date: string) => {
		if (!date?.match(/^\d{4}-\d{2}$/)) return date;
		const [year, month] = date.split('-');
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		return `${months[parseInt(month, 10) - 1]} ${year}`;
	};

	const formatRange = (range: string) => {
		const [start, end] = (range || '').split(' - ');
		if (!start) return range;
		return `${formatDate(start)} to ${formatDate(end)}`;
	};
</script>

<svelte:head>
	<title>Daniel Wambua | Experience</title>
	<meta
		name="description"
		content="Work experience of Daniel Wambua: security operations, technical support, and
		hands-on cybersecurity training across academic and professional environments."
	/>
</svelte:head>

<div class="experience">
	<PageHero
		eyebrow="02 / Experience"
		title="Where I have worked"
		summary="Roles in security operations, technical support, and student leadership. Each entry lists what I actually did, not just where I sat."
	/>

	<div class="timeline">
		{#each experience as job, index}
			<article class="job" use:reveal style={`--reveal-delay: ${index * 80}ms`}>
				<div class="job-head">
					<div class="job-id">
						<span class="index">{String(index + 1).padStart(2, '0')}</span>
						<div>
							<h2 class="position">{job.position}</h2>
							<h3 class="company">{job.company}</h3>
							<p class="duration">{formatRange(job.datesWorked)}</p>
						</div>
					</div>
					<span class="status">
						<CircleCheckIcon />
						Completed
					</span>
				</div>

				{#if job.responsibilities}
					<p class="overview">{job.responsibilities}</p>
				{/if}

				{#if job.highlights}
					<ul class="highlights">
						{#each job.highlights as highlight}
							<li>
								<ChevronRightIcon />
								<span>{highlight}</span>
							</li>
						{/each}
					</ul>
				{/if}

				{#if job.technologies && job.technologies.length > 0}
					<div class="tech">
						{#each job.technologies as technology}
							<span class="tech-item">{technology}</span>
						{/each}
					</div>
				{/if}
			</article>
		{/each}
	</div>
</div>

<style lang="scss">
	.experience {
		position: relative;
	}

	.timeline {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding-left: 1.5rem;

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 0.5rem;
			bottom: 0.5rem;
			width: 1px;
			background: linear-gradient(180deg, var(--border-color-lighter), var(--border-color));
		}
	}

	.job {
		position: relative;
		padding: var(--space-lg);
		background: var(--card-background);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		transition:
			border-color var(--transition-base),
			background var(--transition-base),
			transform var(--transition-base);

		&::before {
			content: '';
			position: absolute;
			left: -1.5rem;
			top: var(--space-lg);
			width: 9px;
			height: 9px;
			transform: translateX(-4px);
			border-radius: 50%;
			background: var(--background);
			border: 2px solid var(--accent);
		}

		&:hover {
			background: var(--card-background-hover);
			border-color: var(--border-color-accent);
			transform: translateY(-2px);
		}
	}

	.job-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-md);
		flex-wrap: wrap;
	}

	.job-id {
		display: flex;
		align-items: flex-start;
		gap: var(--space-md);
	}

	.index {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--accent);
		padding-top: 0.35rem;
	}

	.position {
		font-size: var(--font-size-xl);
		letter-spacing: var(--tracking-tight);
		line-height: 1.2;
	}

	.company {
		font-size: var(--font-size-base);
		color: var(--text-color-secondary);
		font-weight: 500;
		margin-top: 0.125rem;
	}

	.duration {
		margin-top: 0.25rem;
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-muted);
	}

	.status {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.3rem 0.75rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-full);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-dim);
		white-space: nowrap;

		:global(svg) {
			width: 0.75rem;
			height: 0.75rem;
			color: var(--accent);
		}
	}

	.overview {
		margin-top: var(--space-md);
		padding: var(--space-md);
		border-left: 2px solid var(--accent);
		background: var(--accent-transparent);
		border-radius: 0 var(--radius-md) var(--radius-md) 0;
		color: var(--text-color-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
	}

	.highlights {
		list-style: none;
		margin: var(--space-md) 0 0;
		padding: 0;

		li {
			display: flex;
			align-items: flex-start;
			gap: 0.625rem;
			padding: 0.5rem 0;
			border-bottom: 1px solid var(--border-color);
			color: var(--text-color-secondary);
			font-size: var(--font-size-sm);
			line-height: var(--line-height-normal);

			&:last-child {
				border-bottom: none;
				padding-bottom: 0;
			}

			:global(svg) {
				width: 0.7rem;
				height: 0.7rem;
				color: var(--accent);
				margin-top: 0.35rem;
				flex-shrink: 0;
			}
		}
	}

	.tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin-top: var(--space-md);
	}

	.tech-item {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-secondary);
		padding: 0.2rem 0.6rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--accent-transparent);
	}

	@media (max-width: 600px) {
		.timeline {
			padding-left: 1rem;
		}

		.job::before {
			left: -1rem;
		}
	}
</style>
