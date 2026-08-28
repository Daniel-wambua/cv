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

# Always use the venv interpreter directly to avoid system pip constraints.
VENV_PYTHON=".venv/bin/python"

# Install Python dependencies
echo "📦 Installing Python dependencies..."
"$VENV_PYTHON" -m pip install --quiet -r lib/requirements.txt

# Validate resume
echo "✅ Validating resume.yml..."
"$VENV_PYTHON" lib/validate.py --schema schema.json --resume resume.yml --template template.jinja

# Generate LaTeX
echo "📝 Generating LaTeX from resume.yml..."
"$VENV_PYTHON" lib/generate.py --resume resume.yml --template template.jinja --output tex/resume.tex

# Compile to PDF directly into web static directory
mkdir -p web/static/downloads
if command -v xelatex >/dev/null 2>&1; then
    echo "🎨 Compiling PDF..."
    "$VENV_PYTHON" lib/compile.py --input tex/resume.tex --output web/static/downloads/Daniel-Wambua-CV.pdf
else
    # Builders without a LaTeX toolchain (e.g. Vercel) deploy the committed
    # PDF, which the CI workflow rebuilds on every change to the resume data.
    echo "⚠️ xelatex not available on this builder - using the committed PDF from web/static/downloads/"
    if [ ! -f web/static/downloads/Daniel-Wambua-CV.pdf ]; then
        echo "❌ No committed PDF found and xelatex is unavailable - cannot produce a PDF"
        exit 1
    fi
fi

echo "✅ Pre-build PDF generation complete!"
echo "📄 PDF available at: web/static/downloads/Daniel-Wambua-CV.pdf"
