import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/resume');
		if (!response.ok) throw new Error(`Resume data request failed (${response.status})`);
		const resume = await response.json();
		return { email: resume?.basics?.email ?? 'havocxsec@proton.me' };
	} catch (error) {
		console.error('Failed to load contact details:', error);
		return { email: 'havocxsec@proton.me' };
	}
};
