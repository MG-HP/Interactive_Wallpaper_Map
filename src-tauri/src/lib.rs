mod commands;
mod windows_integration;

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::wallpaper::set_map_export_as_wallpaper
        ])
        .run(tauri::generate_context!())
        .expect("error while running interactive wallpaper map application");
}
