#!/bin/bash

# Vercel Build Script - Handles PDF generation and SvelteKit build
set -e

echo "🚀 Starting Vercel build process..."

# Navigate to project root
cd ..

echo "📦 Setting up Python environment..."
python3 -m venv .venv
source .venv/bin/activate

echo "📥 Installing Python dependencies..."
pip install -r lib/requirements.txt

echo "✅ Validating resume data..."
python lib/validate.py --schema schema.json --resume resume.yml --template template.jinja

echo "📝 Generating LaTeX from resume..."
python lib/generate.py --resume resume.yml --template template.jinja --output tex/resume.tex

mkdir -p web/static/downloads
if command -v xelatex >/dev/null 2>&1; then
    echo "📄 Compiling PDF..."
    python lib/compile.py --input tex/resume.tex --output web/static/downloads/Daniel-Wambua-CV.pdf
else
    # Vercel's build image has no LaTeX toolchain. The CI workflow
    # (.github/workflows/compile.yml) rebuilds and commits the PDF on
    # every change, so the committed artifact is the source of truth here.
    echo "⚠️ xelatex not available on this builder - deploying the committed PDF from web/static/downloads/"
    if [ ! -f web/static/downloads/Daniel-Wambua-CV.pdf ]; then
        echo "❌ No committed PDF found and xelatex is unavailable - cannot produce a PDF"
        exit 1
    fi
fi

echo "✅ Pre-build PDF generation complete!"

# Navigate back to web directory
cd web

echo "📦 Installing Node dependencies..."
npm install

echo "🏗️ Building SvelteKit app..."
npm run build

echo "✅ Vercel build complete!"
