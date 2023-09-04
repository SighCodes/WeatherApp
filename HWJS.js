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

function formatDay(currentDate) {
  let date = new Date(currentDate * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-container");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="weather-date">${formatDay(forecastDay.time)}</div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  forecastDay.condition.icon
                }.png"
                alt=""
                width="50"
              />
              <br />
              <div class="forecast-temps">
                <span class="forecast-temp-low">${Math.round(
                  forecastDay.temperature.minimum
                )}°</span>
                <span class="forecast-temp-high">${Math.round(
                  forecastDay.temperature.maximum
                )}°</span>
              </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `2f3f1baf409eboat1de63d1abc36da6b`;
  let apiEndPoint = `https://api.shecodes.io/weather/v1/forecast`;
  let units = "imperial";
  let apiUrl = `${apiEndPoint}?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;
  console.log(coordinates);
  console.log(apiUrl);

  axios.get(apiUrl).then(showForecast);
}

function searchButton(event) {
  event.preventDefault();
  let searchedResults = document.querySelector("#exampleFormControlInput1");
  let units = "imperial";
  let apiKey = "2f3f1baf409eboat1de63d1abc36da6b";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let apiUrl = `${apiEndpoint}?query=${searchedResults.value}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(handleTemp);

  searchedResults.value = "";
}

form.addEventListener("submit", searchButton);

function handleTemp(event) {
  let cityName = document.querySelector("#hometown");
  let temperatureElement = document.querySelector("#temp-unit");
  let dayElement = document.querySelector("#daytime");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humid");
  let description = document.querySelector("#condition");
  let iconElement = document.querySelector("#icon");
  cityName.innerHTML = event.data.city;
  temperatureElement.innerHTML = Math.round(event.data.temperature.current);
  dayElement.innerHTML = showDate(event.data.time * 1000);
  wind.innerHTML = Math.round(event.data.wind.speed);
  humidity.innerHTML = Math.round(event.data.temperature.humidity);
  description.innerHTML = event.data.condition.description;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${event.data.condition.icon}.png`
  );

  getForecast(event.data.coordinates);
}
