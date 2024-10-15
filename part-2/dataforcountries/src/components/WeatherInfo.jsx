const WeatherInfo = ({ city, weatherData }) => {
  if (weatherData)
    return (
      <div className="weather-info">
        <h2>Weather in {city}</h2>
        <p>temperature {weatherData.temp} Celcius</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
        ></img>
        <p>wind {weatherData.wind} m/s</p>
      </div>
    );

  return (
    <>
      <h2>Weather in {city}</h2>
      <p>fetching data ... </p>
    </>
  );
};

export default WeatherInfo;
