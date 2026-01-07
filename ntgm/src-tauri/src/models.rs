
use serde::Deserialize;
#[derive(Deserialize, Debug)]
pub struct InputData
{
    pub text: String,
    pub start_numbers: Vec<String>,
    pub add_numbers: Vec<String>,
    pub end_numbers: Vec<String>,
    pub bool_filter: bool,
    pub filter_loop: String,
    pub word_list_array: Vec<String>,
}

#[derive(Clone)] //present to allow resizing vectors of this enum
pub enum StepRef {
    Enumeration(usize),
    WordList(usize),
}

pub struct ElementVector
{
    pub enumeration_vector: Vec<Enumeration>,
    pub word_list_vector: Vec<WordList>,

    pub enumeration_vector_same_steps: Vec<usize>,
    pub word_list_vector_same_steps: Vec<usize>,

    pub enumeration_word_list_vector_different_steps: Vec<StepRef>,
}

pub struct Enumeration
{
    pub current_number: f64,
    pub initial_number: f64,
    pub add_number: f64,
    pub end_number: f64,
    pub symbol_definition: char,
    pub is_different_steps: bool,
}

#[derive(Clone)]
pub struct WordList
{
    pub symbol_definition: char,
    pub list: Vec<String>,
    pub index: usize,
    pub end_index: usize,
    pub is_different_steps: bool,
}