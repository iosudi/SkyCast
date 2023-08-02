const container = $(".container");
const search = $(".search-box button");
const weatherBox = $(".weather-box");
const weatherDetails = $(".weather-details");
const error = $(".error");

search.on("click", () => {
  const APIKey = "ef3f6256f8b9e8063ba8eecdfd66cb4d";
  const city = $(".search-box input").val();

  if (city === "") {
    return;
  }
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.css("height", "404px");
        weatherBox.css("display", "none");
        weatherDetails.css("display", "none");
        error.css("display", "flex");
        error.addClass("fadeIn");
        return;
      }

      error.css("display", "none");
      error.removeClass("fadeIn");

      const image = $(".weather-box img");
      const temperature = $(".weather-box .temperature");
      const description = $(".weather-box .description");
      const humidity = $(".weather-details .humidity span");
      const wind = $(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.attr("src", "clear.png");
          break;
        case "Clouds":
          image.attr("src", "cloud.png");
          break;
        case "Snow":
          image.attr("src", "snow.png");
          break;
        case "Haze":
          image.attr("src", "mist.png");
          break;
        case "Rain":
          image.attr("src", "rain.png");
          break;
        default:
          image.attr("src", "");
      }

      temperature.html(`${parseInt(json.main.temp)-273}<span>°C</span>`);
      description.html(json.weather[0].description);
      humidity.html(`${json.main.humidity}%`);
      wind.html(`${parseInt(json.wind.speed)} Km/h`);

      weatherBox.css("display", "");
      weatherDetails.css("display", "");
      weatherBox.addClass("fadeIn");
      weatherDetails.addClass("fadeIn");
      container.css("height", "590px");
    })
    .catch((error) => {
      // Handle fetch or API errors here
      console.error("Error fetching weather data:", error);
    });
});
