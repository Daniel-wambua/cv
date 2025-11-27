import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/api/resume');
  const resume = res.ok ? await res.json() : {};
  return { resume };
};
