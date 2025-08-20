# Render Deployment - Optimized for free tier
FROM node:20-slim

# Install Python, LaTeX, and required packages
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    texlive-latex-base \
    texlive-latex-extra \
    texlive-fonts-recommended \
    texlive-latex-recommended \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files first for better caching
COPY web/package*.json ./web/
COPY lib/requirements.txt ./lib/

# Install dependencies
WORKDIR /app/web
RUN npm ci --only=production

# Copy source code
WORKDIR /app
COPY . .

# Setup Python environment
RUN python3 -m venv .venv && \
    .venv/bin/pip install --no-cache-dir -r lib/requirements.txt

# Build the SvelteKit app
WORKDIR /app/web
RUN npm run build

# Create necessary directories
RUN mkdir -p /app/out /app/tex

# Render uses PORT environment variable
EXPOSE $PORT

# Start the application
CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0 --port $PORT"]
