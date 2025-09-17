export const prerender = false;
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const resumeResponse = await fetch('/api/resume');
    const resumeData = await resumeResponse.json();
    const cvData = resumeData?.work || [];

    return {
      combinedJobData: cvData.map((job: any) => ({
        company: job.name,
        position: job.position,
        datesWorked: `${job.startDate} - ${job.endDate}`,
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
