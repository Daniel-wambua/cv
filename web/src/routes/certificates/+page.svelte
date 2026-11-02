<script lang="ts">
	import PageHero from '$components/PageHero.svelte';
	import SectionHeading from '$components/SectionHeading.svelte';
	import StatBlock from '$components/StatBlock.svelte';
	import Tag from '$components/Tag.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { certificates, type Certificate } from '$lib/config/certificates';
	import { certificationBadges, type Badge } from '$lib/config/badges';

	import CircleCheckIcon from '~icons/fa6-solid/circle-check';
	import BullseyeIcon from '~icons/fa6-solid/bullseye';
	import XMarkIcon from '~icons/fa6-solid/xmark';
	import ExpandIcon from '~icons/fa6-solid/expand';
	import MagnifyPlusIcon from '~icons/fa6-solid/magnifying-glass-plus';
	import MagnifyMinusIcon from '~icons/fa6-solid/magnifying-glass-minus';
	import CompressIcon from '~icons/fa6-solid/compress';
	import ArrowRightIcon from '~icons/fa6-solid/arrow-right';
	import ShieldIcon from '~icons/fa6-solid/shield-halved';
	import CertificateIcon from '~icons/fa6-solid/certificate';
	import NetworkIcon from '~icons/fa6-solid/network-wired';
	import CloudIcon from '~icons/fa6-solid/cloud';
	import InboxIcon from '~icons/fa6-solid/inbox';

	// Certificate activity window: fixed start year, rolling end year
	const startYear = 2023;
	const currentYear = new Date().getFullYear();

	// Filter state
	let selectedSkill: string = 'all';

	// Get unique skills for filtering
	const allSkills: string[] = ['all', ...new Set(certificates.flatMap((cert) => cert.skills))];

	// Filtered certificates based on selected skill
	$: filteredCertificates =
		selectedSkill === 'all'
			? certificates
			: certificates.filter((cert) => cert.skills.includes(selectedSkill));

	// Lightbox state
	let selectedCertificate: Certificate | null = null;
	let selectedBadge: Badge | null = null;
	let unavailableCertificateImages: number[] = [];

	// Zoom state for the certificate lightbox
	let zoom = 1;
	const MIN_ZOOM = 1;
	const MAX_ZOOM = 4;
	const ZOOM_STEP = 0.25;

	const clampZoom = (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +value.toFixed(2)));
	const zoomIn = () => (zoom = clampZoom(zoom + ZOOM_STEP));
	const zoomOut = () => (zoom = clampZoom(zoom - ZOOM_STEP));
	const resetZoom = () => (zoom = 1);

	// Portals a fixed overlay out to <body>. main has backdrop-filter, which
	// creates a containing block and would otherwise clip position: fixed
	// children to the glass panel instead of the viewport.
	const portal = (node: HTMLElement) => {
		document.body.appendChild(node);
		return { destroy: () => node.remove() };
	};

	const openModal = (cert: Certificate) => {
		selectedCertificate = cert;
		resetZoom();
	};

	const closeModal = () => {
		selectedCertificate = null;
		resetZoom();
	};

	const openBadgeModal = (badge: Badge) => {
		selectedBadge = badge;
	};

	const closeBadgeModal = () => {
		selectedBadge = null;
	};

	const markCertificateImageUnavailable = (certificateId: number) => {
		if (!unavailableCertificateImages.includes(certificateId)) {
			unavailableCertificateImages = [...unavailableCertificateImages, certificateId];
		}
	};

	const createCertificateImageErrorHandler = (certificate: Certificate) => () =>
		markCertificateImageUnavailable(certificate.id);

	// Handle ESC key to close, plus lightbox zoom shortcuts
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeModal();
			closeBadgeModal();
		}
		if (!selectedCertificate) return;
		if (e.key === '+' || e.key === '=') zoomIn();
		if (e.key === '-' || e.key === '_') zoomOut();
		if (e.key === '0') resetZoom();
	};

	const handleWheel = (e: WheelEvent) => {
		if (e.deltaY < 0) zoomIn();
		else zoomOut();
	};

	const createBadgeKeydownHandler = (badge: Badge) => {
		return (e: KeyboardEvent) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				openBadgeModal(badge);
			}
		};
	};

	const upcoming = [
		{ name: 'Offensive Security Certified Professional (OSCP)', icon: ShieldIcon },
		{ name: 'Certified Ethical Hacker (CEH)', icon: CertificateIcon },
		{ name: 'CompTIA Security+', icon: NetworkIcon },
		{ name: 'AWS Security Specialty', icon: CloudIcon }
	];
</script>

<svelte:head>
	<title>Daniel Wambua | Certificates</title>
	<meta
		name="description"
		content="Professional cybersecurity certifications, training certificates, and competition
		credentials earned by Daniel Wambua in penetration testing, ethical hacking, and information security."
	/>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="certificates">
	<PageHero
		eyebrow="Certificates"
		title="Credentials, on record"
		summary="Certifications, training achievements, and competition credentials in cybersecurity and information technology. Click any card to open the certificate image in a lightbox with zoom controls."
	/>

	<div class="stats">
		<StatBlock value={certificates.length} label="Certificates" revealDelay={0} />
		<StatBlock value={allSkills.length - 1} label="Skills covered" revealDelay={80} />
		<StatBlock value={`${startYear} to ${currentYear}`} label="Active period" revealDelay={160} />
	</div>

	<!-- Filter -->
	<div class="filters" use:reveal>
		<span class="filter-label">Filter by skill</span>
		<div class="filter-buttons">
			{#each allSkills as skill (skill)}
				<button
					class="filter-btn"
					class:active={selectedSkill === skill}
					on:click={() => (selectedSkill = skill)}
				>
					{skill === 'all' ? 'All' : skill}
				</button>
			{/each}
		</div>
	</div>

	<!-- Certificates grid -->
	<div class="grid">
		{#each filteredCertificates as certificate, i (certificate.id)}
			<article
				class="certificate-card"
				use:reveal
				style={`--reveal-delay: ${Math.min(i, 8) * 60}ms`}
			>
				<div class="image-wrapper">
					{#if unavailableCertificateImages.includes(certificate.id)}
						<div class="image-unavailable" role="status">
							<span>Certificate image unavailable</span>
							<a
								href={`https://drive.google.com/file/d/${certificate.driveFileId}/view`}
								target="_blank"
								rel="noopener noreferrer"
							>
								Open in Google Drive
							</a>
						</div>
					{:else}
						<img
							src={certificate.image}
							alt={certificate.name}
							loading="lazy"
							on:error={() => markCertificateImageUnavailable(certificate.id)}
						/>
						<button
							class="image-overlay"
							type="button"
							on:click={() => openModal(certificate)}
							aria-label={`View full-size certificate: ${certificate.name}`}
						>
							<ExpandIcon />
							<span>View full-size</span>
						</button>
					{/if}
				</div>

				<div class="content">
					<div class="head">
						<h3>
							{certificate.name}
							{#if certificate.verified}
								<span class="verified" title="Verified certificate"><CircleCheckIcon /></span>
							{/if}
						</h3>
						<span class="date">{certificate.date}</span>
					</div>

					<p class="issuer">{certificate.issuer}</p>
					<p class="description">{certificate.description}</p>

					<div class="skills">
						{#each certificate.skills as skill (skill)}
							<Tag>{skill}</Tag>
						{/each}
					</div>

					<div class="footer">
						<span class="credential">ID {certificate.credentialId}</span>
						<span class="view-cta">
							View certificate
							<ArrowRightIcon />
						</span>
					</div>
				</div>
			</article>
		{/each}
	</div>

	{#if filteredCertificates.length === 0}
		<div class="empty" use:reveal>
			<InboxIcon />
			<p>No certificates found for the selected filter.</p>
		</div>
	{/if}

	<!-- Upcoming certifications -->
	<SectionHeading title="Upcoming certifications">
		Currently working toward these targets.
	</SectionHeading>
	<div class="upcoming">
		{#each upcoming as item, i (item.name)}
			<div class="upcoming-item" use:reveal style={`--reveal-delay: ${i * 70}ms`}>
				<svelte:component this={item.icon} />
				<span>{item.name}</span>
			</div>
		{/each}
	</div>

	<!-- Certification badges marquee -->
	<SectionHeading title="Certifications" meta="Earned and in progress">
		Click a badge for details.
	</SectionHeading>
	<div class="marquee" use:reveal>
		<div class="marquee-track">
			{#each [...certificationBadges, ...certificationBadges] as badge, i (i)}
				<div
					class="badge-item"
					class:earned={badge.earned}
					on:click={() => openBadgeModal(badge)}
					on:keydown={createBadgeKeydownHandler(badge)}
					role="button"
					tabindex="0"
				>
					<img src={badge.imageUrl} alt={badge.name} loading="lazy" />
					<span class="badge-name">{badge.name}</span>
					<span class="badge-status" class:is-target={!badge.earned}>
						{#if badge.earned}<CircleCheckIcon />{:else}<BullseyeIcon />{/if}
					</span>
				</div>
			{/each}
		</div>
	</div>
	<div class="legend">
		<span><CircleCheckIcon /> Earned</span>
		<span><BullseyeIcon /> In progress</span>
	</div>
</div>

<!-- Certificate lightbox: image only, with magnify controls -->
{#if selectedCertificate}
	<div
		class="lightbox-overlay"
		use:portal
		role="dialog"
		aria-modal="true"
		aria-label={selectedCertificate.name}
	>
		<div class="lightbox-topbar">
			<p class="lightbox-title">{selectedCertificate.name}</p>
			<button class="lightbox-btn" on:click={closeModal} aria-label="Close lightbox">
				<XMarkIcon />
			</button>
		</div>

		<div class="lightbox-stage" on:wheel|preventDefault={handleWheel}>
			{#if unavailableCertificateImages.includes(selectedCertificate.id)}
				<div class="lightbox-unavailable" role="status">
					<p>The certificate image is unavailable.</p>
					<a
						href={`https://drive.google.com/file/d/${selectedCertificate.driveFileId}/view`}
						target="_blank"
						rel="noopener noreferrer"
					>
						Open in Google Drive
					</a>
				</div>
			{:else}
				<img
					class="lightbox-image"
					src={selectedCertificate.image}
					alt={selectedCertificate.name}
					style={`transform: scale(${zoom})`}
					draggable="false"
					on:error={createCertificateImageErrorHandler(selectedCertificate)}
				/>
			{/if}
		</div>

		<div class="lightbox-toolbar" role="toolbar" aria-label="Zoom controls">
			<button
				class="lightbox-btn"
				on:click={zoomOut}
				disabled={zoom <= MIN_ZOOM}
				aria-label="Zoom out"
				title="Zoom out"
			>
				<MagnifyMinusIcon />
			</button>
			<span class="lightbox-zoom-label">{Math.round(zoom * 100)}%</span>
			<button
				class="lightbox-btn"
				on:click={zoomIn}
				disabled={zoom >= MAX_ZOOM}
				aria-label="Zoom in"
				title="Zoom in"
			>
				<MagnifyPlusIcon />
			</button>
			<span class="lightbox-divider" aria-hidden="true"></span>
			<button
				class="lightbox-btn"
				on:click={resetZoom}
				disabled={zoom === MIN_ZOOM}
				aria-label="Reset zoom"
				title="Reset zoom"
			>
				<CompressIcon />
			</button>
		</div>
	</div>
{/if}

<!-- Badge modal -->
{#if selectedBadge}
	<div class="modal-overlay" use:portal>
		<div class="badge-modal" role="dialog" aria-modal="true" aria-label={selectedBadge.name}>
			<button class="modal-close" on:click={closeBadgeModal} aria-label="Close modal">
				<XMarkIcon />
			</button>
			<img src={selectedBadge.imageUrl} alt={selectedBadge.name} />
			<div class="badge-modal-info">
				<h2>{selectedBadge.name}</h2>
				<span class="badge-modal-status" class:is-target={!selectedBadge.earned}>
					{#if selectedBadge.earned}
						<CircleCheckIcon /> Earned
					{:else}
						<BullseyeIcon /> In progress
					{/if}
				</span>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.certificates {
		position: relative;
	}

	/* ============ Stats ============ */
	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
		gap: var(--space-md);
		margin-bottom: var(--space-xl);
	}

	/* ============ Filters ============ */
	.filters {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-bottom: var(--space-lg);
	}

	.filter-label {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-color-muted);
	}

	.filter-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.filter-btn {
		padding: 0.3rem 0.75rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-full);
		background: transparent;
		color: var(--text-color-dim);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		transition: all var(--transition-fast);

		&:hover {
			color: var(--accent);
			border-color: var(--border-color-accent);
		}

		&.active {
			background: var(--accent);
			border-color: var(--accent);
			color: var(--background);
		}
	}

	/* ============ Grid ============ */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
		gap: var(--space-lg);
	}

	.certificate-card {
		display: flex;
		flex-direction: column;
		background: var(--card-background);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition:
			border-color var(--transition-base),
			transform var(--transition-base),
			box-shadow var(--transition-base);

		&:hover {
			border-color: var(--border-color-accent);
			transform: translateY(-3px);
			box-shadow: var(--shadow-colored);
		}
	}

	.image-wrapper {
		position: relative;
		aspect-ratio: 4 / 3;
		background: var(--surface-elevated);
		border-bottom: 1px solid var(--border-color);
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			padding: 0.55rem;
			object-fit: contain;
			object-position: center;
		}
	}

	.image-overlay {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		right: 0.7rem;
		bottom: 0.7rem;
		padding: 0.55rem 0.8rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-full);
		background: var(--surface-elevated);
		color: var(--accent);
		font-size: var(--font-size-xs);
		font-weight: 600;
		box-shadow: var(--shadow-sm);

		:global(svg) {
			width: 0.9rem;
			height: 0.9rem;
		}

		&:hover {
			border-color: var(--accent);
			background: var(--accent);
			color: var(--background-elevated);
		}
	}

	.image-unavailable {
		display: flex;
		height: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		padding: 1rem;
		color: var(--text-color-dim);
		font-size: var(--font-size-sm);
		text-align: center;
	}

	.image-unavailable a,
	.lightbox-unavailable a {
		font-weight: 600;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: var(--space-md) var(--space-lg) var(--space-lg);
	}

	.head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-sm);

		h3 {
			font-size: var(--font-size-base);
			letter-spacing: var(--tracking-tight);
			line-height: var(--line-height-normal);
			display: flex;
			align-items: baseline;
			gap: 0.375rem;
		}
	}

	.verified {
		display: inline-flex;
		color: var(--accent);

		:global(svg) {
			width: 0.85rem;
			height: 0.85rem;
		}
	}

	.date {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-muted);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.issuer {
		font-size: var(--font-size-sm);
		font-weight: 500;
		color: var(--accent);
	}

	.description {
		font-size: var(--font-size-sm);
		color: var(--text-color-dim);
		line-height: var(--line-height-normal);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.skills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		margin-top: var(--space-xs);
		padding-top: var(--space-sm);
		border-top: 1px solid var(--border-color);
	}

	.credential {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-muted);
	}

	.view-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--accent);

		:global(svg) {
			width: 0.7rem;
			height: 0.7rem;
		}
	}

	/* ============ Empty state ============ */
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-2xl);
		color: var(--text-color-muted);

		:global(svg) {
			width: 2rem;
			height: 2rem;
			opacity: 0.5;
		}
	}

	/* ============ Upcoming ============ */
	.upcoming {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--space-md);
	}

	.upcoming-item {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		padding: var(--space-md) var(--space-lg);
		border: 1px dashed var(--border-color-light);
		border-radius: var(--radius-md);
		color: var(--text-color-dim);
		font-size: var(--font-size-sm);
		transition: all var(--transition-base);

		&:hover {
			border-color: var(--border-color-accent);
			color: var(--text-color);
		}

		:global(svg) {
			width: 1.25rem;
			height: 1.25rem;
			color: var(--accent);
			flex-shrink: 0;
		}
	}

	/* ============ Badges marquee ============ */
	.marquee {
		overflow: hidden;
		position: relative;
		-webkit-mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent);
		mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent);
	}

	.marquee-track {
		display: flex;
		gap: var(--space-lg);
		width: max-content;
		padding: var(--space-xs) 0;
		animation: marquee 40s linear infinite;

		&:hover {
			animation-play-state: paused;
		}
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	.badge-item {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.625rem 1rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--surface);
		cursor: pointer;
		transition: all var(--transition-base);

		&:hover {
			border-color: var(--border-color-accent);
			background: var(--surface-elevated);
		}

		&.earned {
			border-color: var(--border-color-accent);
		}

		img {
			width: 2rem;
			height: 2rem;
			object-fit: contain;
		}
	}

	.badge-name {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-secondary);
		white-space: nowrap;
	}

	.badge-status {
		display: inline-flex;
		color: var(--accent);

		:global(svg) {
			width: 0.85rem;
			height: 0.85rem;
		}

		&.is-target {
			color: var(--warning);
		}
	}

	.legend {
		display: flex;
		gap: var(--space-lg);
		justify-content: center;
		margin-top: var(--space-md);

		span {
			display: inline-flex;
			align-items: center;
			gap: 0.375rem;
			font-family: var(--font-mono);
			font-size: var(--font-size-xs);
			color: var(--text-color-muted);

			:global(svg) {
				width: 0.75rem;
				height: 0.75rem;
				color: var(--accent);
			}
		}
	}

	/* ============ Modals ============ */
	.modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-lg);
		background: rgba(3, 5, 4, 0.85);
		backdrop-filter: blur(6px);
		animation: overlay-in 200ms ease-out;
	}

	@keyframes overlay-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes modal-in {
		from {
			opacity: 0;
			transform: translateY(16px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	.modal-close {
		position: absolute;
		top: var(--space-sm);
		right: var(--space-sm);
		z-index: 2;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--background);
		color: var(--text-color-secondary);

		:global(svg) {
			width: 1rem;
			height: 1rem;
		}

		&:hover {
			color: var(--accent);
			border-color: var(--border-color-accent);
		}
	}

	/* ============ Certificate lightbox ============ */
	.lightbox-overlay {
		position: fixed;
		inset: 0;
		z-index: 300;
		display: flex;
		flex-direction: column;
		background: rgba(3, 5, 4, 0.92);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		animation: overlay-in 200ms ease-out;
	}

	.lightbox-topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-lg);
		padding: var(--space-md) var(--space-lg);
	}

	.lightbox-title {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--text-color-secondary);
		letter-spacing: 0.02em;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.lightbox-stage {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: auto;
		padding: 0 var(--space-lg) var(--space-sm);
	}

	.lightbox-unavailable {
		padding: 2rem;
		text-align: center;

		p {
			margin-bottom: 0.8rem;
		}
	}

	.lightbox-image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-2xl);
		transform-origin: center center;
		transition: transform var(--transition-medium);
		user-select: none;
		-webkit-user-drag: none;
	}

	.lightbox-toolbar {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		padding: var(--space-md);
	}

	.lightbox-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border: 1px solid var(--border-color-light);
		border-radius: var(--radius-md);
		background: var(--glass-strong);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		color: var(--text-color-secondary);
		transition: all var(--transition-fast);

		:global(svg) {
			width: 1rem;
			height: 1rem;
		}

		&:hover:not(:disabled) {
			color: var(--accent);
			border-color: var(--border-color-accent);
			background: var(--accent-transparent);
		}

		&:disabled {
			opacity: 0.35;
			cursor: not-allowed;
		}
	}

	.lightbox-zoom-label {
		min-width: 3.5rem;
		text-align: center;
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--text-color-dim);
	}

	.lightbox-divider {
		width: 1px;
		height: 1.5rem;
		background: var(--border-color);
	}

	.badge-modal {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
		max-width: 28rem;
		padding: var(--space-xl);
		background: var(--glass-strong);
		backdrop-filter: blur(24px) saturate(150%);
		-webkit-backdrop-filter: blur(24px) saturate(150%);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		box-shadow:
			var(--shadow-2xl),
			inset 0 1px 0 var(--glass-highlight);
		animation: modal-in 250ms cubic-bezier(0.22, 1, 0.36, 1);

		img {
			width: 10rem;
			height: 10rem;
			object-fit: contain;
		}

		h2 {
			font-size: var(--font-size-xl);
			text-align: center;
		}
	}

	.badge-modal-status {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.35rem 0.875rem;
		border-radius: var(--radius-full);
		background: var(--accent-transparent);
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);

		&.is-target {
			background: rgba(245, 185, 62, 0.1);
			color: var(--warning);
		}

		:global(svg) {
			width: 0.8rem;
			height: 0.8rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
			flex-wrap: wrap;
			width: 100%;
		}

		.lightbox-image {
			transition: none;
		}
	}
</style>
