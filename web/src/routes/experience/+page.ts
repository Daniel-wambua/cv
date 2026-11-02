export const prerender = false;
import type { PageLoad } from './$types';

interface ResumeWorkEntry {
	name: string;
	position: string;
	startDate: string;
	endDate?: string;
	highlights?: string[];
}

interface ResumeData {
	work?: ResumeWorkEntry[];
}

export const load: PageLoad = async ({ fetch }) => {
	try {
		const resumeResponse = await fetch('/api/resume');
		if (!resumeResponse.ok) {
			throw new Error(`Resume data request failed (${resumeResponse.status})`);
		}
		const resumeData: ResumeData = await resumeResponse.json();
		const cvData = Array.isArray(resumeData.work) ? resumeData.work : [];

		return {
			combinedJobData: cvData.map((job) => ({
				company: job.name,
				position: job.position,
				datesWorked: `${job.startDate} - ${job.endDate ?? 'Present'}`,
				highlights: job.highlights,
				responsibilities: job.highlights?.join(' ') || '',
				technologies: []
			}))
		};
	} catch (error) {
		console.error('Failed to load experience data:', error);
		return {
			combinedJobData: []
		};
	}
};
