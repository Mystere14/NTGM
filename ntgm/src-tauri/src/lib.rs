// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use Vec;

mod models;
use models::InputData;
use models::ElementVector;

mod logic;
use logic::format_input;
use logic::logic;

mod error_handler;



#[tauri::command]
fn handle_input(data: InputData) 
{
    let mut element_vector: ElementVector= ElementVector
    {
        enumeration_vector: vec![],
        word_list_vector: vec![],

        enumeration_vector_same_steps: vec![],
        word_list_vector_same_steps: vec![],

        enumeration_word_list_vector_different_steps: vec![],
    };

    format_input(&data,&mut element_vector);

    logic(data.text, &mut element_vector, data.bool_filter);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![handle_input])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
    