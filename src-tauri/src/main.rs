#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::path::PathBuf;
use std::fs::{self, File};

#[tauri::command] // применяется то бы функцию можно было вызвать из invoke 
fn open_file(path: String) -> Result<String, String> { // применяем path: String и возвращаем Rusult<String, String> как наш путь и обработку
    fs::read_to_string(PathBuf::from(path))
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn save_file(content: String, path: String) -> Result<(), String> {
    fs::write(PathBuf::from(path), content)
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn create_file(path: String) -> Result<(), String> {
    // File::create_new создает новый файл и возвращает ошибку, если он уже существует.
    // Это атомарная операция, что предотвращает гонку состояний (race conditions).
    File::create_new(PathBuf::from(path))
        .map(|_| ()) // В случае успеха отбрасываем результат (обработчик файла) и возвращаем пустой Ok
        .map_err(|e| e.to_string()) // В случае ошибки превращаем ее в строку для фронтенда
}

#[tauri::command]
fn delete_file(path: String) -> Result<(), String> {
    fs::remove_file(PathBuf::from(path))
        .map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![save_file, open_file, create_file, delete_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}


