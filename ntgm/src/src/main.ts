import { invoke } from "@tauri-apps/api/core";


(document.getElementById("addNumberButtonContainer") as HTMLDivElement).addEventListener("click", async () =>
{
  const container= document.getElementById("numberSubContainer") as HTMLDivElement;
  const subContainer= container.getElementsByClassName("numberOptionsContainer") as HTMLCollectionOf<HTMLDivElement>;

  let newSubContainer: HTMLDivElement;
  if(subContainer[0])
  {
    newSubContainer = subContainer[0].cloneNode(true) as HTMLDivElement;

          
    (newSubContainer.getElementsByClassName("startNumberInput")[0] as HTMLInputElement).value="£=0";

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
    startNumberInput.value="$=0";

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
  const container= document.getElementById("numberSubContainer") as HTMLDivElement;

  container.removeChild(container.lastChild as HTMLDivElement);
});

(document.getElementById("addWordListButtonContainer") as HTMLDivElement).addEventListener("click", async () =>
{
  const container= document.getElementById("wordListContainer") as HTMLDivElement;

  const subContainer= container.getElementsByClassName("wordListSubContainer") as HTMLCollectionOf<HTMLDivElement>;

  let newSubContainer: HTMLDivElement;
  if(subContainer[0])
  {
    newSubContainer = subContainer[0].cloneNode(true) as HTMLDivElement;
  }
  else
  {
    newSubContainer= document.createElement("div");
    newSubContainer.className="wordListSubContainer";

    let titleWordList= document.createElement("h3");
    titleWordList.innerText="First Word's List";
    titleWordList.className="wordListTitle";

    let textAreaWordList= document.createElement("textarea");
    textAreaWordList.innerText="£=[Christian, Emilien, Melchior, Poutre]";
    textAreaWordList.className="wordListInput";

    newSubContainer.appendChild(titleWordList);
    newSubContainer.appendChild(textAreaWordList);
  }
  container.appendChild(newSubContainer);
});

(document.getElementById("removeWordListButtonContainer") as HTMLDivElement).addEventListener("click", async () =>
{
  const container= document.getElementById("wordListContainer") as HTMLDivElement;

  container.removeChild(container.lastChild as HTMLDivElement);
});


(document.getElementById("differentStepButton") as HTMLDivElement).addEventListener("click", async () =>
{
  (document.getElementById("differentStepInput") as HTMLInputElement).disabled = !(document.getElementById("differentStepButton") as HTMLInputElement).checked;
});



(document.getElementById("clipboardButton") as HTMLButtonElement).addEventListener("click", async() =>
{
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

  await invoke("handle_input", { data });
});

(document.getElementById("pasteButton") as HTMLButtonElement).addEventListener("click", async() =>
{
  console.log("paste button clicked");
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

  await invoke("handle_input", { data });
})

