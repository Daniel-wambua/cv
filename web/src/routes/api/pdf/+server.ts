import type { RequestHandler } from './$types';
import { readFileSync } from 'fs';
import { join } from 'path';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

// Vercel functions run on AWS Lambda but strip the AWS env vars that
// @sparticuz/chromium uses to detect the host. Without them it skips
// extracting its shared libraries (libnss3.so & friends) and the font
// config, so the browser fails to launch. Emulate the detection.
process.env.AWS_LAMBDA_JS_RUNTIME ??= 'nodejs20.x';
process.env.FONTCONFIG_PATH ??= '/tmp/fonts';
process.env.LD_LIBRARY_PATH = ['/tmp/al2023/lib', process.env.LD_LIBRARY_PATH]
  .filter(Boolean)
  .join(':');

// Headless Chromium needs more than the default memory/time budget to
// extract its binary, launch and render the /print page on serverless.
export const config = {
  memory: 3008,
  maxDuration: 60
};

const PDF_HEADERS = {
  'Content-Type': 'application/pdf',
  'Content-Disposition': 'inline; filename="Daniel-Wambua-CV.pdf"'
};

// Fast readiness probe for the download page (avoid spinning up Chromium on HEAD requests)
export const HEAD: RequestHandler = async () => {
  return new Response(null, {
    status: 204,
    headers: { 'Cache-Control': 'public, max-age=60' }
  });
};

// Turn an unknown thrown value into a short, log-safe description so
// serverless failures are diagnosable from the response body alone.
const describeError = (e: unknown): string => {
  if (e instanceof Error) {
    const stack = (e.stack || '').split('\n').slice(0, 4).join('\n');
    return `${e.name}: ${e.message}\n${stack}`;
  }
  return String(e);
};

// Dynamic, on-demand PDF generation using headless Chromium on Vercel
export const GET: RequestHandler = async ({ url }) => {
  // 1) Serve the prebuilt, versioned static PDF by default (matches the LaTeX output)
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
          ...PDF_HEADERS,
          // Cache moderately; consumers can add cache-busting if needed
          'Cache-Control': 'public, max-age=86400'
        }
      });
    } catch {
      // If we can't read from FS (e.g. serverless env), just redirect to the public static URL
      const redirectUrl = `${url.protocol}//${url.host}/downloads/Daniel-Wambua-CV.pdf`;
      return Response.redirect(redirectUrl, 302);
    }
  }

  let browser;
  try {
    const executablePath = await chromium.executablePath();
    // ETXTBSY race: right after @sparticuz/chromium finishes extracting the
    // binary to /tmp, the filesystem can still report it busy for a moment.
    // Retrying the launch with a short backoff is the standard workaround.
    const launch = () =>
      puppeteer.launch({
        args: chromium.args,
        defaultViewport: { width: 1240, height: 1754 }, // ~A4 at 96dpi
        executablePath,
        headless: true
      });

    let lastError: unknown;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        browser = await launch();
        break;
      } catch (e) {
        lastError = e;
        const msg = e instanceof Error ? e.message : String(e);
        if (!msg.includes('ETXTBSY') || attempt === 2) throw e;
        console.warn(`Chromium launch failed with ETXTBSY, retrying (attempt ${attempt + 2}/3)...`);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    if (!browser) throw lastError;

    const page = await browser.newPage();
    await page.emulateMediaType('print');

    // Render a print-optimized route which pulls data from /api/resume
    const origin = `${url.protocol}//${url.host}`;
    const printUrl = `${origin}/print`;

    // Don't block forever on networkidle0: long-polling/font CDNs can keep
    // connections open. Load the DOM, then wait briefly for the network to settle.
    await page.goto(printUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForNetworkIdle({ idleTime: 1000, timeout: 20_000 }).catch(() => {});
    // Give client-rendered content a beat to paint before printing
    await new Promise((resolve) => setTimeout(resolve, 500));

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      // Slightly tighter margins and a modest downscale to encourage a single-page fit
      margin: { top: '8mm', right: '8mm', bottom: '8mm', left: '8mm' },
      scale: 0.96
    });

    const pdfBody = pdf as unknown as BodyInit;

    return new Response(pdfBody, {
      headers: {
        ...PDF_HEADERS,
        // Cache for 1 hour to balance freshness and performance
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (e) {
    console.error('PDF generation error:', e);
    // Include the cause so the failure can be diagnosed without access to logs
    return new Response(`Failed to generate PDF\n\n${describeError(e)}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  } finally {
    try {
      await browser?.close();
    } catch {}
  }
};
