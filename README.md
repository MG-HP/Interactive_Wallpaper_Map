# Interactive Wallpaper Map

<<<<<<< codex/refine-app-ui-and-structure-for-elegance
A polished MVP shell for an interactive wallpaper map builder.

## Start here (important)

Run local commands from this folder:

```bash
cd /workspace/Interactive_Wallpaper_Map
```

## Structure

```text
.
├── index.html
└── src
    ├── app.js
    └── styles
        ├── tokens.css      # design tokens / theming values
        ├── base.css        # reset + typography + element defaults
        ├── layout.css      # page/grid layout and breakpoints
        └── components.css  # reusable UI component classes
```

## Styling approach

The UI is intentionally split into 4 style layers so future changes are easy:

1. **Tokens (`tokens.css`)**
   - Centralized colors, radii, spacing, shadows, font family.
   - Includes a `:root[data-theme="light"]` override so user-selectable themes can expand later with minimal rewiring.
2. **Base (`base.css`)**
   - Shared global defaults and typography.
3. **Layout (`layout.css`)**
   - Top-level app shell and responsive panel arrangement.
4. **Components (`components.css`)**
   - Reusable panel/button/chip/field primitives and map workspace pieces.

## Future-ready notes

Current UI keeps MVP simple while preparing for:

- user-selectable themes (token overrides)
- map theme presets (segmented control in map toolbar)
- dual-monitor and alternate layout presets (resolution chips + responsive grid structure)
- print/poster mode (export group and control placeholders)

## Quick local preview

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.
=======
## Windows wallpaper setting (Tauri)

This repository now includes an isolated Windows wallpaper integration path for one-click wallpaper updates from the latest exported map image.

### Integration method used

The backend uses `SystemParametersInfoW` with `SPI_SETDESKWALLPAPER` (Windows user desktop API).

Safety characteristics of this method:
- Per-user wallpaper update only.
- No machine-level policy changes.
- No services/startup tasks.
- No unrelated system settings modified.

### Separation of concerns

- `src-tauri/src/windows_integration/wallpaper.rs`
  - Windows-specific wallpaper behavior only.
- `src-tauri/src/commands/wallpaper.rs`
  - Tauri command surface for UI to call.
- `src/wallpaperClient.ts`
  - Frontend bridge wrapper around Tauri invoke.
- `src/components/SetAsWallpaperButton.tsx`
  - UI warning + user-triggered action only.

### Safety warning behavior

Before any wallpaper change is attempted, the button flow shows an explicit warning/confirmation dialog.

### Limitations

- The command returns `UNSUPPORTED_PLATFORM` on non-Windows OS.
- If the exported file was moved/deleted, the command returns `MISSING_EXPORT`.
- The API depends on Windows accepting the update request (`WINDOWS_REJECTED_UPDATE` on failure).

### Local command folder

Run local project commands from:

```bash
cd /workspace/Interactive_Wallpaper_Map
```
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
>>>>>>> main
