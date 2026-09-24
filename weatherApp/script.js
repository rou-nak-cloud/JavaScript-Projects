const searchField = document.querySelector(".searchBox input");
const cityName = document.querySelector("#cityName");
const localDate = document.querySelector("#localDate");
const temperature = document.querySelector("#temperature");
const weatherCondition = document.querySelector("#weatherCondition");
let weatherIcon = document.querySelector("#weatherIcon");
const rainChance = document.querySelector("#rainChance");
const humidity = document.querySelector("#humidity");
const feelsLike = document.querySelector("#feelsLike");
const precipitation = document.querySelector("#precipitation");
const willRain = document.querySelector("#willRain");

const greetText = document.querySelector("#greetText");
const details = document.querySelector(".detailsMetrics");
const errorMessage = document.querySelector("#errorMessage");

async function fetchWeather(location) {
  //  clear ui
  clearUI();

  try {
    const weather = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${location}&aqi=no`,
    );
    const weatherResult = await weather.json();
    console.log(weatherResult);

    if (weatherResult.error) {
      errorMessage.textContent = weatherResult.error.message;
      return;
    }

    // main data
    cityName.textContent = `${weatherResult.location.name}, ${weatherResult.location.country}`;
    localDate.textContent = `${weatherResult.location.localtime} ${weatherResult.location.region}`;
    temperature.textContent = `${weatherResult.current.temp_c} °C`;
    weatherCondition.textContent = weatherResult.current.condition.text;

    // svg
    const text = weatherResult.current.condition.text;

    let weatherIconHtml = "";
    if (text.includes("Sunny")) {
      weatherIconHtml = `<img src="./images/animatedSVGs/day.svg" alt="Sunny">`;
    } else if (
      text.includes("rain") ||
      text.includes("Patchy rain nearby") ||
      text.includes("Moderate rain at times")
    ) {
      weatherIconHtml = `<img src="./images/animatedSVGs/rainy-3.svg" alt="Rain">`;
    } else if (text.includes("Smoky haze")) {
      weatherIconHtml = `<img src="./images/animatedSVGs/cloudy.svg" alt="Smoky">`;
    } else if (text.includes("Partly Cloudy")) {
      weatherIconHtml = `<img src="./images/animatedSVGs/cloudy-day-3.svg" alt="Partly cloudy">`;
    } else if (text.includes("thunder") || text.includes("storm")) {
      weatherIconHtml = `<img src="./images/animatedSVGs/thunder.svg" alt="Thunderstorm">`;
    } else if (text.includes("snow")) {
      weatherIconHtml = `<img src="./images/animatedSVGs/snowy-2.svg" alt="Snow">`;
    } else {
      weatherIconHtml = `<img src="./images/animatedSVGs/cloudy-day-2.svg" alt="all season img">`;
    }
    weatherIcon.innerHTML = weatherIconHtml;

    // bottom data
    rainChance.textContent = `${weatherResult.current.chance_of_rain}%`;
    humidity.textContent = `${weatherResult.current.humidity}%`;
    feelsLike.textContent = `${weatherResult.current.feelslike_c} °C`;
    willRain.textContent = `${weatherResult.current.will_it_rain} %`;
    precipitation.textContent = `${weatherResult.current.precip_mm} mm`;

    // for text to show
    const hasSearched = true;
    greetText.style.display = hasSearched ? "none" : "block";
    details.style.display = hasSearched ? "flex" : "none";
  } catch (error) {
    console.log(`${error.message}`);
    errorMessage.textContent = `${data.error.message}`;
    // errorMessage.textContent = `No location found...`;
  }
}

function clearUI() {
  searchInput.value = "";
  errorMessage.textContent = "";
  cityName.textContent = "";
  localDate.textContent = "";
  temperature.textContent = "";
  weatherCondition.textContent = "";
  weatherIcon.innerHTML = "";
  rainChance.textContent = "";
  humidity.textContent = "";
  feelsLike.textContent = "";

  greetText.style.display = "block";
  details.style.display = "none";
}

searchField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const searchInput = searchField.value.trim();
    if (searchInput !== "") {
      fetchWeather(searchInput);
    } else {
      errorMessage.textContent = "No location to search!";
    }
  }
});



console.log(0.1 + 0.2 == 0.3)
console.log(0.1 + 0.2 === 0.3)