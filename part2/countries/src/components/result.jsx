import '../styles/result.css';
import CountryDetail from './countryDetail';

const CountryList = ({ countries, handleOnClick}) => (
  <ul>
    {countries.map((country) => (
      <li className="country-item" key={country.name.common}>
        {country.name.common} <button onClick={() => handleOnClick(country)}>Show</button>
        </li>
    ))}
  </ul>
);



export default function Result({ countries, handleOnClick }) {
  if (countries.length === 0) return <p>No matches found</p>;
  if (countries.length === 1) return <CountryDetail country={countries[0]}/>;
  if (countries.length <= 10) return <CountryList countries={countries} handleOnClick={handleOnClick}/>;

  return <p>Too many matches, specify another filter</p>;
};