import type { RequestHandler } from './$types';
import { readFileSync } from 'fs';
import { join } from 'path';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

// Fast readiness probe for the download page (avoid spinning up Chromium on HEAD requests)
export const HEAD: RequestHandler = async () => {
  return new Response(null, {
    status: 204,
    headers: { 'Cache-Control': 'public, max-age=60' }
  });
};

// Dynamic, on-demand PDF generation using headless Chromium on Vercel
export const GET: RequestHandler = async ({ url }) => {
  // Behavior aligned with lissy93/cv pipeline:
  // 1) Serve the prebuilt, versioned static PDF by default (exactly matches the LaTeX output under /out)
  // 2) Allow an explicit fresh render via headless Chromium when `?fresh=1` is provided
  const wantFresh = url.searchParams.get('fresh') === '1';

  if (!wantFresh) {
    // Try to serve the bundled static artifact directly, falling back to redirect if FS is not readable
    try {
      // During dev, process.cwd() points to /web; static assets live under /web/static
      const staticPath = join(process.cwd(), 'static', 'downloads', 'Daniel-Wambua-CV.pdf');
      const file = readFileSync(staticPath);
      return new Response(file, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="Daniel-Wambua-CV.pdf"',
          // Cache moderately; consumers can add cache-busting if needed
          'Cache-Control': 'public, max-age=86400'
        }
      });
    } catch (e) {
      // If we can't read from FS (e.g., serverless env), just redirect to the public static URL
      const redirectUrl = `${url.protocol}//${url.host}/downloads/Daniel-Wambua-CV.pdf`;
      return Response.redirect(redirectUrl, 302);
    }
  }

  let browser;
  try {
    const executablePath = await chromium.executablePath();
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1240, height: 1754 }, // ~A4 at 96dpi
      executablePath,
      headless: true
    });

    const page = await browser.newPage();
    await page.emulateMediaType('print');

    // Render a print-optimized route which pulls data from /api/resume
    const origin = `${url.protocol}//${url.host}`;
    const printUrl = `${origin}/print`;

    await page.goto(printUrl, { waitUntil: 'networkidle0', timeout: 90_000 });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      // Slightly tighter margins and a modest downscale to encourage a single-page fit
      margin: { top: '8mm', right: '8mm', bottom: '8mm', left: '8mm' },
      scale: 0.96
    });

    return new Response(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Daniel-Wambua-CV.pdf"',
        // Cache for 1 hour to balance freshness and performance
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (e) {
    console.error('PDF generation error:', e);
    return new Response('Failed to generate PDF', { status: 500 });
  } finally {
    try {
      await browser?.close();
    } catch {}
  }
};
