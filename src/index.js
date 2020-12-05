/** @format */

function displayCity(event) {
  event.preventDefault();
  let apiKey = "771f97361711452c12e62a313b27bcc9";
  let searchedCity = document.querySelector("#searched-city-name").value;
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios
    .get(`${apiUrl}${searchedCity}&units=metric&appid=${apiKey}`)
    .then(displayWeather);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", displayCity);

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
  document.querySelector(
    "#selected-city-name"
  ).innerHTML = `<strong>${response.data.name}</strong>`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].main}`;
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
}

function getCurrentCoords(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentCoords);
}

let currentLocationSearch = document.querySelector("#current-location");
currentLocationSearch.addEventListener("click", getCurrentCoords);
