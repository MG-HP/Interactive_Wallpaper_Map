#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn get_platform_hint() -> String {
  "windows-first-foundation".to_string()
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_platform_hint])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
