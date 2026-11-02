import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/resume');
		if (!response.ok) throw new Error(`Resume data request failed (${response.status})`);
		return await response.json();
	} catch (error) {
		console.error('Failed to load project data:', error);
		return { projects: [] };
	}
};
