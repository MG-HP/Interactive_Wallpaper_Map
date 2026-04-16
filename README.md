# Interactive Wallpaper Map

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
