import { invoke } from "@tauri-apps/api/core";

export type WallpaperCommandError = {
  code: string;
  message: string;
};

/**
 * UI-safe integration point for wallpaper updates.
 * Keeps Windows details out of React components and map/export state.
 */
export async function setExportedMapAsWallpaper(exportPath: string): Promise<void> {
  await invoke("set_map_export_as_wallpaper", { exportPath });
}
