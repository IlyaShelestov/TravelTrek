const btn_clear = document.getElementById("btn-clear");
const btn_search = document.getElementById("btn-search");

async function fetchData() {
  const response = await fetch("travel_recommendation_api.json");
  const data = response.json();
  return data;
}

function createBlock(e) {
  let block = document.createElement("div");
  block.classList.add("block");
  block.innerHTML += `<img src="${e.imageUrl}">`;
  let text = document.createElement("div");
  text.classList.add("text");
  text.innerHTML += `<h2 class="name">${e.name}</h2>`;
  text.innerHTML += `<p class="description">${e.description}</p>`;
  text.innerHTML += `<button class="btn btn-cyan"><b>Visit</b></button>`;
  block.appendChild(text);
  blocks.appendChild(block);
}

async function search() {
  const query = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  let blocks = document.getElementById("blocks");
  document.getElementById("blocks").innerHTML = "";
  try {
    const data = await fetchData();
    if (query === "beach" || query === "beaches") {
      for (const e of data["beaches"]) {
        createBlock(e);
      }
    } else if (query === "temple" || query === "temples") {
      for (const e of data["temples"]) {
        createBlock(e);
      }
    } else {
      const country = data["countries"].find(
        (item) => item.name.toLowerCase() === query
      );
      if (country) {
        for (const e of country.cities) {
          createBlock(e);
        }
      } else {
        blocks.innerHTML = "Country not found.";
      }
    }
  } catch (error) {
    console.log("Error occured: " + error);
    blocks.innerHTML = "An error occured while fetching data";
  }
}

function clear() {
  document.getElementById("search-input").value = "";
  document.getElementById("blocks").innerHTML = "";
}

btn_clear.addEventListener("click", clear);
btn_search.addEventListener("click", search);
