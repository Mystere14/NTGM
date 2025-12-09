use Refcell;

fn formatInput() -> ()
{
    numbers: &[enumeration];
    wordListArray: &[wordList];
    for i in numberClass.len()
    {
        numbers[i].initialNumber = numberClass[i].start[2].trim().iter().collect::<String>().parse::<i32>().expect("Failed to parse integer for the starting number");
        numbers[i].currentNumber = numbers[i].initialNumber;
        numbers[i].addNumber = numberClass[i].add.trim().parse::<i32>().expect("Failed to parse integer for the addition number");
        numbers[i].endNumber = numberClass[i].end.trim().parse::<i32>().expect("Failed to parse integer for the ending number");
        numbers[i].symbolDefinition = numberClass[i].start.trim()[0].parse::<char>();
    }

    for i in wordListClass.len()
    {
        wordListArray[i].symbolDefinition =wordListClass.trim()[0].parse::<char>();
        wordListArray[i].list =wordListClass[2].trim().iter().collect::<String>().parse::<array<string>>().expect("Failed to parse string to list");
    }

    differentStepList:[enumeration];
    for i in textStep.len()
    {
        for j in numberClass.len()
        {
            if(textStep[i]==numbers[j].symbolDefinition)
            {
                differentStepList[i]=numbers[j].symbolDefinition;
                break;
            }
        }
    }
}


//%
fn placeInput() -> ()
{
    buffer: &str="";
    for i in text.len()    
    {   
        if(text[i] == '\\')
        {
            buffer += text[i+1];
            i+=2;
        }
        else if(text[i] == '{')
        {
            operationBuf: &str="";
            isAnExistingSymbol: bool =false;
            while(text[i] != '}')
            {
                for j in numbers.len()
                {
                    if(text[i] == numbers[j].symbolDefinition)
                    {
                        operationBuf+=numbers[j].currentNumber.to_string();
                        isAnExistingSymbol=true;
                        break;
                    }
                }
                if(!isAnExistingSymbol)
                {
                    operationBuf+=text[i];
                }
                i++;
            }
            buffer += operationBuf.operate();
        }
        else
        {
            buffer += text[i];
        }
    }
    for i in numbers.len()
    {
        if(!numbers[i].isDifferentSteps)
        {
            numbers[i].currentNumber += numbers[i].addNumber;
        }
    }
    for i in numbersDifferentSteps.len()
    {
        numbers[i].currentNumber += numbers[i].addNumber;
        if(numbers[i].currentNumber==numbers[i].endNumber)
        {
            numbers[i].currentNumber = numbers[i].initialNumber;
        }
        else
           break;
    }
}