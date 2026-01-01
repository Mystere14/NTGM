

pub fn check_init_symbol(current_symbol : Option<char>)
{
    if let Some(current_symbol) = current_symbol 
    {
        if current_symbol != '='
        {
            panic!("Numbers and Wordlists must initiaite with a single symbol follow by a = ");
        }
    }
}

pub fn check_init_symbol_is_not_operation_symbol(current_symbol : Option<char>)
{
    if let Some(current_symbol) = current_symbol 
    {
        if current_symbol=='*' || current_symbol=='+' || current_symbol=='/' || current_symbol=='-'|| current_symbol=='%' || current_symbol=='^' || current_symbol=='.'
        {
            panic!("Definition symbol cannot be an operation symbol such as +, -, *, /, ., ^, %");
        }
    }
}

pub fn check_can_reach_the_limit(initial_number: f64 ,add_number: f64, end_number: f64)
{   
    if add_number == 0.0
    {
        panic!("The increment number cannot be zero ");
    }
    else if (end_number - initial_number) % add_number != 0.0
    {
        panic!("The Number cannot reach the end number");
    }
    else if (end_number - initial_number) / add_number < 0.0
    {
        panic!("The Number cannot reach the end number");
    }
}

pub fn check_is_existing_symbol(current_symbol : Option<char>)
{
    if let Some(current_symbol) = current_symbol 
    {
        if !(current_symbol.is_ascii_digit() || current_symbol=='*' || current_symbol=='+' || current_symbol=='/' || current_symbol=='-'|| current_symbol=='%' || current_symbol=='^' || current_symbol=='.')
        {
            panic!("Symbol is used yet is not initialised as a Number or a Wordlist, the symbol is: {}", current_symbol);
        }
    }
}

pub fn check_is_the_same_symbol(check_error_same_symbol: &Vec<char>)
{
    let same_symbol_length= check_error_same_symbol.len();
    for i in 0..same_symbol_length
    {
        for j in 0..same_symbol_length
        {
            if i==j {continue;}
            else if check_error_same_symbol[i]==check_error_same_symbol[j] {
                panic!("Several Numbers or/and Wordlists carry the same definition symbol which is the symbol: {}", check_error_same_symbol[i]);
            }
        }
    }
}

pub fn check_filter_is_existing_symbol_filter_or_present_the_same_symbol(check_error_same_symbol: &Vec<char>, filter_loop: &String)
{
    let mut is_same_symbol: bool= false;
    for i in 0..filter_loop.chars().count()
    {
        for j in 0..check_error_same_symbol.len()
        {
            if filter_loop.chars().nth(i as usize).unwrap()==check_error_same_symbol[j]
            {
                if !is_same_symbol
                {is_same_symbol=true;}
                else
                {panic!("The filter symbol {} is present several times in the filter loop", filter_loop.chars().nth(i as usize).unwrap());}
            }
            
        }

        if !is_same_symbol
        { panic!("The filter symbol {} is not defined as a Number or a Wordlist", filter_loop.chars().nth(i as usize).unwrap());}
        is_same_symbol=false;
    }
}
