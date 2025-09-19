export default function CountryDetail({ country }) {
  if(!country || Object.keys(country).length == 0) return null;
  
  return <div>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital}</p>
    <p>Area: {country.area} km²</p>
    <h2>Languages:</h2>
    <ul>
      {Object.values(country.languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
    </ul>
    <img
      src={country.flags.png}
      alt={`Flag of ${country.name.common}`}
      width="200"
    />
  </div>
};