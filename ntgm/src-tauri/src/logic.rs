use crate::models;
use crate::error_handler;

use models::InputData;
use models::Enumeration;
use models::WordList;
use models::ElementVector;

use error_handler::check_init_symbol;
use error_handler::check_init_symbol_is_not_operation_symbol;
use error_handler::check_filter_is_existing_symbol_filter_or_present_the_same_symbol;
use error_handler::check_can_reach_the_limit;
use error_handler::check_is_the_same_symbol;
use error_handler::check_is_existing_symbol;

use meval::eval_str;
use regex::Regex;
use arboard::Clipboard;

pub fn format_input(data: &InputData, element_vector: &mut ElementVector) -> ()
{
    let mut check_error_same_symbol :Vec<char>= vec![];

    element_vector.enumeration_word_list_vector_different_steps.resize(data.filter_loop.chars().count(), models::StepRef::Enumeration(usize::MAX));

    for i in 0..data.start_numbers.len() as u32
    {
        let start_numbers=&data.start_numbers[i as usize];
        check_init_symbol(data.start_numbers[i as usize].chars().nth(1));
        check_init_symbol_is_not_operation_symbol(data.word_list_array[i as usize].chars().nth(0));

        let init_value=start_numbers.chars().skip(2).collect::<String>().trim().parse::<f64>().expect("Failed to parse integer for the starting number");
        let symbol_char=start_numbers.trim().chars().nth(0).expect("String is empty");
        let mut is_in_filter_loop: bool=false;

        for j in data.filter_loop.chars()
        {
            if symbol_char==j
            {
                is_in_filter_loop = data.bool_filter;
                break;
            }
        }

        let new_enum = 
        Enumeration
        {
            current_number: init_value,
            initial_number: init_value,
            add_number: data.add_numbers[i as usize].trim().parse::<f64>().expect("Failed to parse integer for the addition number"),
            end_number: data.end_numbers[i as usize].trim().parse::<f64>().expect("Failed to parse integer for the ending number"),
            symbol_definition: symbol_char,
            is_different_steps: is_in_filter_loop,
        };
        check_error_same_symbol.push(new_enum.symbol_definition);
        check_can_reach_the_limit(new_enum.initial_number, new_enum.add_number, new_enum.end_number);

        if new_enum.is_different_steps
        {
            let index=data.filter_loop.chars().position(|x| x==new_enum.symbol_definition).expect("Failed to get index of different steps enumeration/wordlist") as usize;
            element_vector.enumeration_word_list_vector_different_steps[index]=models::StepRef::Enumeration(i as usize);
        }
        else
        {
            element_vector.enumeration_vector_same_steps.push(i as usize);
        }

        element_vector.enumeration_vector.push(new_enum);
    }
    let bool_filter=data.bool_filter;
    let filter_loop= &data.filter_loop;
    for i in 0..data.word_list_array.len() as u32
    {
        let word_list=&data.word_list_array[i as usize];

        check_init_symbol(word_list.chars().nth(1));
        check_init_symbol_is_not_operation_symbol(word_list.chars().nth(0));

        let symbol_char= word_list.trim().chars().nth(0).expect("String is empty");
        let string_list: &str= &word_list.chars().skip(2).collect::<String>();
        let regex = Regex::new(r#""\s*,\s*""#).expect("Invalid regex");
        let mut vector_formatted : Vec<String>=regex.split(string_list).map(|s| s.to_string()).collect();
        
        let max_range:usize=vector_formatted.len() as usize;
        
        
        vector_formatted[0]=vector_formatted[0].trim_start_matches("[\"").to_string();
        vector_formatted[max_range-1]=vector_formatted[max_range-1].trim_end_matches("\"]").to_string();

        let mut is_in_filter_loop: bool=false;
        for j in filter_loop.chars()
        {
            if symbol_char==j
            {
                is_in_filter_loop = bool_filter;
                break;
            }
        }

        let new_wordlist = WordList
        {
            symbol_definition: symbol_char,
            index: 0,
            end_index: max_range, //missing -1 is on purpose 
            list: vector_formatted,
            is_different_steps: is_in_filter_loop,
        };

        check_error_same_symbol.push(new_wordlist.symbol_definition);

        if new_wordlist.is_different_steps
        {
            let index=data.filter_loop.chars().position(|x| x==new_wordlist.symbol_definition).expect("Failed to get index of different steps enumeration/wordlist") as usize;
            element_vector.enumeration_word_list_vector_different_steps[index]=models::StepRef::WordList(i as usize);
        }
        else
        {
            element_vector.word_list_vector_same_steps.push(i as usize);
        }

        element_vector.word_list_vector.push(new_wordlist);
    }
    check_is_the_same_symbol(&check_error_same_symbol);
    if bool_filter
    {
        check_filter_is_existing_symbol_filter_or_present_the_same_symbol(&check_error_same_symbol, &filter_loop);
    }
    
}


pub fn logic(text: String, element_vector: &mut ElementVector, bool_filter: bool) -> ()
{
    
    let mut buffer: String="".to_string();
    let mut max : u64 =0;

    
    
    for i in &mut element_vector.enumeration_vector_same_steps
    {
        let enumeration=&element_vector.enumeration_vector[*i];

        let init_number: f64 =enumeration.initial_number;
        let add_number: f64 =enumeration.add_number;
        let end_number: f64 =enumeration.end_number;
        if (end_number-init_number)/ add_number > max as f64
        {
            max = ((end_number-init_number)/ add_number) as u64;
            if(((end_number-init_number)/ add_number) - max as f64) != 0.0
            {
                max+=1 as u64;
            }
        }
    }


    
    for i in &mut element_vector.word_list_vector_same_steps
    {
        let wordlist= &element_vector.word_list_vector[*i];

        let count = wordlist.list.len() as u64;
        if count as u64 > max
        {
            max = count as u64;
        }
    }
    
    if bool_filter
    {
        let mut sum_differentstep: u64=1;
        for i in &mut element_vector.enumeration_word_list_vector_different_steps
        {
            match i 
            {
                models::StepRef::Enumeration(i) =>
                {
                    let init_number: f64 =element_vector.enumeration_vector[*i].initial_number;
                    let add_number: f64 =element_vector.enumeration_vector[*i].add_number;
                    let end_number: f64 =element_vector.enumeration_vector[*i].end_number;

                    if(((end_number-init_number)/ add_number) - max as f64) != 0.0
                    {
                        sum_differentstep *= (((end_number-init_number)/ add_number) )as u64;
                    }
                    else
                    {
                        sum_differentstep *= (((end_number-init_number)/ add_number)+1.0 )as u64;
                    }
                }
                models::StepRef::WordList(i) =>
                {
                    let length: u64 =element_vector.word_list_vector[*i].list.len() as u64;

                    if length==0 {sum_differentstep*=1;} else {sum_differentstep *= length as u64;}
                }
            }
        }
        if sum_differentstep > max as u64 {max = sum_differentstep as u64;}
    }

    for _i in 0..max
    {
        let mut j: usize =0;

        while j <text.chars().count()-1
        {   
            let mut current_char= text.chars().nth(j);
            if current_char == Some('\\')
            {
                buffer.push(text.chars().nth(j+1).expect("Failed to get character after escape"));
                j+=2;
                continue;
            }
            else if current_char == Some('{')
            {
                let mut operation_buf: String="".to_string();
                
                j+=1;

                let mut first_wordlist: Option<WordList>=None;
                current_char= text.chars().nth(j);

                while current_char != Some('}')
                {
                    
                    let mut is_an_existing_symbol: bool =false;

                    for k in &mut element_vector.enumeration_vector
                    {
                        if current_char == Some(k.symbol_definition as char)
                        {
                            operation_buf.push_str(&k.current_number.to_string());
                            is_an_existing_symbol=true;
                            continue;
                        }
                    }

                    if !is_an_existing_symbol
                    {
                        for k in &mut element_vector.word_list_vector
                        {
                            if current_char == Some(k.symbol_definition as char)
                            {
                                if first_wordlist.is_some()
                                {
                                    operation_buf.push_str(&(k.index+1).to_string());
                                }
                                else
                                {
                                    first_wordlist=Some(k.clone());
                                    operation_buf.push_str(&(k.index).to_string());
                                }
                                is_an_existing_symbol=true;
                                continue;
                            }
                        }
                    }

                    if !is_an_existing_symbol
                    {
                        check_is_existing_symbol(current_char);
                        operation_buf.push(current_char.expect("Failed to get character inside braces"));
                    }                     
                    j+=1;
                    current_char= text.chars().nth(j);
                }

                if let Some(first_wordlist) = first_wordlist
                {
                    let add_index: usize= eval_str(&operation_buf).expect("Eval failed") as usize; 
                    let index=add_index % first_wordlist.list.len();
                    buffer.push_str(first_wordlist.list[index].as_str());
                    j+=1;
                    continue;
                }
                else if let Ok(result) = eval_str(&operation_buf) 
                    {buffer.push_str(&result.to_string());}
                else 
                    {buffer.push_str(&operation_buf);}
            }
            else
            {
                buffer.push(current_char.expect("Failed to get character outside braces"));
            }   
            j+=1;
        }

        for j in element_vector.enumeration_vector_same_steps.iter_mut()
        {
            let enumeration=&mut element_vector.enumeration_vector[*j];

            let current_number=&mut enumeration.current_number;
            let add_number=enumeration.add_number;
            let end_number=enumeration.end_number;

            *current_number +=add_number;
            if *current_number == end_number
            {
                *current_number = enumeration.initial_number;
            }
        }

        for j in &mut element_vector.word_list_vector_same_steps
        {
            let wordlist= &mut element_vector.word_list_vector[*j];

            let index= &mut wordlist.index;  
            *index +=1;
            if wordlist.end_index==*index
            {
                *index = 0;
            }
        }

        
        if bool_filter
        {
            for j in &mut element_vector.enumeration_word_list_vector_different_steps
            {
                match j
                {    
                    models::StepRef::Enumeration(j) =>
                    {
                        let enumeration=&mut element_vector.enumeration_vector[*j];
                            
                        let current_number= &mut enumeration.current_number;
                        *current_number += enumeration.add_number;
                        if *current_number == enumeration.end_number{*current_number = enumeration.initial_number; }
                        else{break;}
                            
                    }
                    models::StepRef::WordList(j) =>
                    {
                        let wordlist= &mut element_vector.word_list_vector[*j];

                        let index = &mut wordlist.index;
                        *index +=1;
                        if wordlist.end_index==*index {*index = 0;}
                        else{break;}
                    }
                }
            }
        }
    }

    println!("Final output: {}",buffer);

    let mut clipboard = Clipboard::new().expect("Failed to initialize clipboard");
    clipboard.set_text(buffer).expect("Failed to set clipboard text");
}

