import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  // Redirect to the static PDF file
  // The PDF is generated during build and placed in the static directory
  // SvelteKit will serve it from /downloads/Daniel-Wambua-CV.pdf
  throw redirect(302, '/downloads/Daniel-Wambua-CV.pdf');
}
