#!/bin/bash
# -------------------------------------------------------------
# START Maastricht – Local Website Preview (Double-click to run)
# -------------------------------------------------------------
cd "$(dirname "$0")"

PORT=8080
# Find an available port if 8080 is in use
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; do
    PORT=$((PORT+1))
done

echo "==================================================="
echo "  START Maastricht – Local Website Preview"
echo "==================================================="
echo "Server starting at: http://localhost:$PORT"
echo "Press Ctrl+C to stop the server."
echo "==================================================="

# Automatically open browser
(sleep 1 && open "http://localhost:$PORT") &

# Start local web server (pre-installed on macOS)
python3 -m http.server $PORT
