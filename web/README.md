# Daniel Wambua — Portfolio

The SvelteKit site presents selected work, experience, skills, achievements, certificates, and contact details from the root `resume.yml`. The contact page keeps the email masked until a visitor chooses **Reveal email**.

## Local development

```bash
npm ci
npm run dev
```

Run the Svelte/TypeScript checks with `npm run check`. Create and preview a production build with:

```bash
npm run build
npm run preview
```

The build's prebuild step validates the root `resume.yml`, synchronizes its public copies, generates the LaTeX source, compiles the CV PDF when `xelatex` is available, and downloads the public certificate, badge, and achievement-gallery images into `static/certificates/`. It requires Python 3 and the packages in `lib/requirements.txt`; without `xelatex`, the build uses the committed PDF backup.

## CV PDF

The repository-root `resume.yml` is bundled into `/api/resume` at build time and supplies the site content. The build pipeline renders it through the original LaTeX template and compiles `static/downloads/Daniel-Wambua-CV.pdf`; GitHub Actions rebuilds and commits that artifact when changes are pushed to `main`. Selecting **Download current CV** requests `/api/pdf`, which serves that build-generated PDF without altering its layout. The separate **Download saved backup** link points to the same committed PDF directly.

The download page does not generate or download anything when opened. It serves the latest PDF included in the deployed build; to publish updated resume details, edit the root `resume.yml` and allow the build workflow to regenerate and deploy the LaTeX PDF.

## Certificate images

`src/lib/config/certificate-manifest.json` is the single allowlist for certificate, badge, and achievement-gallery metadata and public Google Drive file IDs. The UI configuration and build-time fetch script both read this manifest. Google Drive images are fetched into `static/certificates/` during prebuild and are intentionally not committed.

Only add certificates and achievement photos that are intended to be public. To add a certificate or a remotely hosted achievement photo, upload it to Google Drive, enable link access for viewers, and add its metadata, filename, and file ID to the appropriate manifest list. For an existing local image, add an achievement-gallery entry with its `image` path (for example, `/assets/example.webp`) and omit `driveFileId`; it will appear in the same board without being fetched again. To remove an image, remove its manifest entry and revoke Drive sharing when applicable, then rebuild and redeploy. Previously deployed copies may remain in a CDN cache until that deployment or cache is replaced.
