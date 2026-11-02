#!/bin/bash
################################################################################
# Fetch public certificate, badge, and achievement-gallery images from Google Drive.
#
# The images are deliberately NOT committed to the repo (so forks don't
# contain copies of the certificates). Instead, the Vercel build downloads
# them at deploy time and serves them as local static files - reliable in
# browsers, unlike hotlinking drive.google.com/thumbnail (302 to
# lh3.googleusercontent.com, rate limits, cookie walls).
#
# Only file IDs in the public image manifest are fetched. Do not add private
# certificates or photos.
################################################################################

set -u

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$SCRIPT_DIR/../static/certificates"
MANIFEST="$SCRIPT_DIR/../src/lib/config/certificate-manifest.json"
mkdir -p "$OUT_DIR"

if [ ! -f "$MANIFEST" ]; then
  echo "❌ Certificate manifest not found: $MANIFEST" >&2
  exit 1
fi

FAILED=0
while IFS=$'\t' read -r name id size; do
  url="https://drive.google.com/thumbnail?id=$id&sz=$size"
  out="$OUT_DIR/$name"

  # Skip if already fetched (local dev reruns)
  if [ -s "$out" ]; then
    echo "✅ $name already present, skipping"
    continue
  fi

  echo "⬇️  Fetching $name from Google Drive..."
  if curl -sfL --retry 3 --retry-delay 2 --max-time 60 "$url" -o "$out" && [ -s "$out" ]; then
    echo "✅ Fetched $name"
  else
    echo "⚠️  Failed to fetch $name - the site may show a broken image for it"
    rm -f "$out"
    FAILED=$((FAILED + 1))
  fi
done < <(python3 - "$MANIFEST" <<'PY'
import json
import sys

with open(sys.argv[1], encoding="utf-8") as manifest_file:
    manifest = json.load(manifest_file)

for entry in [
    *manifest["certificates"],
    *manifest["badges"],
    *manifest.get("achievementGallery", []),
]:
    if entry.get("driveFileId"):
        print(f'{entry["file"]}\t{entry["driveFileId"]}\t{entry.get("size", "w1000")}')
PY
)

if [ "$FAILED" -gt 0 ]; then
  echo "⚠️  $FAILED public image(s) failed to download"
fi
echo "✅ Public images ready in web/static/certificates/"
