#!/bin/bash
# ==============================================================================
# HormigasAIS - Edge Automation Script (Termux)
# Repositorio: spotify-cc-integration
# ==============================================================================

set -e

PROJECT_DIR="$(pwd)"
LOG_FILE="$PROJECT_DIR/logs/feromona_edge.log"
TIMESTAMP=$(date +%s)
DATE_HUMAN=$(date +"%Y-%m-%d %H:%M:%S")

mkdir -p "$PROJECT_DIR/logs"

echo "🐜 [HormigasAIS] Iniciando ciclo de compilación y sincronización..."

# 1. Compilar vistas SEO mediante el motor Node.js
if [ -f "$PROJECT_DIR/build-seo-view.js" ]; then
    echo "⚙️  [1/3] Compilando vistas SEO y Schema.org..."
    node "$PROJECT_DIR/build-seo-view.js"
else
    echo "❌ Error: build-seo-view.js no existe en el directorio."
    exit 1
fi

# 2. Emitir y registrar feromona digital local
PULSE_JSON="{\"timestamp\": $TIMESTAMP, \"type\": \"seo_sync_pulse\", \"origin\": \"termux_edge_node\", \"status\": \"active\", \"track\": \"misericordia\"}"
echo "📡 [XOXO-BUS] FEROMONA_EMITIDA: $PULSE_JSON" >> "$LOG_FILE"
echo "📡 [XOXO-BUS] Feromona registrada en log local."

# 3. Sincronización automática con Git
echo "🚀 [3/3] Sincronizando con repositorio remoto..."
git add .

COMMIT_MSG="auto(hormigasais): actualización de vistas SEO y feromona [$DATE_HUMAN]"

if git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "ℹ️  No se detectaron cambios pendientes."
else
    git commit -m "$COMMIT_MSG"
    if ! git push origin main; then
        echo "❌ [HormigasAIS] Falló el push a origin/main. Revisa el error arriba." >&2
        exit 1
    fi
    echo "✅ [HormigasAIS] Sincronización y push completados."
fi
