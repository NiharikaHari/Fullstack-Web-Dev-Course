const CountryInfo = ({ country }) => {
  const languages = [];
  for (const lang in country.languages) languages.push(country.languages[lang]);

  return (
    <div className="country-info">
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      {languages.map((language) => (
        <li key={language}>{language}</li>
      ))}
      <img src={country.flags.png} alt="Image of country flag"></img>
    </div>
  );
};

export default CountryInfo;
