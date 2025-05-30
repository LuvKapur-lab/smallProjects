//caputre the elems
let userData = document.querySelector("#city-input");
let submitButton = document.querySelector(".Submit");
let h1 = document.querySelector(".h1");
let iconElement = document.querySelector(".header i");
const api = "a849256a24d3331c1ae978f7544d77d0";
let container = document.querySelector(".container");

submitButton.addEventListener("click", async function () {
  const city = userData.value;

  if (city) {
    try {
      const WeatherData = await getWeatherData(city);
      displayWeatherInfo(WeatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Enter a valid city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp },
    weather: [{ description, id }],
  } = data;

  h1.textContent = `${city} got fucking ${description} with ${Math.floor(
    temp - 273.15
  )}°C`;

  getWeatherEmoji(id)
}

function getWeatherEmoji(weatherID) {
  switch (true) {
    case weatherID >= 200 && weatherID < 600:
      iconElement.className = "hgi hgi-stroke hgi-cloud-angled-rain";
      container.style.backgroundColor = "#1C1F2B";
      container.style.color = "white";
      break;

    case weatherID === 800:
      iconElement.className = "hgi hgi-stroke hgi-sun-03";
      container.style.backgroundColor = "#FFF9C4";
      break;

    case weatherID >= 801 && weatherID <= 810:
      iconElement.className = "hgi hgi-stroke hgi-sun-cloud-02";
      container.style.backgroundColor = "#E0E6ED";
      break;

    default:
      iconElement.className = "hgi hgi-stroke hgi-slow-winds";
      break;
  }
}

function displayError(message) {
  h1.textContent = message;
}
