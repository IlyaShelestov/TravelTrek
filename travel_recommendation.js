const btn_clear = document.getElementById("btn-clear");
const btn_search = document.getElementById("btn-search");

async function fetchData() {
  const response = await fetch("travel_recommendation_api.json");
  const data = response.json();
  return data;
}

async function search() {
  const data = await fetchData();
}

function clear() {
  document.getElementById("search-input").value = "";
}

btn_clear.addEventListener("click", clear);
btn_search.addEventListener("click", search);
