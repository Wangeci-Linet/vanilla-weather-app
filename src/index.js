function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature-value");
  let dateElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#current-temperature-icon");
  let icon = `<img src="${response.data.condition.icon_url}"/>`;
  iconElement.innerHTML = icon;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  dateElement.innerHTML = `${day} ${hours}:${minutes}`;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
}

function searchCity(city) {
  let apiKey = "1bf42foc33aa256d79167at7004c6dac";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function citySubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  let cityElement = document.querySelector(".current-city");
  cityElement.innerHTML = cityInputElement.value;
  searchCity(cityInputElement.value);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", citySubmit);

searchCity("Nairobi");

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecast.innerHTML += `<div class="forecast-day">
            <h3 class="forecast-day-name">${day}</h3>
            <div class="forecast-icon">☀️</div>
            <div class="forecast-temperatures">
              <span class="forecast-temp-max">25°C</span> /
              <span class="forecast-temp-min">15°C</span>
            </div>
          </div>`;
  });
}

displayForecast();
