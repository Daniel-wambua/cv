<script lang="ts">
  import { onMount } from 'svelte';

  let status: 'init' | 'starting' | 'downloading' | 'error' = 'init';
  let errorMsg = '';

  async function startDownload() {
    status = 'starting';
    try {
      // Serve the prebuilt static PDF by default (matches LaTeX output exactly)
      // Add a cache-busting query to avoid any stale CDN caches
      const dynamicUrl = `/api/pdf?ts=${Date.now()}`;

      // Probe the endpoint quickly to surface errors before redirecting
      const res = await fetch(dynamicUrl, { method: 'HEAD' });
      if (!res.ok) {
        throw new Error(`Dynamic PDF generator unavailable (status ${res.status})`);
      }

      status = 'downloading';
      setTimeout(() => {
        window.location.href = dynamicUrl;
      }, 300);
    } catch (err: unknown) {
      // If default download fails, surface error and offer fallbacks below
      status = 'error';
      if (err instanceof Error) {
        errorMsg = err.message;
      } else {
        errorMsg = 'Unknown error while contacting dynamic PDF generator';
      }
    }
  }

  onMount(() => {
    startDownload();
  });
</script>

<svelte:head>
  <title>Downloading CV</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="wrap">
  <div class="card">
    <h1>Downloading CV</h1>
    <div class="spinner" aria-hidden="true"></div>
    <p>Your download should start automatically.</p>
    <p class="hint">If it does not start within a few seconds, please ensure JavaScript is enabled and not blocked by extensions such as ad or script blockers. You can also use the manual links below.</p>
    <noscript>
      <p class="warn">JavaScript is disabled. Please enable JavaScript and reload this page, or use the manual download links below.</p>
    </noscript>

    {#if status === 'error'}
      <p class="warn">We couldn't generate the PDF right now.</p>
      <pre class="error">{errorMsg}</pre>
      <p>Try one of the alternatives:</p>
    {/if}

    <ul class="links">
      <li><a href="/api/pdf" rel="nofollow">Download CV (recommended static build)</a></li>
      <li><a href="/api/pdf?fresh=1" rel="nofollow">Render a fresh PDF now (headless browser)</a></li>
      <li><a href="/downloads/Daniel-Wambua-CV.pdf">Direct link to static PDF</a></li>
      <li><a href="https://github.com/Daniel-wambua/cv/releases" target="_blank" rel="noopener noreferrer">Get latest release on GitHub</a></li>
    </ul>

    <button class="retry" on:click={startDownload} disabled={status === 'starting' || status === 'downloading'}>
      {status === 'starting' || status === 'downloading' ? 'Starting' : 'Retry download'}
    </button>
  </div>
</div>

<style>
  .wrap {
    min-height: 60vh;
    display: grid;
    place-items: center;
    padding: 24px;
  }
  .card {
    width: 100%;
    max-width: 560px;
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 28px 24px;
    text-align: center;
  }
  h1 {
    margin: 0 0 10px;
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    letter-spacing: var(--tracking-tight);
  }
  p {
    color: var(--text-color-dim);
    margin: 6px 0 12px;
  }
  .links {
    list-style: none;
    padding: 0;
    margin: 10px 0 0;
  }
  .links li {
    margin: 6px 0;
  }
  a {
    color: var(--accent);
    text-decoration: underline;
  }
  .warn {
    color: var(--warning);
  }
  .hint {
    font-size: 0.95em;
  }
  .error {
    color: var(--error);
    background: rgba(255, 93, 93, 0.08);
    padding: 8px 10px;
    border-radius: var(--radius-sm);
    overflow: auto;
    text-align: left;
  }
  .retry {
    margin-top: 14px;
    background: var(--accent);
    color: var(--background);
    border: 0;
    padding: 10px 16px;
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: background var(--transition-fast);
  }
  .retry:hover:not([disabled]) {
    background: var(--accent-dim);
  }
  .retry[disabled] {
    opacity: 0.6;
    cursor: default;
  }

  .spinner {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 4px solid var(--border-color-light);
    border-top-color: var(--accent);
    margin: 14px auto;
    animation: spin 900ms linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
