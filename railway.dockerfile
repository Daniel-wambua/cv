# Railway Deployment
FROM node:20-bullseye

# Install Python, LaTeX, and system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    texlive-latex-base \
    texlive-latex-extra \
    texlive-fonts-recommended \
    texlive-fonts-extra \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy everything
COPY . .

# Setup Python environment
RUN python3 -m venv .venv && \
    .venv/bin/pip install --no-cache-dir -r lib/requirements.txt

# Setup Node.js
WORKDIR /app/web
RUN npm ci --only=production

# Build the app
RUN npm run build

# Create necessary directories
RUN mkdir -p /app/out /app/tex

# Expose port (Railway auto-detects)
EXPOSE 3000

# Start command
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
