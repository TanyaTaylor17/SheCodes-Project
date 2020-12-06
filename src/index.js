/** @format */
function handleSubmit(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#searched-city-name");
  searchCity(searchedCity.value);
}

function searchCity(city) {
  let apiKey = "771f97361711452c12e62a313b27bcc9";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios
    .get(`${apiUrl}${city}&units=metric&appid=${apiKey}`)
    .then(displayWeather);
}

function showCurrentCoords(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "771f97361711452c12e62a313b27bcc9";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(
      `${apiUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    )
    .then(displayWeather);
}

function displayWeather(response) {
  console.log(response);
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}`;
  celsiusFeel = response.data.main.feels_like;
  document.querySelector("#max-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}`;
  celsiusMax = response.data.main.temp_max;
  document.querySelector("#min-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}`;
  celsiusMin = response.data.main.temp_min;
  document.querySelector("#feels-like-unit").innerHTML = "°C";
  document.querySelector("#max-temp-unit").innerHTML = "°C";
  document.querySelector("#min-temp-unit").innerHTML = "°C";
  document.querySelector(
    "#selected-city-name"
  ).innerHTML = `<strong>${response.data.name}</strong>`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description}`;
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", `${response.data.weather[0].description}`);
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector("#pressure").innerHTML = `${Math.round(
    response.data.main.pressure
  )}`;
}

function getCurrentCoords(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentCoords);
}

function displayFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    (celsiusTemperature * 9) / 5 + 32
  )}`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    (celsiusFeel * 9) / 5 + 32
  )}`;
  document.querySelector("#max-temp").innerHTML = `${Math.round(
    (celsiusMax * 9) / 5 + 32
  )}`;
  document.querySelector("#min-temp").innerHTML = `${Math.round(
    (celsiusMin * 9) / 5 + 32
  )}`;
  document.querySelector("#feels-like-unit").innerHTML = "°F";
  document.querySelector("#max-temp-unit").innerHTML = "°F";
  document.querySelector("#min-temp-unit").innerHTML = "°F";
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    celsiusTemperature
  )}`;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    celsiusFeel
  )}`;
  document.querySelector("#max-temp").innerHTML = `${Math.round(celsiusMax)}`;
  document.querySelector("#min-temp").innerHTML = `${Math.round(celsiusMin)}`;
  document.querySelector("#feels-like-unit").innerHTML = "°C";
  document.querySelector("#max-temp-unit").innerHTML = "°C";
  document.querySelector("#min-temp-unit").innerHTML = "°C";
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", handleSubmit);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentCityDate = document.querySelector("#selected-city-date");
currentCityDate.innerHTML = `<em>${day} ${date} ${month} ${year}</em>`;
let currentCityTime = document.querySelector("#selected-city-time");
currentCityTime.innerHTML = `<em>${hours}:${minutes}</em>`;

let currentLocationSearch = document.querySelector("#current-location");
currentLocationSearch.addEventListener("click", getCurrentCoords);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let celsiusTemperature = null;
let celsiusFeel = null;
let celsiusMax = null;
let celsiusMin = null;

searchCity("London");
