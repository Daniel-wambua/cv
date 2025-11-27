<script lang="ts">
  // This layout resets inheritance, so the print page is NOT wrapped
  // by the main site layout (no sidebar/header/footer, no app styles).
  // Ref: SvelteKit layout reset using +layout@.svelte
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
  <style>
    html, body { margin: 0; padding: 0; background: #fff; color: #111; }
    /* Avoid any overflow that could cause extra blank pages in print */
    html, body { height: auto; overflow: visible; }
  </style>
</svelte:head>

<slot />
