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
  getForecast(cityInputElement.value);
}

function getForecast(city) {
  let apiKey = "1bf42foc33aa256d79167at7004c6dac";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecast.innerHTML += `<div class="forecast-day">
            <h3 class="forecast-day-name">${formatDay(day.time)}</h3>
            <img src="${
              day.condition.icon_url
            }" alt="Weather icon" width="42" class="forecast-icon" />
            <div class="forecast-temperatures">
              <span class="forecast-temp-max">${Math.round(
                day.temperature.maximum
              )}°C</span> /
              <span class="forecast-temp-min">${Math.round(
                day.temperature.minimum
              )}°C</span>
            </div>
          </div>`;
    }
  });
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", citySubmit);

searchCity("Nairobi");
getForecast("Nairobi");
