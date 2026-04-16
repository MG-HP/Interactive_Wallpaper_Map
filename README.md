# Interactive Wallpaper Map

Version 1 MVP for marking country travel statuses directly on a world map.

## Features
- World map (countries only) rendered from GeoJSON.
- Country selection by clicking map polygons.
- Country selection by search input + datalist.
- Status assignment via dropdown:
  - Visited (visually strongest emphasis)
  - Want to visit
  - Lived in
  - Transited through
- Local-only persistence via `localStorage`.

## Architecture
The app is deliberately split into lightweight layers:

- `src/ui/` → DOM controls, events, search/list handling.
- `src/map/` → map rendering + map-specific interaction.
- `src/core/` → status definitions and status/business logic.
- `src/data/` → persistence adapter (`localStorage`).

This keeps style/UI changes independent from map logic and data storage.

## Run locally
From this folder:

```bash
cd /workspace/Interactive_Wallpaper_Map
python -m http.server 4173
```

Then open `http://localhost:4173`.

> Note: map geometry is fetched at runtime from a public GeoJSON URL, so internet access is required for the map to load.
