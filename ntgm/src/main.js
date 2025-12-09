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

document.getElementById("clipboardButton").addEventListener("click", async () =>
{
  const container = document.getElementById("numberSubContainer")

  const startNumbers = container.getElementsByClassName("startNumberInput")
  const addNumbers = container.getElementsByClassName("addNumberInput")
  const endNumbers = container.getElementsByClassName("endNumberInput")

  const data =[startNumbers,addNumbers,endNumbers]

  await invoke("main", { data });

})

document.getElementById("pasteButton").addEventListener("click", async() =>
{
  const container = document.getElementById("numberSubContainer")

  const startNumbers = container.getElementsByClassName("startNumberInput")
  const addNumbers = container.getElementsByClassName("addNumberInput")
  const endNumbers = container.getElementsByClassName("endNumberInput")
  

  const data =[startNumbers,addNumbers,endNumbers]
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
