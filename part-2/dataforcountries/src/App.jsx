import { useEffect } from "react";
import { useState } from "react";
import CountryInfo from "./components/CountryInfo";
import FilteredCountries from "./components/FilteredCountries";
import countryService from "./services/countryService";
import weatherService from "./services/weatherService";
import WeatherInfo from "./components/WeatherInfo";

const App = () => {
  //state variables
  const [searchTerm, setSearchTerm] = useState("");
  const [allCountries, setAllCountries] = useState(null);
  const [displayCity, setDisplayCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  //get all countries data, initialize filtered countries
  useEffect(() => {
    countryService.getAll().then((data) => {
      setAllCountries(data);
      setFilteredCountries(data);
    });
  }, []);

  //update search term, filtered countries & weather data
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    const countries = allCountries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setFilteredCountries(countries);
    if (
      countries &&
      countries.length === 1 &&
      displayCity !== countries[0].capital[0]
    ) {
      updateWeatherData(countries[0]);
    }
  };

  //set search term to country name, update weather data, set filtered countries to clicked country
  const handleShowCountryInfo = (country) => {
    setSearchTerm(country.name.common);
    updateWeatherData(country);
    setFilteredCountries([country]);
  };

  //get weather data for country capital
  const updateWeatherData = (country) => {
    setDisplayCity(country.capital[0]);
    setWeatherData(null);
    weatherService.getWeatherByCity(country.capital[0]).then((data) => {
      setWeatherData({
        temp: data.current.temp,
        wind: data.current.wind_speed,
        icon: data.current.weather[0].icon,
      });
    });
  };

  return (
    <div>
      <div>
        find countries{" "}
        <input value={searchTerm} onChange={handleSearchTermChange}></input>
      </div>
      <FilteredCountries
        filteredCountries={filteredCountries}
        handleShowCountryInfo={handleShowCountryInfo}
      ></FilteredCountries>
      {filteredCountries && filteredCountries.length === 1 && (
        <>
          <CountryInfo country={filteredCountries[0]}></CountryInfo>
          <WeatherInfo
            city={displayCity}
            weatherData={weatherData}
          ></WeatherInfo>
        </>
      )}
    </div>
  );
};

export default App;
