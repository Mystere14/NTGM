import { hide } from "@tauri-apps/api/app";
import { invoke } from "@tauri-apps/api/core";

//snake_case variable are used for exported variable to Rust side compatibility

const MIN=33;

const MAX=0x10ffff;

const usedSymbols = new Set<string>();

let wordListLength= 1;






(document.getElementById("addNumberButtonContainer") as HTMLDivElement).addEventListener("click", async () =>
{

  const container= document.getElementById("numberSubContainer") as HTMLDivElement;
  const subContainer= container.getElementsByClassName("numberOptionsContainer") as HTMLCollectionOf<HTMLDivElement>;


  usedSymbols.add("+");
  usedSymbols.add("-");
  usedSymbols.add("*");
  usedSymbols.add("/");
  usedSymbols.add("=");
  usedSymbols.add("%");
  usedSymbols.add(".");
  usedSymbols.add("^");
  
  usedSymbols.add("0");
  usedSymbols.add("1");
  usedSymbols.add("2");
  usedSymbols.add("3");
  usedSymbols.add("4");
  usedSymbols.add("5");
  usedSymbols.add("6");
  usedSymbols.add("7");
  usedSymbols.add("8");
  usedSymbols.add("9");

  const containerWordlist= document.getElementById("wordListContainer") as HTMLDivElement;
  const subContainerWordlist= containerWordlist.getElementsByClassName("wordListSubContainer") as HTMLCollectionOf<HTMLDivElement>;

  Array.from(subContainer).forEach((block) => {
    const startInput = block.getElementsByClassName("startNumberInput")[0] as HTMLInputElement;
    const symbol = startInput.value.trim().charAt(0);
    usedSymbols.add(symbol);
  });

  Array.from(subContainerWordlist).forEach((block) => {
    const startInput = block.getElementsByClassName("wordListInput")[0] as HTMLInputElement;
    const symbol = startInput.value.trim().charAt(0);
    usedSymbols.add(symbol);
  });

  let useSymbol: string="$";
  for (let characterIndex = MIN; characterIndex <= MAX; characterIndex++) {
    const char = String.fromCodePoint(characterIndex);

    if (!usedSymbols.has(char)) {
      useSymbol = char;
      break;
    }
  }


  let newSubContainer: HTMLDivElement;
  if(subContainer[0])
  {
    newSubContainer = subContainer[0].cloneNode(true) as HTMLDivElement;

          
    (newSubContainer.getElementsByClassName("startNumberInput")[0] as HTMLInputElement).value=`${useSymbol}=0`;

    (newSubContainer.getElementsByClassName("addNumberInput")[0] as HTMLInputElement).value="1";

    (newSubContainer.getElementsByClassName("endNumberInput")[0] as HTMLInputElement).value="10";
      
  }
  else
  {

    let divStartNumber= document.createElement("div") as HTMLDivElement;
    divStartNumber.className="startNumber";
    let startNumber= document.createElement("label") as HTMLLabelElement;
    startNumber.className="startNumber";
    startNumber.innerText="start:";
    let startNumberInput= document.createElement("input") as HTMLInputElement;
    startNumberInput.className="startNumberInput";
    startNumberInput.value=`${useSymbol}=0`;

    divStartNumber.appendChild(startNumber);
    divStartNumber.appendChild(startNumberInput);

    
    let divAddNumber= document.createElement("div") as HTMLDivElement;
    divAddNumber.className="addNumber";
    let addNumber= document.createElement("label") as HTMLLabelElement;
    addNumber.className="addNumber";
    addNumber.innerText="add:";
    let addNumberInput= document.createElement("input") as HTMLInputElement;
    addNumberInput.className="addNumberInput";
    addNumberInput.value="1";

    divAddNumber.appendChild(addNumber);
    divAddNumber.appendChild(addNumberInput);


    let divEndNumber= document.createElement("div") as HTMLDivElement;
    divEndNumber.className="endNumber";
    let endNumber= document.createElement("label") as HTMLLabelElement;
    endNumber.className="endNumber";
    endNumber.innerText="end:";
    let endNumberInput= document.createElement("input") as HTMLInputElement;
    endNumberInput.className="endNumberInput";
    endNumberInput.value="10";

    divEndNumber.appendChild(endNumber);
    divEndNumber.appendChild(endNumberInput);


    newSubContainer= document.createElement("div") as HTMLDivElement;
    newSubContainer.className="numberOptionsContainer";
    newSubContainer.appendChild(divStartNumber);
    newSubContainer.appendChild(divAddNumber);
    newSubContainer.appendChild(divEndNumber);

  }

  container.appendChild(newSubContainer);
});


(document.getElementById("removeNumberButtonContainer") as HTMLDivElement).addEventListener("click", async () =>
{
  const container = document.getElementById("numberSubContainer") as HTMLDivElement;
  const blocks = container.getElementsByClassName("numberOptionsContainer") as HTMLCollectionOf<HTMLDivElement>;
  if (blocks.length === 0) return;
  const lastBlock = blocks[blocks.length - 1];
  const startInput = lastBlock.getElementsByClassName("startNumberInput")[0] as HTMLInputElement;
  if (startInput) {
    usedSymbols.delete(startInput.value.trim().charAt(0));
  }
  container.removeChild(lastBlock);
  wordListLength--;
});

(document.getElementById("addWordListButtonContainer") as HTMLDivElement).addEventListener("click", async () =>
{

  const container= document.getElementById("wordListContainer") as HTMLDivElement;
  const subContainer= container.getElementsByClassName("wordListSubContainer") as HTMLCollectionOf<HTMLDivElement>;


  usedSymbols.add("+");
  usedSymbols.add("-");
  usedSymbols.add("*");
  usedSymbols.add("/");
  usedSymbols.add("=");
  usedSymbols.add("%");
  usedSymbols.add(".");
  usedSymbols.add("^");
  
  usedSymbols.add("0");
  usedSymbols.add("1");
  usedSymbols.add("2");
  usedSymbols.add("3");
  usedSymbols.add("4");
  usedSymbols.add("5");
  usedSymbols.add("6");
  usedSymbols.add("7");
  usedSymbols.add("8");
  usedSymbols.add("9");

  const containerNumber= document.getElementById("numberSubContainer") as HTMLDivElement;
  const subContainerNumber= containerNumber.getElementsByClassName("numberOptionsContainer") as HTMLCollectionOf<HTMLDivElement>;


  Array.from(subContainer).forEach((block) => {
    const startInput = block.getElementsByClassName("wordListInput")[0] as HTMLInputElement;
    const symbol = startInput.value.trim().charAt(0);
    usedSymbols.add(symbol);
  });

  Array.from(subContainerNumber).forEach((block) => {
    const startInput = block.getElementsByClassName("startNumberInput")[0] as HTMLInputElement;
    const symbol = startInput.value.trim().charAt(0);
    usedSymbols.add(symbol);
  });

  let useSymbol: string="$";
  for (let characterIndex = MIN; characterIndex <= MAX; characterIndex++) {
    const char = String.fromCodePoint(characterIndex);

    if (!usedSymbols.has(char)) {
      useSymbol = char;
      break;
    }
  }

  wordListLength++;

  let newSubContainer: HTMLDivElement;
  if(subContainer[0])
  {
    newSubContainer = subContainer[0].cloneNode(true) as HTMLDivElement;

    let wordListInput: HTMLInputElement =newSubContainer.getElementsByClassName("wordListInput")[0] as HTMLInputElement;
    wordListInput.value=`${useSymbol}=[Christian, Emilien, Melchior, Poutre]`;

    let titleWordList= newSubContainer.getElementsByClassName("wordListTitle")[0] as HTMLHeadingElement;
    
    if(wordListLength==2)
    {
      titleWordList.innerText="2nd Word's List";
    }
    else if(wordListLength==3)
    {
      titleWordList.innerText="3rd Word's List";
    }
    else
    {
      titleWordList.innerText=`${wordListLength}th Word's List`;
    }
  }
  else
  {
    newSubContainer= document.createElement("div");
    newSubContainer.className="wordListSubContainer";

    let titleWordList= document.createElement("h3");
    titleWordList.innerText="1st Word's List";
    titleWordList.className="wordListTitle";

    let textAreaWordList= document.createElement("textarea");
    textAreaWordList.innerText=`${useSymbol}=[Christian, Emilien, Melchior, Poutre]`;
    textAreaWordList.className="wordListInput";

    newSubContainer.appendChild(titleWordList);
    newSubContainer.appendChild(textAreaWordList);
  }
  console.log(wordListLength);
  container.appendChild(newSubContainer);
});

(document.getElementById("removeWordListButtonContainer") as HTMLDivElement).addEventListener("click", async () =>
{
  const container = document.getElementById("wordListContainer") as HTMLDivElement;
  const blocks = container.getElementsByClassName("wordListSubContainer") as HTMLCollectionOf<HTMLDivElement>;
  
  if (!blocks.length) return;

  const lastBlock = blocks[blocks.length - 1];
  const wordListInput = lastBlock.getElementsByClassName("wordListInput")[0] as HTMLInputElement;
  if (wordListInput) {
    usedSymbols.delete(wordListInput.value.trim().charAt(0));
  }
  container.removeChild(lastBlock);
  wordListLength--;
  console.log(wordListLength);
});


(document.getElementById("differentStepButton") as HTMLDivElement).addEventListener("click", async () =>
{
  (document.getElementById("differentStepInput") as HTMLInputElement).disabled = !(document.getElementById("differentStepButton") as HTMLInputElement).checked;
});

const hideErrorDisplay = () => 
{
  let icon=document.getElementById("errorIcon") as HTMLDivElement;
  icon.style.display = "none";

  let containerError=document.getElementById("errorDisplay") as HTMLDivElement;
  containerError.innerHTML= "";
}

(document.getElementById("clipboardButton") as HTMLButtonElement).addEventListener("click", async() =>
{
  hideErrorDisplay();

  const text= (document.getElementById("textArea") as HTMLTextAreaElement).value;

  const container = document.getElementById("numberSubContainer") as HTMLDivElement;

  const blocks= container.getElementsByClassName("numberOptionsContainer") as HTMLCollectionOf<HTMLDivElement>;

  let start_numbers: string[] =[];
  let add_numbers: string[] =[];
  let end_numbers: string[] =[];
  
  for(let block of blocks)
  {
    (start_numbers.push((block.getElementsByClassName("startNumberInput")[0] as HTMLInputElement).value));
    (add_numbers.push((block.getElementsByClassName("addNumberInput")[0] as HTMLInputElement).value));
    (end_numbers.push((block.getElementsByClassName("endNumberInput")[0] as HTMLInputElement).value));  
  }
  const bool_filter=(document.getElementById("differentStepButton") as HTMLInputElement).checked;

  const filter_loop=(document.getElementById("differentStepInput") as HTMLInputElement).value;
 
  const wordList=(document.getElementById("wordListContainer") as HTMLDivElement).getElementsByClassName("wordListInput");

  let word_list_array: string[] =[];
  for(let wordListValues of wordList)
  {
    word_list_array.push((wordListValues as HTMLTextAreaElement).value);
  }


  const data = {text, start_numbers, add_numbers, end_numbers, bool_filter, filter_loop, word_list_array};

  try
  {
    await invoke("handle_input", { data });
  }
  catch(e)
  {
    let message= e as string;
    
    
    
    let icon=document.getElementById("errorIcon") as HTMLDivElement;
    icon.style.display = "block";
    
    let inlinePlacement= message.length/35;

    for (let i=1; i<inlinePlacement; i++)
    {
      let j= i*35;
      for(j;message[j]!=' ' && j< message.length;j++);
      message=message.slice(0,j)+"<br>"+message.slice(j);
    }

    console.log(message);

    let containerError=document.getElementById("errorDisplay") as HTMLDivElement;
    containerError.innerHTML= message;
  }
});

