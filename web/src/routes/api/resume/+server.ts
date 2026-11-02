import yaml from 'js-yaml';
import resumeSource from '../../../../../resume.yml?raw';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const resume = yaml.load(resumeSource);
		return new Response(JSON.stringify(resume), {
			headers: {
				'Cache-Control': 'no-store',
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error('Failed to parse the bundled resume.yml:', error);
		return new Response(JSON.stringify({ error: 'Resume data is temporarily unavailable.' }), {
			status: 500,
			headers: {
				'Cache-Control': 'no-store',
				'Content-Type': 'application/json'
			}
		});
	}
};
