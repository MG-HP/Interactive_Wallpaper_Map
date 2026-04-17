use serde::Serialize;

use crate::windows_integration::wallpaper::{set_wallpaper_from_export, WallpaperError};

#[derive(Debug, Serialize)]
pub struct WallpaperCommandError {
    code: &'static str,
    message: String,
}

impl From<WallpaperError> for WallpaperCommandError {
    fn from(value: WallpaperError) -> Self {
        let code = match value {
            WallpaperError::MissingFile(_) => "MISSING_EXPORT",
            WallpaperError::NonLocalPath => "NON_LOCAL_PATH",
            WallpaperError::UnsupportedPlatform => "UNSUPPORTED_PLATFORM",
            WallpaperError::UpdateRejected => "WINDOWS_REJECTED_UPDATE",
        };

        Self {
            code,
            message: value.to_string(),
        }
    }
}

#[tauri::command]
pub fn set_map_export_as_wallpaper(export_path: String) -> Result<(), WallpaperCommandError> {
    set_wallpaper_from_export(&export_path).map_err(Into::into)
}
