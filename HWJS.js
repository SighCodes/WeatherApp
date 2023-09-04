let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", searchButton);
let form = document.querySelector("#search-form");
function showDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${minutes}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue"];
  let day = days[date.getDay()];
  return `${day}, ${hour}:${minutes}`;
}

function getForecast() {
  let forecastElement = document.querySelector("#forecast-container");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              <div class="weather-date">${day}</div>
              <img
                src="https://openweathermap.org/img/wn/11d@2x.png"
                alt=""
                width="50"
              />
              <br />
              <div class="forecast-temps">
                <span class="forecast-temp-high">18°</span>
                <span class="forecast-temp-low">12°</span>
              </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

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
  let temperatureElement = document.querySelector("#temp-unit");
  let dayElement = document.querySelector("#daytime");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humid");
  let description = document.querySelector("#condition");
  let iconElement = document.querySelector("#icon");
  city.innerHTML = event.data.name;
  temperatureElement.innerHTML = Math.round(event.data.main.temp);
  dayElement.innerHTML = showDate(event.data.dt * 1000);
  wind.innerHTML = Math.round(event.data.wind.speed);
  humidity.innerHTML = Math.round(event.data.main.humidity);
  description.innerHTML = event.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${event.data.weather[0].icon}@2x.png`
  );
  getForecast();
}
