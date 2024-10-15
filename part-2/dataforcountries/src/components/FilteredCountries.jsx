const FilteredCountries = ({ filteredCountries, handleShowCountryInfo }) => {
  if (!filteredCountries) return null;
  if (filteredCountries.length > 10)
    return <p>Too many matches, specify another filter</p>;
  if (filteredCountries.length > 1)
    return (
      <>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => handleShowCountryInfo(country)}>Show</button>
          </div>
        ))}
      </>
    );
  if (filteredCountries.length === 0) return <p>No such country found</p>;
  return null;
};

export default FilteredCountries;
