#!/bin/bash
################################################################################
# File Watcher - Auto-regenerate PDF when resume.yml changes
# Usage: bash scripts/watch-resume.sh
################################################################################

echo "👀 Watching resume.yml for changes..."
echo "Press Ctrl+C to stop"

RESUME_FILE="resume.yml"
LAST_MODIFIED=$(stat -c %Y "$RESUME_FILE" 2>/dev/null || echo 0)

while true; do
    CURRENT_MODIFIED=$(stat -c %Y "$RESUME_FILE" 2>/dev/null || echo 0)
    
    if [ "$CURRENT_MODIFIED" != "$LAST_MODIFIED" ]; then
        echo ""
        echo "🔄 Change detected in resume.yml at $(date '+%H:%M:%S')"
        echo "📝 Regenerating PDF..."
        
        bash web/scripts/prebuild.sh
        
        if [ $? -eq 0 ]; then
            echo "✅ PDF updated successfully!"
        else
            echo "❌ PDF generation failed"
        fi
        
        LAST_MODIFIED=$CURRENT_MODIFIED
        echo ""
        echo "👀 Watching for changes..."
    fi
    
    sleep 2
done
