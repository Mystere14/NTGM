const { invoke } = window.__TAURI__.core;


document.getElementById("addNumberButtonContainer").addEventListener("click", () =>
{
  const container= document.getElementById("numberSubContainer")
  const subContainer= container.getElementsByClassName("numberOptionsContainer")
  const newSubContainer = subContainer[0].cloneNode(true)

  newSubContainer.getElementsByClassName("startNumberInput")[0].value="£=0"

  newSubContainer.getElementsByClassName("addNumberInput")[0].value="1"

  newSubContainer.getElementsByClassName("endNumberInput")[0].value="10"
  

  container.appendChild(newSubContainer)
})

document.getElementById("clipboardButton").addEventListener("click", () =>
{
  document.getElementById("numberSubContainer").classList.toggle("hidden")
})

document.getElementById("pasteButton").addEventListener("click", () =>
{

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
