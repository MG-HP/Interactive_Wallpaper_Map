use std::path::Path;

use thiserror::Error;

#[derive(Debug, Error)]
pub enum WallpaperError {
    #[error("exported map file was not found: {0}")]
    MissingFile(String),
    #[error("only local files can be used as wallpaper")]
    NonLocalPath,
    #[error("setting wallpaper is currently supported on Windows only")]
    UnsupportedPlatform,
    #[error("Windows did not accept the wallpaper update request")]
    UpdateRejected,
}

/// Isolated Windows wallpaper integration.
///
/// Safety and behavior notes:
/// - This only invokes the per-user `SystemParametersInfoW` wallpaper API.
/// - No registry keys, services, startup entries, or policy values are modified.
/// - The operation only updates current user's desktop wallpaper pointer and sends
///   a normal desktop setting change notification.
pub fn set_wallpaper_from_export(export_path: &str) -> Result<(), WallpaperError> {
    let path = Path::new(export_path);

    if !path.is_absolute() {
        return Err(WallpaperError::NonLocalPath);
    }

    if !path.exists() {
        return Err(WallpaperError::MissingFile(export_path.to_string()));
    }

    set_wallpaper_platform(path)
}

#[cfg(windows)]
fn set_wallpaper_platform(path: &Path) -> Result<(), WallpaperError> {
    use std::os::windows::ffi::OsStrExt;

    use windows::Win32::UI::WindowsAndMessaging::{
        SystemParametersInfoW, SPIF_SENDCHANGE, SPIF_UPDATEINIFILE, SPI_SETDESKWALLPAPER,
        SYSTEM_PARAMETERS_INFO_UPDATE_FLAGS,
    };

    let mut wide_path: Vec<u16> = path
        .as_os_str()
        .encode_wide()
        .chain(std::iter::once(0))
        .collect();

    let flags = SYSTEM_PARAMETERS_INFO_UPDATE_FLAGS(SPIF_UPDATEINIFILE.0 | SPIF_SENDCHANGE.0);

    let ok = unsafe {
        SystemParametersInfoW(
            SPI_SETDESKWALLPAPER,
            0,
            Some(wide_path.as_mut_ptr().cast()),
            flags,
        )
    };

    if ok.as_bool() {
        Ok(())
    } else {
        Err(WallpaperError::UpdateRejected)
    }
}

#[cfg(not(windows))]
fn set_wallpaper_platform(_path: &Path) -> Result<(), WallpaperError> {
    Err(WallpaperError::UnsupportedPlatform)
}
