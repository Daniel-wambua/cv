#!/bin/bash
################################################################################
# Fetch certificate images from Google Drive into web/static/certificates/
#
# The images are deliberately NOT committed to the repo (so forks don't
# contain copies of the certificates). Instead, the Vercel build downloads
# them at deploy time and serves them as local static files - reliable in
# browsers, unlike hotlinking drive.google.com/thumbnail (302 to
# lh3.googleusercontent.com, rate limits, cookie walls).
#
# Drive file IDs are already public in this repo (they were previously in
# web/src/lib/config/certificates.ts), so keeping them here changes nothing
# about exposure.
################################################################################

set -u

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$SCRIPT_DIR/../static/certificates"
mkdir -p "$OUT_DIR"

# name:file_id[:size]  (size defaults to w1000)
FILES=(
  "connectedafricactf.jpg:1XTcK8byXo-xYlFFIb6po5rU7VwoUAbl1"
  "cybergame2026.jpg:1TnOp-KgKDr4i5hWWWvq6uKJU5GO9brEV"
  "thryvectf.png:1gGUIxMeQ6Cqy4N13vQHu7E_-rM9IHw3M"
  "nexhuntctf.jpg:1-CPtYRlMvlH9_S4KWCmb5KKs4h2_J7jC"
  "perfectroot.png:1y6-WO-TkMDPjmqnTATKQYvM-yC-4JP4U"
  "apisec.jpg:1OjcyouQdC1p4_68802-VJc0HAywmtpBA"
  "csem.png:1zK-t-b0eYdVPaL94dc6YztgjYHlKDZb9"
  "osint.png:1DjIMyf09RaNn-R_qcQJbGEbG5PT_JD2k"
  "crhcctf.png:164J4ltJ9Zlg1hWUj56sUdFRy_NxQzC_I"
  "iiit.jpg:1mpPae39dAg-p_RFf6X2-RrUMVU47lrBO"
  "cybergame.jpg:19Rq-JAR4FL5iDBI3YJ_eZTCv3D9SYG-w"
  "h7ctf.jpg:1cDzaJhC-SvU9Th-Ynm8AfRJWvG73f5rR"
  "chinaosint.png:12KWVdbFmKCZYPeGWEE8e-y34cF9Px1nC"
  "badge-owasp-api-security.png:1n2tSxldiiCf2NpEZDUyB_Ht9vzpJAzHA:w400"
  "badge-api-security-fundamentals.png:1TEk9qBIRSSLuxetDWbTuxGfZP-aXuWKp:w400"
  "badge-oscp.png:1U6qAjqhDPR_EAzWrA1MHpRP2a6k-Qf2q:w400"
)

FAILED=0
for entry in "${FILES[@]}"; do
  name="${entry%%:*}"
  rest="${entry#*:}"
  id="${rest%%:*}"
  size="w1000"
  case "$rest" in
    *:*) size="${rest##*:}" ;;
  esac

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
    echo "⚠️  Failed to fetch $name - the site will show a broken image for it"
    rm -f "$out"
    FAILED=$((FAILED + 1))
  fi
done

if [ "$FAILED" -gt 0 ]; then
  echo "⚠️  $FAILED certificate image(s) failed to download"
fi
echo "✅ Certificate images ready in web/static/certificates/"
