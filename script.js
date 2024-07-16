const apiKey = '4292bdf7d79628b14d4d7c972274409e'; // Replace with your API key
const weatherDataDiv = document.getElementById('weatherData');
const locationInput = document.getElementById('locationInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');

getWeatherBtn.addEventListener('click', () => {
  const location = locationInput.value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      weatherDataDiv.innerHTML = 'Error fetching weather data. Please try again.';
    });
});

function displayWeatherData(data) {
  const city = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const feelsLike = data.main.feels_like;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const lat = data.coord.lat; // Get latitude from API data
  const lon = data.coord.lon; // Get longitude from API data

  // Display weather data in the div
  weatherDataDiv.innerHTML = `
    <h2>Weather in ${city}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Feels Like: ${feelsLike}°C</p>
    <p>Conditions: ${description}</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;

  // Leaflet map initialization (AFTER weather data is displayed)
  var mymap = L.map('mapid').setView([lat, lon], 13); 

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);

  // Add marker for the city
  L.marker([lat, lon]).addTo(mymap)
    .bindPopup(`<b>${city}</b>`).openPopup();
}