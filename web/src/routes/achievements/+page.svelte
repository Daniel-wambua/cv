<script lang="ts">
	import { achievementPhotos } from '$lib/config/certificates';
	import PageHero from '$components/PageHero.svelte';
	import ArrowRightIcon from '~icons/fa6-solid/arrow-right';
	import ArrowUpRightIcon from '~icons/fa6-solid/arrow-up-right-from-square';
	import TrophyIcon from '~icons/fa6-solid/trophy';

	interface Achievement {
		text: string;
		source?: string;
	}

	interface Award {
		title: string;
		summary: string;
		source?: string;
	}

	interface AchievementsData {
		achievements?: Achievement[];
		awards?: Award[];
	}

	export let data: AchievementsData;
	$: achievements = Array.isArray(data?.achievements) ? data.achievements : [];
	$: awards = Array.isArray(data?.awards) ? data.awards : [];

	const plainText = (text: string) => text.replace(/\*\*/g, '');
	const yearFor = (text: string) => text.match(/\b20\d{2}\b/)?.[0] ?? '';
</script>

<svelte:head>
	<title>Achievements | Daniel Wambua</title>
	<meta
		name="description"
		content="Competition results and recognition from Daniel Wambua's cybersecurity work, with links to supporting evidence."
	/>
</svelte:head>

<div class="achievements-page">
	<PageHero
		title="Cybersecurity achievements"
		summary="Placements in red-team and CTF events, plus team awards."
	/>

	{#if achievements.length}
		<section class="results" aria-labelledby="results-title">
			<div class="section-label">
				<p class="eyebrow">Competition results</p>
				<h2 id="results-title">Competition placements</h2>
			</div>
			<div class="result-list">
				{#each achievements as item, index (item.text ?? index)}
					<article class="result">
						<p>{plainText(item.text ?? String(item))}</p>
						{#if item.source}
							<a
								href={item.source}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="View source for this result"
							>
								<ArrowUpRightIcon />
							</a>
						{/if}
					</article>
				{/each}
			</div>
		</section>
	{/if}

	{#if awards.length}
		<section class="awards" aria-labelledby="awards-title">
			<div class="section-label">
				<p class="eyebrow">Recognition</p>
				<h2 id="awards-title">Awards</h2>
			</div>
			<div class="award-list">
				{#each awards as award (award.title)}
					<article class="award">
						<span class="award-icon" aria-hidden="true"><TrophyIcon /></span>
						<div>
							<div class="award-title">
								<h3>{award.title}</h3>
								{#if yearFor(award.title)}<span>{yearFor(award.title)}</span>{/if}
							</div>
							<p>{award.summary}</p>
							{#if award.source}
								<a href={award.source} target="_blank" rel="noopener noreferrer">
									Supporting source <ArrowUpRightIcon />
								</a>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</section>
	{/if}

	{#if achievementPhotos.length}
		<section class="photo-board" aria-labelledby="photo-board-title">
			<div class="section-label">
				<h2 id="photo-board-title">Hackathon gallery</h2>
				<p class="photo-intro">
					Photos from the Connected Africa CTF and Team Pwners red-team event.
				</p>
			</div>
			<div class="photo-grid">
				{#each achievementPhotos as photo (photo.file)}
					<figure class="photo-card">
						<img
							src={photo.image}
							alt={photo.alt}
							width={photo.width ?? 1200}
							height={photo.height ?? 800}
							loading="lazy"
							decoding="async"
						/>
						<figcaption>{photo.caption}</figcaption>
					</figure>
				{/each}
			</div>
		</section>
	{/if}

	<section class="next-steps" aria-label="Explore more">
		<div>
			<p class="eyebrow">Explore further</p>
			<h2>See the work behind the milestones.</h2>
		</div>
		<a href="/work">Browse selected projects <ArrowRightIcon /></a>
		<a href="/certificates">View certificates <ArrowRightIcon /></a>
		<a
			href="https://github.com/Daniel-wambua?tab=repositories"
			target="_blank"
			rel="noopener noreferrer"
		>
			All GitHub repositories <ArrowUpRightIcon />
		</a>
	</section>
</div>

<style lang="scss">
	.achievements-page {
		padding-top: clamp(2.5rem, 7vw, 5rem);
	}

	:global(.achievements-page .page-hero) {
		padding-top: 0;
	}

	.results,
	.awards {
		display: grid;
		grid-template-columns: minmax(12rem, 0.65fr) minmax(0, 1.35fr);
		gap: 1.5rem 2rem;
		padding: 2rem 0;
		border-top: 1px solid var(--border-color);
	}

	.section-label {
		.eyebrow {
			margin-bottom: 0.75rem;
		}

		h2 {
			font-size: clamp(1.5rem, 3vw, 2rem);
		}
	}

	.result-list,
	.award-list {
		border-top: 1px solid var(--border-color);
	}

	.result {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 2rem;
		align-items: center;
		gap: 0.75rem;
		min-height: 4.5rem;
		padding: 0.8rem 0;
		border-bottom: 1px solid var(--border-color);

		p {
			color: var(--text-color);
			font-size: var(--font-size-sm);
		}
	}

	.result a {
		display: inline-grid;
		width: 2rem;
		height: 2rem;
		place-items: center;
		border: 1px solid var(--border-color);
		border-radius: 50%;

		:global(svg) {
			width: 0.8rem;
			height: 0.8rem;
		}
	}

	.award {
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1fr);
		gap: 1rem;
		padding: 1.2rem 0;
		border-bottom: 1px solid var(--border-color);

		> div > p {
			margin-top: 0.45rem;
			font-size: var(--font-size-sm);
		}

		> div > a {
			display: inline-flex;
			align-items: center;
			gap: 0.4rem;
			margin-top: 0.65rem;
			font-size: var(--font-size-xs);
			font-weight: 600;
		}

		> div > a :global(svg) {
			width: 0.7rem;
			height: 0.7rem;
		}
	}

	.award-icon {
		display: inline-grid;
		width: 2.4rem;
		height: 2.4rem;
		place-items: center;
		border: 1px solid var(--border-color);
		border-radius: 50%;
		color: var(--accent);

		:global(svg) {
			width: 0.95rem;
			height: 0.95rem;
		}
	}

	.award-title {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;

		h3 {
			font-size: 1rem;
			letter-spacing: -0.02em;
		}

		span {
			flex-shrink: 0;
			color: var(--text-color-dim);
			font-family: var(--font-mono);
			font-size: var(--font-size-xs);
		}
	}

	.photo-board {
		padding: 2rem 0;
		border-top: 1px solid var(--border-color);
	}

	.photo-intro {
		max-width: 39ch;
		margin-top: 0.85rem;
		color: var(--text-color-dim);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-relaxed);
	}

	.photo-grid {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 0.35rem;
		margin-top: 1.2rem;
		padding: 0.35rem;
		border-radius: var(--radius-lg);
		background: var(--background-hover);
	}

	.photo-card {
		position: relative;
		grid-column: span 2;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		margin: 0;
		border-radius: var(--radius-sm);

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform var(--transition-medium);
		}

		&:nth-child(n + 4) {
			grid-column: span 3;
		}

		&:hover img {
			transform: scale(1.025);
		}

		figcaption {
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			padding: 1.7rem 0.7rem 0.55rem;
			background: linear-gradient(transparent, rgb(0 0 0 / 72%));
			color: #fff;
			font-size: var(--font-size-xs);
			line-height: 1.35;
		}
	}

	.next-steps {
		display: grid;
		grid-template-columns: 1fr auto auto auto;
		align-items: center;
		gap: 1rem 1.5rem;
		margin-top: 3rem;
		padding: 1.5rem 0;
		border-top: 1px solid var(--border-color);

		.eyebrow {
			margin-bottom: 0.55rem;
		}

		h2 {
			font-size: 1.25rem;
		}

		a {
			display: inline-flex;
			align-items: center;
			gap: 0.4rem;
			font-size: var(--font-size-sm);
			font-weight: 600;
			white-space: nowrap;
		}

		a :global(svg) {
			width: 0.75rem;
			height: 0.75rem;
		}
	}

	@media (max-width: 700px) {
		.results,
		.awards {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.next-steps {
			grid-template-columns: 1fr;
			align-items: start;
		}

		.photo-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			padding: 0.25rem;
			gap: 0.25rem;
		}

		.photo-card,
		.photo-card:nth-child(n + 4) {
			grid-column: span 1;
		}

		.photo-card:last-child:nth-child(odd) {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 430px) {
		.photo-card:last-child:nth-child(odd) {
			grid-column: 1 / -1;
			width: calc(50% - 0.125rem);
			justify-self: center;
		}
	}
</style>
