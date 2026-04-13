# Interactive Wallpaper Map

Windows-first desktop prototype built with **Tauri + React + TypeScript**.

## Where to run commands

Run all local commands from the repository root:

```bash
cd /workspace/Interactive_Wallpaper_Map
```

## Quick start

```bash
npm install
npm run tauri dev
```

## Architecture (MVP foundation)

The project is intentionally split by **feature modules** so the visual layer can be restyled without rewriting application logic.

### Frontend (`src/`)

- `app/`: app composition/root wiring.
- `features/map/`: map rendering surface (currently placeholder).
- `features/countries/`: visited-country domain state and UI.
- `features/export/`: export UX + future map-to-image pipeline.
- `features/wallpaper/`: wallpaper UX + future native invocation.
- `shared/components/`: reusable shell/layout building blocks.
- `shared/styles/`: design tokens and global styling.

### Desktop shell (`src-tauri/`)

- `src/main.rs`: Tauri app entry + command registration.
- `tauri.conf.json`: window/build/bundle configuration.
- `Cargo.toml`: Rust dependencies and package metadata.

## Why this structure works

1. **Modular evolution**: each future capability (map interactivity, export, wallpaper integration) has a dedicated module.
2. **Design flexibility**: styles are centralized in `shared/styles`, making premium themes or style refreshes straightforward.
3. **Windows-first readiness**: Tauri backend exists now, so adding a Windows wallpaper command later is incremental rather than a rewrite.
4. **Safe MVP scope**: the app runs today with clear placeholders for the next implementation steps.

## Next implementation steps

1. Replace `WorldMapCanvas` placeholder with an SVG/TopoJSON world map layer and hit-testing.
2. Persist country state (Tauri store or local database).
3. Add export pipeline (frontend canvas/SVG render + Rust-side file save helper).
4. Add explicit Windows wallpaper command in Rust (behind platform gating).

> ⚠️ Future wallpaper integration will touch OS behavior on Windows. Keep it behind a clear user-confirmed action and test on a non-critical machine first.
