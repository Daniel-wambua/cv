import type { RequestHandler } from './$types';

export const HEAD: RequestHandler = async () => {
	return new Response(null, {
		status: 204,
		headers: { 'Cache-Control': 'no-store' }
	});
};

// The build pipeline compiles the current resume.yml with the original LaTeX
// template. Redirecting here keeps the on-click download identical to that PDF.
export const GET: RequestHandler = ({ url }) => {
	return new Response(null, {
		status: 307,
		headers: {
			Location: new URL('/downloads/Daniel-Wambua-CV.pdf', url).toString(),
			'Cache-Control': 'no-store'
		}
	});
};
