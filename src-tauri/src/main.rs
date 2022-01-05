#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![save_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn save_file(filepath: String, contents: String) -> Result<String, String> {
  fs::write(filepath, contents).expect("Saving the file failed.");
  return Ok("File saved successfully.".into());
}
