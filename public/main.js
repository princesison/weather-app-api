const btn = document.querySelector("button");
const weatherDisplay = document.querySelector(".weather-details");
const cityInput = document.querySelector("#city-input");

const date = new Date().toLocaleTimeString();

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (cityInput.value === "") {
    alert("Please enter your city.");
  } else {
    fetchWeather(cityInput.value);
  }
});

const fetchWeather = async (cityName) => {
  const url = `/weather?q=${cityName}&units=metric`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === "404") {
    alert("City not found");
    return;
  }

  if (data.cod === 401) {
    alert("Invalid API Key");
    return;
  }

  const displayData = {
    city: data.name,
    temp: data.main.temp,
    icon: data.weather[0].icon,
    description: data.weather[0].description,
    country: data.sys.country,
  };

  addWeatherToDOM(displayData);
};

const addWeatherToDOM = (data) => {
  weatherDisplay.innerHTML = `
      <h1>Weather in ${data.city} ${data.country}</h1>
      <h2>${data.temp} &deg;C</h2>
      <img src="http://openweathermap.org/img/wn/${data.icon}@2x.png" alt="icon"/>
      <p>Description: ${data.description}</p>
    `;
  cityInput.value = "";
};

fetchWeather("Manila");
