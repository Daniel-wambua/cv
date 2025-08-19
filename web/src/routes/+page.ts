// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

// src/routes/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/api/resume');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load resume data:', error);
    return {};
  }
};
