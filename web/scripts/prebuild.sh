#!/bin/bash
################################################################################
# Pre-build script to generate PDF before deploying to Vercel/Netlify
# This runs during the build process to create the static PDF file
################################################################################

set -e  # Exit on error

echo "🔧 Starting pre-build PDF generation..."

# Navigate to project root
cd "$(dirname "$0")/../.."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Installing..."
    # Vercel/Netlify will have Python available
fi

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "🐍 Creating Python virtual environment..."
    python3 -m venv .venv
fi

# Activate virtual environment
echo "⚡ Activating virtual environment..."
source .venv/bin/activate

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install --quiet -r lib/requirements.txt

# Validate resume
echo "✅ Validating resume.yml..."
.venv/bin/python lib/validate.py --schema schema.json --resume resume.yml --template template.jinja

# Generate LaTeX
echo "📝 Generating LaTeX from resume.yml..."
.venv/bin/python lib/generate.py --resume resume.yml --template template.jinja --output tex/resume.tex

# Compile to PDF
echo "🎨 Compiling PDF..."
.venv/bin/python lib/compile.py --input tex/resume.tex --output out/Daniel-Wambua-CV.pdf

# Copy PDF to web static directory so it's served as a static asset
echo "📋 Copying PDF to static directory..."
mkdir -p web/static/downloads
cp out/Daniel-Wambua-CV.pdf web/static/downloads/Daniel-Wambua-CV.pdf

echo "✅ Pre-build PDF generation complete!"
echo "📄 PDF available at: web/static/downloads/Daniel-Wambua-CV.pdf"
