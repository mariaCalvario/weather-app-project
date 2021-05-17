function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let weekDays = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[weekDays];

  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let currentDate = document.querySelector("#current-date");
  let currentCity = document.querySelector("#current-city");
  let country = document.querySelector("#country");
  let currentTemperature = document.querySelector("#current-temperature");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let minTemp = document.querySelector("#temp-min");
  let maxTemp = document.querySelector("#temp-max");
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  currentDate.innerHTML = formatDate(new Date(response.data.dt * 1000));
  currentCity.innerHTML = response.data.name;
  country.innerHTML = response.data.sys.country;
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind speed: ${Math.round(response.data.wind.speed)} km/h`;
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  icon.setAttribute(
    "src",
    `images/weather-icons/${response.data.weather[0].icon}.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "3ca8fabd719ce46d29b590005e8ab76c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "3ca8fabd719ce46d29b590005e8ab76c";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFarenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let currentTemperature = document.querySelector("#current-temperature");
  let farenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  currentTemperature.innerHTML = farenheitTemperature;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#geo-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCity("Lisbon");
