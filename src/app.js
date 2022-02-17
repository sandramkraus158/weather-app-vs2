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

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
      <div class="week-day-forecast">${formatDay(forecastDay.dt)}</div>
      <img src="src/images/${
        forecastDay.weather[0].icon
      }.svg" alt="#" class="weather-icon" />
      <div class="highest-temp">
        ${Math.round(
          forecastDay.temp.max
        )}°<span class="min-temp"> ${Math.round(forecastDay.temp.min)}°</span>
      </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8c05c4bf43fef6ac6197b744de668563";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getWindDirection(direction) {
  if (direction >= 348.75 || direction < 11.25) {
    return "N";
  } else if (direction >= 11.25 && direction < 33.75) {
    return "NNE";
  } else if (direction >= 33.75 && direction < 56.25) {
    return "NE";
  } else if (direction >= 56.25 && direction < 78.75) {
    return "ENE";
  } else if (direction >= 78.25 && direction < 101.25) {
    return "E";
  } else if (direction >= 101.25 && direction < 123.75) {
    return "ESE";
  } else if (direction >= 123.75 && direction < 146.25) {
    return "SE";
  } else if (direction >= 146.25 && direction < 168.75) {
    return "SSE";
  } else if (direction >= 168.75 && direction < 191.25) {
    return "S";
  } else if (direction >= 191.25 && direction < 213.75) {
    return "SSW";
  } else if (direction >= 213.75 && direction < 236.25) {
    return "SW";
  } else if (direction >= 236.25 && direction < 258.75) {
    return "WSW";
  } else if (direction >= 258.75 && direction < 281.25) {
    return "W";
  } else if (direction >= 281.25 && direction < 303.75) {
    return "WNW";
  } else if (direction >= 303.75 && direction < 326.25) {
    return "NW";
  } else if (direction >= 326.25 && direction < 348.75) {
    return "NNW";
  }
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let descriptionElement = document.querySelector("#description");
  /*let humidityElement = document.querySelector("#humidity");*/
  let windElement = document.querySelector("#wind");
  let windDirectionElement = document.querySelector("#wind-direction");
  let feelsElement = document.querySelector("#feels");
  let tempMaxElement = document.querySelector("#temp-max");
  let tempMinElement = document.querySelector("#temp-min");
  let dateElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");
  /*let cityIcon = document.querySelector("#city-icon");*/

  /*celsiusTemperature = response.data.main.temp;*/

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  /*humidityElement.innerHTML = Math.round(response.data.main.humidity);*/
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  windDirectionElement.innerHTML = getWindDirection(response.data.wind.deg);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  tempMaxElement.innerHTML = Math.round(response.data.main.temp_max);
  tempMinElement.innerHTML = Math.round(response.data.main.temp_min);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `src/images/${response.data.weather[0].icon}.svg`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  /*
  if (cityElement.innerHTML === "Amsterdam") {
    cityIcon.setAttribute("src", `src/images/amsterdam.svg`);
  } else if (cityElement.innerHTML === "Austin") {
    cityIcon.setAttribute("src", `src/images/austin.svg`);
  } else if (cityElement.innerHTML === "Barcelona") {
    cityIcon.setAttribute("src", `src/images/barcelona.svg`);
  } else if (cityElement.innerHTML === "Berlin") {
    cityIcon.setAttribute("src", `src/images/berlin.svg`);
  } else if (cityElement.innerHTML === "Cape Town") {
    cityIcon.setAttribute("src", `src/images/cape.svg`);
  } else if (cityElement.innerHTML === "Dublin, GB") {
    cityIcon.setAttribute("src", `src/images/dublin.svg`);
  } else if (cityElement.innerHTML === "London") {
    cityIcon.setAttribute("src", `src/images/london.svg`);
  } else if (cityElement.innerHTML === "New York") {
    cityIcon.setAttribute("src", `src/images/new.svg`);
  } else if (cityElement.innerHTML === "Paris") {
    cityIcon.setAttribute("src", `src/images/paris.svg`);
  } else if (cityElement.innerHTML === "San Francisco") {
    cityIcon.setAttribute("src", `src/images/san.svg`);
  } else if (cityElement.innerHTML === "Stockholm") {
    cityIcon.setAttribute("src", `src/images/stockholm.svg`);
  } else if (cityElement.innerHTML === "Sydney") {
    cityIcon.setAttribute("src", `src/images/sydney.svg`);
  } else if (cityElement.innerHTML === "Tokyo") {
    cityIcon.setAttribute("src", `src/images/tokyo.svg`);
  } else if (cityElement.innerHTML === "Wellington") {
    cityIcon.setAttribute("src", `src/images/wellington.svg`);
  } else {
    cityIcon.innerHTML = "";
  } */

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "8c05c4bf43fef6ac6197b744de668563";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Brisbane");

/*Convertion of Fahrenheit and Celsius -  not needed at the moment
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  celsius.classList.remove("active"); //remove the link from F to C
  fahrenheit.classList.add("active"); //activate the F as default
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemp);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemp);*/
