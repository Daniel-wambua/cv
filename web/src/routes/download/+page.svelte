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
  <title>Downloading CV…</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="wrap">
  <div class="card">
    <h1>Downloading CV…</h1>
    <div class="spinner" aria-hidden="true"></div>
    <p>Your download should start automatically.</p>
    <p class="hint">If it doesn’t start within a few seconds, please ensure JavaScript is enabled and not blocked by extensions (e.g. ad/script blockers). You can also use the manual links below.</p>
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
      <li><a href="https://github.com/Daniel-wambua/cv/releases" target="_blank" rel="noopener">Get latest release on GitHub</a></li>
    </ul>

    <button class="retry" on:click={startDownload} disabled={status === 'starting' || status === 'downloading'}>
      {status === 'starting' || status === 'downloading' ? 'Starting…' : 'Retry download'}
    </button>
  </div>
</div>

<style>
  :root {
    --bg1: #0f172a; /* slate-900 */
    --bg2: #111827; /* gray-900 */
    --card: rgba(255,255,255,0.06);
    --text: #e5e7eb; /* gray-200 */
    --muted: #9ca3af; /* gray-400 */
    --accent: #60a5fa; /* blue-400 */
    --warn: #fbbf24; /* amber-400 */
    --danger: #f87171; /* red-400 */
  }
  .wrap {
    min-height: 100vh;
    display: grid;
    place-items: center;
    background: radial-gradient(60% 60% at 50% 40%, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.02) 60%, transparent 100%),
                linear-gradient(135deg, var(--bg1), var(--bg2));
    color: var(--text);
    padding: 24px;
  }
  .card {
    width: 100%;
    max-width: 560px;
    background: var(--card);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px;
    padding: 28px 24px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.35);
    backdrop-filter: blur(6px);
  }
  h1 {
    margin: 0 0 10px;
    font-size: 24px;
    letter-spacing: 0.2px;
  }
  p { color: var(--muted); margin: 6px 0 12px; }
  .links { list-style: none; padding: 0; margin: 10px 0 0; }
  .links li { margin: 6px 0; }
  a { color: var(--accent); text-decoration: underline; }
  .warn { color: var(--warn); }
  .hint { color: var(--muted); font-size: 0.95em; }
  .error { color: var(--danger); background: rgba(248,113,113,0.08); padding: 8px 10px; border-radius: 8px; overflow: auto; }
  .retry {
    margin-top: 14px;
    background: var(--accent);
    color: #0b1020;
    border: 0;
    padding: 10px 16px;
    border-radius: 10px;
    cursor: pointer;
  }
  .retry[disabled] { opacity: 0.6; cursor: default; }

  .spinner {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 4px solid rgba(255,255,255,0.25);
    border-top-color: var(--accent);
    margin: 14px auto;
    animation: spin 900ms linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
