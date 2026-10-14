#!/bin/bash
# -------------------------------------------------------------
# START Maastricht – Lokalen Server starten (Doppelklick genügt)
# -------------------------------------------------------------
cd "$(dirname "$0")"

PORT=8080
# Freien Port finden, falls 8080 belegt ist
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; do
    PORT=$((PORT+1))
done

echo "==================================================="
echo "  START Maastricht – Lokale Website-Vorschau"
echo "==================================================="
echo "Server startet auf: http://localhost:$PORT"
echo "Drücke Ctrl+C, um den Server zu stoppen."
echo "==================================================="

# Browser automatisch öffnen
(sleep 1 && open "http://localhost:$PORT") &

# Python Webserver starten (auf jedem Mac vorinstalliert)
python3 -m http.server $PORT
