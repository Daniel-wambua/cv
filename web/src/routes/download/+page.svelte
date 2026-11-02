<script lang="ts">
	import DownloadIcon from '~icons/fa6-solid/download';

	let generating = false;
	let statusMessage = '';
	let errorMessage = '';

	async function downloadCurrentResume() {
		if (generating) return;

		generating = true;
		statusMessage = 'Fetching the current CV…';
		errorMessage = '';

		try {
			const response = await fetch('/api/pdf', {
				cache: 'no-store',
				headers: { Accept: 'application/pdf' }
			});
			if (!response.ok) throw new Error(`The PDF service returned ${response.status}.`);
			if (!response.headers.get('content-type')?.includes('application/pdf')) {
				throw new Error('The PDF service returned an unexpected response.');
			}

			const pdf = await response.blob();
			if ((await pdf.slice(0, 5).text()) !== '%PDF-') {
				throw new Error('The generated file was not a valid PDF.');
			}

			const downloadUrl = URL.createObjectURL(pdf);
			const link = document.createElement('a');
			link.href = downloadUrl;
			link.download = 'Daniel-Wambua-CV.pdf';
			document.body.append(link);
			link.click();
			link.remove();
			window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 60_000);
			statusMessage = 'Your current CV is ready. The download has started.';
		} catch (error) {
			console.error('Current CV download failed:', error);
			errorMessage =
				error instanceof Error ? error.message : 'Something went wrong while generating the CV.';
			statusMessage = '';
		} finally {
			generating = false;
		}
	}
</script>

<svelte:head>
	<title>Resume | Daniel Wambua</title>
	<meta
		name="description"
		content="Download Daniel Wambua's current cybersecurity and software resume as a PDF."
	/>
</svelte:head>

<div class="resume-page">
	<section class="download-content" aria-labelledby="resume-title">
		<h1 id="resume-title">Download my CV</h1>
		<p class="download-intro">Choose the current PDF or the saved backup.</p>

		<div class="download-control">
			<button
				class="download-button"
				type="button"
				on:click={downloadCurrentResume}
				disabled={generating}
				aria-busy={generating}
			>
				<span class:spinning={generating} aria-hidden="true"><DownloadIcon /></span>
				{generating ? 'Preparing your CV…' : 'Download current CV'}
			</button>
			<div class="download-status" aria-live="polite" aria-atomic="true">
				{#if generating}<div class="progress-track" aria-hidden="true"><span></span></div>{/if}
				{#if statusMessage}<p>{statusMessage}</p>{/if}
				{#if errorMessage}
					<p class="download-error" role="alert">
						{errorMessage} You can retry or use the static backup.
					</p>
				{/if}
			</div>
		</div>

		<div class="download-details">
			<span>PDF · Current version</span>
			<a href="/downloads/Daniel-Wambua-CV.pdf" download="Daniel-Wambua-CV.pdf">
				Download saved backup
			</a>
		</div>
	</section>
</div>

<style lang="scss">
	.resume-page {
		display: flex;
		min-height: min(65vh, 38rem);
		align-items: center;
		padding: clamp(4rem, 11vw, 8rem) 0;
	}

	.download-content {
		--download-accent: #08b5c8;
		--download-ink: #062428;

		width: min(100%, 48rem);
		margin: 0 auto;
		padding: clamp(1.5rem, 5vw, 3rem);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		background: linear-gradient(135deg, var(--accent-transparent), transparent 56%), var(--surface);
	}

	h1 {
		max-width: 11ch;
		font-size: clamp(3rem, 8vw, 5.7rem);
		line-height: 0.99;
		text-wrap: balance;
	}

	.download-intro {
		max-width: 56ch;
		margin-top: 1.3rem;
		font-size: clamp(1rem, 2vw, 1.15rem);
		line-height: var(--line-height-relaxed);
	}

	.download-control {
		display: flex;
		align-items: flex-start;
		gap: 1rem 1.25rem;
		margin-top: 2rem;
	}

	.download-button {
		display: inline-flex;
		min-height: 3.2rem;
		flex: 0 0 auto;
		align-items: center;
		justify-content: center;
		gap: 0.65rem;
		padding: 0.8rem 1.2rem;
		border: 0;
		border-radius: var(--radius-full);
		background: var(--download-accent);
		color: var(--download-ink);
		font-size: var(--font-size-sm);
		font-weight: 650;
		cursor: pointer;
		transition:
			filter var(--transition-fast),
			transform var(--transition-fast);

		:global(svg) {
			width: 0.9rem;
			height: 0.9rem;
		}

		&:hover:not(:disabled) {
			filter: brightness(0.94);
			transform: translateY(-1px);
		}

		&:disabled {
			cursor: progress;
			opacity: 0.78;
		}
	}

	.spinning {
		animation: spin 1.2s linear infinite;
	}

	.download-status {
		min-width: 0;
		flex: 1;
		padding-top: 0.35rem;
		color: var(--text-color-dim);
		font-size: var(--font-size-xs);

		p {
			margin-top: 0.45rem;
		}
	}

	.download-error {
		color: var(--error);
	}

	.progress-track {
		height: 2px;
		overflow: hidden;
		background: var(--background-hover);

		span {
			display: block;
			width: 38%;
			height: 100%;
			background: var(--download-accent);
			animation: progress 1.25s ease-in-out infinite;
		}
	}

	.download-details {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.75rem 1rem;
		margin-top: 2.2rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border-color);
		color: var(--text-color-dim);
		font-size: var(--font-size-xs);

		a {
			color: var(--text-color);
			text-decoration: underline;
			text-decoration-color: var(--border-color-light);
			text-underline-offset: 0.22em;
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes progress {
		from {
			transform: translateX(-120%);
		}
		to {
			transform: translateX(360%);
		}
	}

	@media (max-width: 620px) {
		.download-control {
			flex-direction: column;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.spinning,
		.progress-track span {
			animation: none;
		}
	}
</style>
