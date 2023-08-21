let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", searchButton);
let form = document.querySelector("#search-form");

function searchButton(event) {
  event.preventDefault();
  let searchedResults = document.querySelector("#exampleFormControlInput1");
  let units = "metric";
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${searchedResults.value}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(handleTemp);
}

form.addEventListener("submit", searchButton);

function handleTemp(event) {
  let city = document.querySelector("#hometown");
  let temperatureElement = document.querySelector("#weather");

  city.innerHTML = event.data.name;
  temperatureElement.innerHTML = event.data.main.temp;
}