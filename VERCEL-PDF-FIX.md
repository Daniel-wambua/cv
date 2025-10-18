# Vercel PDF Download Fix

## Problem
After deploying to Vercel, attempting to download the PDF resulted in the error:
```
PDF not found. Please ensure the CV has been generated during the build process.
```

## Root Cause
The download endpoint (`/download`) was trying to read the PDF from the filesystem using Node.js `fs` module, which doesn't work reliably with serverless functions on Vercel. The static files are served separately from the serverless functions.

## Solution Implemented

**UPDATE (Oct 18, 2025)**: Fixed Vercel's 256-character `buildCommand` limit by creating dedicated build script.

1. **Created `/web/scripts/vercel-build.sh`**:
   - Moved entire PDF generation pipeline to dedicated script
   - Handles Python venv, dependencies, validation, LaTeX compilation
   - Kept `buildCommand` under 256 characters: `bash scripts/vercel-build.sh`

2. **Modified `/web/src/routes/download/+server.ts`**:
   - Removed filesystem reading with `fs.readFileSync`
   - Implemented simple HTTP 302 redirect to static PDF
   - PDF is served directly from Vercel's CDN (faster & cheaper)

### 2. Updated Vercel Build Configuration
Modified `/web/vercel.json` to ensure the PDF is generated before the SvelteKit build:

**Key Changes:**
- Set `framework: null` to use custom build command
- Build command now runs complete pipeline:
  1. Create Python venv
  2. Install Python dependencies
  3. Validate resume.yml
  4. Generate LaTeX
  5. Compile PDF
  6. Copy PDF to static directory
  7. Run npm build
- Output directory: `web/.svelte-kit/output/client`

### 3. How It Works Now

```
Build Process:
1. Vercel runs custom buildCommand from vercel.json
2. Python environment is set up
3. PDF is generated from resume.yml → LaTeX → PDF
4. PDF is copied to web/static/downloads/
5. SvelteKit build runs (via npm run build)
6. Static files (including PDF) are copied to output/client/
7. PDF is available at: /downloads/Daniel-Wambua-CV.pdf

Download Flow:
1. User visits /download
2. Server redirects (302) to /downloads/Daniel-Wambua-CV.pdf
3. Vercel serves the static PDF file directly
4. Browser downloads the file ✅
```

## Verification

### Local Build Test
```bash
cd web
npm run build
find .svelte-kit/output/client -name "*.pdf"
# Should show: .svelte-kit/output/client/downloads/Daniel-Wambua-CV.pdf
```

### After Deploying to Vercel

1. **Check Build Logs**
   - Verify "✅ Pre-build PDF generation complete!" appears
   - Verify "📄 PDF available at: web/static/downloads/Daniel-Wambua-CV.pdf"

2. **Test Download**
   - Visit: `https://your-site.vercel.app/download`
   - Should redirect to `/downloads/Daniel-Wambua-CV.pdf`
   - PDF should download successfully

3. **Direct Access**
   - Visit: `https://your-site.vercel.app/downloads/Daniel-Wambua-CV.pdf`
   - PDF should display/download directly

## Files Changed

1. ✅ `web/src/routes/download/+server.ts` - Simplified to redirect
2. ✅ `web/vercel.json` - Updated build command and output directory

## Benefits

✅ **Simpler**: No filesystem operations in serverless function
✅ **Faster**: Static file serving is faster than serverless function execution
✅ **Cheaper**: Reduces serverless function invocations
✅ **Reliable**: Static files are guaranteed to be available
✅ **Cacheable**: CDN can cache the PDF file

## Troubleshooting

If the PDF still doesn't work after deploying:

1. **Check Vercel Build Logs**
   ```
   Look for:
   - "✅ Pre-build PDF generation complete!"
   - No errors during PDF generation
   - "✓ built in X.XXs"
   ```

2. **Verify Output Directory**
   In Vercel dashboard → Settings → General:
   - Output Directory should be: `web/.svelte-kit/output/client`

3. **Check Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   - `NODE_VERSION`: 20
   - `PYTHON_VERSION`: 3.11

4. **Force Redeploy**
   ```bash
   # Make a small change and push
   git commit --allow-empty -m "Force redeploy"
   git push
   ```

5. **Check Static Files**
   In Vercel deployment → Functions:
   - Should NOT see `/download` listed (it's a redirect, not a function)
   - PDF should be in static assets

## Alternative: Direct Link

You can also link directly to the PDF instead of using the `/download` endpoint:

```html
<!-- Instead of -->
<a href="/download">Download CV</a>

<!-- Use -->
<a href="/downloads/Daniel-Wambua-CV.pdf" download>Download CV</a>
```

This bypasses the redirect entirely and goes straight to the static file.
