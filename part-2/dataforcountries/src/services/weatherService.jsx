import axios from "axios";

const apiKey = import.meta.env.VITE_OPEN_WEATHER_KEY;

// gets weather data for particular langitude, longitude location
const getWeatherByCoords = (lat, lon) =>
  axios
    .get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&units=metric&appid=${apiKey}`
    )
    .then((response) => response.data);

// gets latitude, longitude coordinates from city name
const getCoordsByCity = (city) =>
  axios
    .get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
    )
    .then((response) => response.data[0]);

// gets weather data by city name
const getWeatherByCity = (city) =>
  getCoordsByCity(city).then((coordsData) =>
    getWeatherByCoords(coordsData.lat, coordsData.lon).then(
      (weatherData) => weatherData
    )
  );

export default { getWeatherByCity };
