function formatDate(date) {
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
  let p = document.querySelector("#current-day");
  p.innerHTML = formatDate(new Date(response.data.dt * 1000));

  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#temp-min").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("#temp-max").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#country").innerHTML = response.data.sys.country;
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

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#geo-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Lisbon");

//Change Celsius/Farenheit********
/*function changeToFarenheit(event) {
  event.preventDefault();
  let farenheit = document.querySelector("#temperature-now");
  let changeFarenheit = Math.round((farenheit.innerHTML * 9) / 5 + 32);
  farenheit.innerHTML = changeFarenheit;
}

function changeToCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temperature-now");
  celsius.innerHTML = 25;
}

let farenheit = document.querySelector("#farenheit-link");
farenheit.addEventListener("click", changeToFarenheit);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeToCelsius);*/
