// build-seo-view.js - HormigasAIS Edge SEO Generator
const fs = require('fs');
const path = require('path');

const trackConfig = {
  title: "Misericordia",
  artist: "Chrisquinonezartista (HormigasAIS)",
  geniusUrl: "https://genius.com/Chrisquinonezartista-hormigasaiscriswarriortv-misericordia-lyrics",
  spotifyEmbedUrl: "https://open.spotify.com/embed/track/ID_SPOTIFY_TRACK",
  siteUrl: "https://criswarriortv.github.io/spotify-cc-integration",
  description: "Letra oficial, metadatos y visualización de sincronización CC para 'Misericordia' de Chrisquinonezartista. Desplegado desde nodo Edge de HormigasAIS.",
  keywords: "Misericordia, Chrisquinonezartista, HormigasAIS, Genius, Spotify CC, Edge Computing, LBH",
  imageUrl: "https://criswarriortv.github.io/spotify-cc-integration/og-cover.jpg"
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "MusicRecording",
  "name": trackConfig.title,
  "byArtist": {
    "@type": "MusicGroup",
    "name": trackConfig.artist
  },
  "url": trackConfig.siteUrl,
  "sameAs": [
    trackConfig.geniusUrl
  ],
  "description": trackConfig.description,
  "recordingOf": {
    "@type": "MusicComposition",
    "name": trackConfig.title,
    "lyricist": {
      "@type": "Person",
      "name": "Cristhiam Leonardo Hernández Quiñonez"
    }
  }
};

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${trackConfig.title} - ${trackConfig.artist} | Letra & Sincronización CC</title>
  <meta name="description" content="${trackConfig.description}">
  <meta name="keywords" content="${trackConfig.keywords}">
  <link rel="canonical" href="${trackConfig.siteUrl}">

  <!-- Open Graph / Meta Social -->
  <meta property="og:type" content="music.song">
  <meta property="og:title" content="${trackConfig.title} - ${trackConfig.artist}">
  <meta property="og:description" content="${trackConfig.description}">
  <meta property="og:url" content="${trackConfig.siteUrl}">
  <meta property="og:image" content="${trackConfig.imageUrl}">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${trackConfig.title} - ${trackConfig.artist}">
  <meta name="twitter:description" content="${trackConfig.description}">
  <meta name="twitter:image" content="${trackConfig.imageUrl}">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  ${JSON.stringify(schemaData, null, 2)}
  </script>

  <style>
    :root {
      --bg: #0d1117;
      --card: #161b22;
      --accent: #238636;
      --text: #c9d1d9;
      --highlight: #58a6ff;
    }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
    }
    .container {
      max-width: 750px;
      width: 100%;
      background: var(--card);
      padding: 28px;
      border-radius: 10px;
      border: 1px solid #30363d;
    }
    h1 { color: var(--highlight); margin-top: 0; }
    .subtitle { font-size: 0.9em; color: #8b949e; margin-bottom: 20px; }
    .genius-btn {
      display: inline-block;
      background: #ffff64;
      color: #000;
      padding: 12px 18px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
      margin-top: 15px;
    }
    .node-status {
      margin-top: 30px;
      padding: 12px;
      background: #010409;
      border-left: 4px solid var(--accent);
      font-family: monospace;
      font-size: 0.85em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${trackConfig.title}</h1>
    <div class="subtitle">Artista: ${trackConfig.artist} • Infraestructura HormigasAIS</div>

    <p>${trackConfig.description}</p>

    <a href="${trackConfig.geniusUrl}" target="_blank" rel="noopener noreferrer" class="genius-btn">
      📜 Ver Letra Oficial en Genius
    </a>

    <div class="node-status">
      🐜 [HormigasAIS Node] Estado: Sincronizado | Dispositivo: Termux Edge
    </div>
  </div>
</body>
</html>`;

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

fs.writeFileSync(path.join(publicDir, 'index.html'), htmlContent);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${trackConfig.siteUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log("✅ [HormigasAIS] Vistas SEO, Schema.org y sitemap.xml compilados exitosamente.");
