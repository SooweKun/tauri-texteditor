#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde::Serialize;
use std::fs::{self, File};
use std::path::PathBuf;
use tauri_plugin_store::StoreExt;
use tauri::Manager;
use std::path::Path;

#[derive(Serialize, Debug)]
struct FileInfo {
    path: String,
    name: String,
}

#[derive(Serialize)]
struct FileData {
    content: String,
    name: String,
    path: PathBuf,
}

#[tauri::command] // применяется что бы функцию можно было вызвать из invoke
fn open_file(path: String) {
    // применяем path: String и возвращаем Rusult<String, String> как наш путь и обработку
    let data_result = File::open(path);
    let data_file = match data_result {
        Ok(file) => file,
        Err(error) => panic!("Problem opening the data file: {:?}", error),
    };

    println!("Data file: {:?}", data_file);
}

#[tauri::command]
fn search_file(path: PathBuf, name: String) -> Result<FileInfo, String> {
    let target_name = name.to_lowercase();

    let mut file_list = std::fs::read_dir(&path)
        .map_err(|e| e.to_string())?
        .filter_map(|entry| {
            let e = entry.ok()?;
            let path = e.path();

            let stem = path.file_stem()?.to_str()?.to_lowercase();
            let full_name = path.file_name()?.to_str()?.to_lowercase();

            if stem == target_name || full_name == target_name {
                Some(FileInfo {
                    path: path.to_str()?.to_string(),
                    name: stem.to_string(),
                })
            } else {
                None
            }
        });

    file_list
        .next()
        .ok_or_else(|| format!("File '{}' not found in {:?}", name, path))
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
        path,
    })
}

#[tauri::command]
fn rename_file(old_path: String, new_name: String) -> Result<String, String> {
    let old_path = Path::new(&old_path);

    let parent = old_path.parent().ok_or("Не удалось найти директорию файла")?;
    let new_path = parent.join(new_name);

    fs::rename(&old_path, &new_path)
        .map_err(|e| format!("Ошибка при переименовании, {}", e))?; // не забывать ставить "?" это сука завершает выполнение кода и возвращает нас в начало что бы ошибок дальше не было 

    Ok(new_path.to_string_lossy().into_owned())
}

#[tauri::command]
fn save_file(content: String, path: String) -> Result<(), String> {
    fs::write(PathBuf::from(path), content).map_err(|e| e.to_string())
}

#[tauri::command]
fn create_file(path: String) -> Result<String, String> {
    // File::create_new создает новый файл и возвращает ошибку, если он уже существует.
    // это атомарная операция, что предотвращает гонку состояний (race conditions).

    let base_name = "Новый Документ";
    let mut index = 0;
    let dir_path = PathBuf::from(path);

    loop {
        let file_name = format!("{} {}", base_name, index);
        let full_path = dir_path.join(&file_name);

        match File::create_new(&full_path) {
            Ok(_) => return Ok(file_name),
            Err(e) => {
                if e.kind() == std::io::ErrorKind::AlreadyExists
                 { // мы создали loop и поскольку в расте его нужно через match как промис обрабатывать мы на обработчик ошибок навешали свои условия вытянули конкретно ошибку о том чт офайл уже существует и переделываем его индес при ошибке 
                    index += 1;
                    continue;
                } else {
                    return Err(format!("Ошибка при создании файла: {}", e))
                }
            }
        }
    }

}

#[tauri::command]
fn delete_file(path: String) -> Result<(), String> {
    fs::remove_file(PathBuf::from(path)).map_err(|e| e.to_string())
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
                    let name = file_path.file_stem()?.to_str()?.to_string();

                    Some(FileInfo {
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

#[tauri::command]
fn finish_unboarding(app: tauri::AppHandle) {
    if let Some(main_window) = app.get_webview_window("main") {
        main_window.show().unwrap();
        main_window.set_focus().unwrap(); 
    }

    if let Some(unboard_window) = app.get_webview_window("unboard") {
        unboard_window.close().unwrap();
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            save_file,
            open_file,
            create_file,
            delete_file,
            get_files,
            read_file,
            search_file,
            finish_unboarding,
            rename_file
        ])
        .setup(|app| {
            let data = app.store("settings.json");
            let main_window = app.get_webview_window("main").expect("Window 'main' not found");
            let unboard_window = app.get_webview_window("unboard").expect("Window 'unboard' not found");

            if let Some(item) = data?.get("vaults") {
                let has_item = item.as_array().map(|arr| arr.is_empty()).unwrap_or(true); // как я понял нужно обязательно проверять массив ли это :/

                if has_item {
                    unboard_window.show()?;
                    unboard_window.center()?;
                } else {
                    main_window.show()?;
                }
            }
            else{
               unboard_window.show()?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
