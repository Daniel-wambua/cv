import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Using adapter-vercel for optimized Vercel deployment
		// This ensures proper static asset handling and serverless function optimization
		adapter: adapter({
			// Ensure static assets (including the pre-built PDF) are properly served
			runtime: 'nodejs20.x'
		})
	}
};

export default config;
