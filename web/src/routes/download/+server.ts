import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    // In production (Vercel/Netlify), serve pre-built PDF from static directory
    // Path to the static PDF (generated during build)
    const staticPdfPath = join(process.cwd(), 'static', 'downloads', 'Daniel-Wambua-CV.pdf');
    
    // Check if pre-built PDF exists
    if (existsSync(staticPdfPath)) {
      console.log('Serving pre-built PDF from static directory');
      const pdfBuffer = readFileSync(staticPdfPath);
      
      return new Response(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="Daniel-Wambua-CV.pdf"',
          'Content-Length': pdfBuffer.length.toString(),
          'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
        }
      });
    }

    // Fallback: Try to serve from project root (for development/local)
    const projectRoot = join(process.cwd(), '..');
    const outputPdfPath = join(projectRoot, 'out', 'Daniel-Wambua-CV.pdf');
    
    if (existsSync(outputPdfPath)) {
      console.log('Serving PDF from project output directory');
      const pdfBuffer = readFileSync(outputPdfPath);
      
      return new Response(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="Daniel-Wambua-CV.pdf"',
          'Content-Length': pdfBuffer.length.toString()
        }
      });
    }

    // If no PDF is found, return helpful error
    return new Response(
      'PDF not found. Please ensure the CV has been generated during the build process.',
      { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      }
    );

  } catch (error) {
    console.error('Download endpoint error:', error);
    
    return new Response(`Failed to serve PDF: ${error}`, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}
