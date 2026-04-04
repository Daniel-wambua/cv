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

echo "📄 Compiling PDF..."
mkdir -p web/static/downloads
python lib/compile.py --input tex/resume.tex --output web/static/downloads/Daniel-Wambua-CV.pdf

echo "✅ Pre-build PDF generation complete!"

# Navigate back to web directory
cd web

echo "📦 Installing Node dependencies..."
npm install

echo "🏗️ Building SvelteKit app..."
npm run build

echo "✅ Vercel build complete!"
