const apiKey = "YOUR_WEATHER_API_KEY"; // Replace with your actual API key
const locationInput = document.getElementById("location");
const getWeatherButton = document.getElementById("get-weather");
const weatherDataDiv = document.getElementById("weather-data");

getWeatherButton.addEventListener("click", () => {
  const location = locationInput.value.trim(); // Ensure no extra spaces are included
  if (!location) {
    weatherDataDiv.innerHTML = "<p>Please enter a valid location.</p>";
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Location not found or API request failed");
      }
      return response.json();
    })
    .then((data) => {
      const locationName = data.name;
      const currentWeather = data.weather[0].main;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      weatherDataDiv.innerHTML = `
                <h2>${locationName}</h2>
                <p>Current Weather: ${currentWeather}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;
    })
    .catch((error) => {
      console.error(error);
      weatherDataDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
