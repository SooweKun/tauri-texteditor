#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::path::PathBuf;
use std::fs::{self, File};
use serde::Serialize;

#[derive(Serialize, Debug)]
struct FileInfo {
    path: String,
    name: String,
}

#[derive(Serialize)]
struct FileData {
    content: String,
    name: String,
}

#[tauri::command] // применяется что бы функцию можно было вызвать из invoke 
fn open_file(path: String)  { // применяем path: String и возвращаем Rusult<String, String> как наш путь и обработку
    let data_result = File::open(path);
    let data_file = match data_result {
        Ok(file) => file,
        Err(error) => panic!("Problem opening the data file: {:?}", error),
    };

    println!("Data file: {:?}", data_file);
}

#[tauri::command]
fn read_file(path: PathBuf) -> Result<FileData, String> {

    let name = path
        .file_name()
        .and_then(|os_str| os_str.to_str())
        .ok_or_else(|| "Не удалось получить имя файла".to_string())?
        .to_string();

        let content = std::fs::read_to_string(&path)
        .map_err(|err| format!("Ошибка при чтении файла: {}", err))?;

        Ok(FileData {
            name,
            content,
        })

}

#[tauri::command]
fn save_file(content: String, path: String) -> Result<(), String> {
    fs::write(PathBuf::from(path), content)
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn create_file(path: String) -> Result<(), String> {
    // File::create_new создает новый файл и возвращает ошибку, если он уже существует.
    // это атомарная операция, что предотвращает гонку состояний (race conditions).
    File::create_new(PathBuf::from(path))
        .map(|_| ()) // в случае успеха отбрасываем результат (обработчик файла) и возвращаем пустой Ok
        .map_err(|e| e.to_string()) // в случае ошибки превращаем ее в строку для фронтенда
}

#[tauri::command]
fn delete_file(path: String) -> Result<(), String> {
    fs::remove_file(PathBuf::from(path))
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn get_files(path: String) -> Result<Vec<FileInfo>, String> {
    use std::path::Path;
    
    let file_list: Vec<FileInfo> = std::fs::read_dir(Path::new(&path))
        .map_err(|e| e.to_string())?
        .filter_map(|entry| {
            entry.ok().and_then(|e| {
                if e.file_type().ok()?.is_file() {
                    let file_path = e.path();
                    let path_str = file_path.to_str()?.to_string();
                    let name = file_path
                        .file_stem()?
                        .to_str()?
                        .to_string();
                    
                    Some( FileInfo {
                        path: path_str,
                        name,
                    })
                } else {
                    None
                }
            })
        })
        .collect();
    
    println!("file_list: {:?}", file_list);
    Ok(file_list)
}

fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![save_file, open_file, create_file, delete_file, get_files, read_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
