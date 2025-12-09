const { invoke } = window.__TAURI__.core;


const element= document.getElementById("addNumberButtonContainer").addEventListener("click", () =>
{
  const container= document.getElementById("numberContainer")
  console.log(container)
  const subContainer= container.getElementsByClassName("numberSubContainer1")[0]
  console.log(subContainer)
  const newSubContainer = subContainer.cloneNode(true)
  console.log(newSubContainer)

  newSubContainer.getElementsByClassName("startNumberInput")[0].value="£=0"

  newSubContainer.getElementsByClassName("addNumberInput")[0].value="1"

  newSubContainer.getElementsByClassName("endNumberInput")[0].value="10"
  

  container.appendChild(newSubContainer)
})

console.log(`element: ${element}`)



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
