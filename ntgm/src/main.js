const { invoke } = window.__TAURI__.core;


document.getElementById("addNumberButtonContainer").addEventListener("click", async () =>
{
  const container= document.getElementById("numberSubContainer")
  const subContainer= container.getElementsByClassName("numberOptionsContainer")
  const newSubContainer = subContainer[0].cloneNode(true)

  newSubContainer.getElementsByClassName("startNumberInput")[0].value="£=0"

  newSubContainer.getElementsByClassName("addNumberInput")[0].value="1"

  newSubContainer.getElementsByClassName("endNumberInput")[0].value="10"
  

  container.appendChild(newSubContainer)
})

document.getElementById("addWordListButtonContainer").addEventListener("click", async () =>
{
  const container= document.getElementById("wordListContainer")
  console.log(container)
  const subContainer= container.getElementsByClassName("wordListSubContainer")
  console.log(subContainer)
  const newSubContainer = subContainer[0].cloneNode(true)
  
  container.appendChild(newSubContainer)
})

document.getElementById("clipboardButton").addEventListener("click", async() =>
{
  const text= document.getElementById("textArea").value
  

  const container = document.getElementById("numberSubContainer")

  const blocks= container.getElementsByClassName("numberOptionsContainer")

  let startNumbers=[]
  let addNumbers=[]
  let endNumbers=[]
  
  for(let block of blocks)
  {
    startNumbers.push(block.getElementsByClassName("startNumberInput")[0].value)
    addNumbers.push(block.getElementsByClassName("addNumberInput")[0].value)
    endNumbers.push(block.getElementsByClassName("endNumberInput")[0].value)  // those line may not recover the right value
  }

  const filterLoop=document.getElementById("differentStepInput").value


  const wordList=document.getElementById("wordListOptionsContainer").getElementsByClassName("wordList")

  console.log(wordList)
  let wordListArray=[]
  for(let wordListValues of wordList)
  {
    wordListArray.push(wordListValues.getElementsByClassName("wordListInput")[0].value) // those line may not recover the right value
  }


  const data =[text,startNumbers,addNumbers,endNumbers,filterLoop,wordListArray]
  console.log(data)
  await invoke("main", { data });
})

document.getElementById("pasteButton").addEventListener("click", async() =>
{
    const text= document.getElementById("textArea").value
  

  const container = document.getElementById("numberSubContainer")

  const blocks= container.getElementsByClassName("numberOptionsContainer")

  let startNumbers=[]
  let addNumbers=[]
  let endNumbers=[]
  
  for(let block of blocks)
  {
    startNumbers.push(block.getElementsByClassName("startNumberInput")[0].value)
    addNumbers.push(block.getElementsByClassName("addNumberInput")[0].value)
    endNumbers.push(block.getElementsByClassName("endNumberInput")[0].value)  // those line may not recover the right value
  }

  const filterLoop=document.getElementById("differentStepInput").value


  const wordList=document.getElementById("wordListOptionsContainer").getElementsByClassName("wordList")

  console.log(wordList)
  let wordListArray=[]
  for(let wordListValues of wordList)
  {
    wordListArray.push(wordListValues.getElementsByClassName("wordListInput")[0].value) // those line may not recover the right value
  }


  const data =[text,startNumbers,addNumbers,endNumbers,filterLoop,wordListArray]
  console.log(data)
  await invoke("main", { data });
})


/*async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});*/
