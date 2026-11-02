<script lang="ts">
	import PageHero from '$components/PageHero.svelte';
	import ArrowRightIcon from '~icons/fa6-solid/arrow-right';

	interface SkillGroup {
		name: string;
		keywords?: string[];
	}

	export let data: { skills?: SkillGroup[] };
	$: skillGroups = Array.isArray(data?.skills) ? data.skills : [];
</script>

<svelte:head>
	<title>Skills | Daniel Wambua</title>
	<meta
		name="description"
		content="A practical overview of Daniel Wambua's cybersecurity, software, and systems skills."
	/>
</svelte:head>

<div class="skills-page">
	<PageHero
		eyebrow="Skills"
		title="Tools and topics I work with."
		summary="A practical list drawn from my CV: technical areas, tools, and languages I use in study, projects, and security practice."
	/>

	{#if skillGroups.length}
		<div class="skills-list">
			{#each skillGroups as group, index (group.name)}
				<section class="skill-group" aria-labelledby={`skill-group-${index}`}>
					<div class="group-title">
						<span>{String(index + 1).padStart(2, '0')}</span>
						<h2 id={`skill-group-${index}`}>{group.name}</h2>
					</div>
					<ul>
						{#each group.keywords ?? [] as skill (skill)}
							<li>{skill}</li>
						{/each}
					</ul>
				</section>
			{/each}
		</div>
	{:else}
		<p class="empty-state">Skills are temporarily unavailable. Please check back soon.</p>
	{/if}

	<div class="skills-note">
		<p>
			This list reflects the current CV data and is not a proficiency score. For project context,
			see the selected work.
		</p>
		<a href="/work">Browse projects <ArrowRightIcon /></a>
	</div>
</div>

<style lang="scss">
	.skills-page {
		padding-top: clamp(2.5rem, 7vw, 5rem);
	}

	:global(.skills-page .page-hero) {
		padding-top: 0;
	}

	.skills-list {
		border-top: 1px solid var(--border-color);
	}

	.skill-group {
		display: grid;
		grid-template-columns: minmax(13rem, 0.8fr) minmax(0, 1.2fr);
		gap: 1.5rem;
		padding: 1.35rem 0;
		border-bottom: 1px solid var(--border-color);
	}

	.group-title {
		display: flex;
		align-items: baseline;
		gap: 0.8rem;

		span {
			color: var(--accent);
			font-family: var(--font-mono);
			font-size: var(--font-size-xs);
		}

		h2 {
			font-size: 1.05rem;
			letter-spacing: -0.02em;
		}
	}

	.skill-group ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin: 0;
		padding: 0;
		list-style: none;

		li {
			padding: 0.38rem 0.7rem;
			border: 1px solid var(--border-color);
			border-radius: var(--radius-full);
			background: var(--surface);
			color: var(--text-color-secondary);
			font-size: var(--font-size-sm);
		}
	}

	.skills-note {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		margin-top: 1.5rem;
		padding: 1.2rem 0;

		p {
			max-width: 58ch;
			font-size: var(--font-size-sm);
		}

		a {
			display: inline-flex;
			align-items: center;
			gap: 0.45rem;
			flex-shrink: 0;
			font-size: var(--font-size-sm);
			font-weight: 600;
		}

		:global(svg) {
			width: 0.8rem;
			height: 0.8rem;
		}
	}

	.empty-state {
		padding: 1.5rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		background: var(--surface);
	}

	@media (max-width: 640px) {
		.skill-group {
			grid-template-columns: 1fr;
			gap: 0.8rem;
		}

		.skills-note {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.7rem;
		}
	}
</style>
