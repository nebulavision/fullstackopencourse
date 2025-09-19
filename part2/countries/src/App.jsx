import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import Result from "./components/result";
import CountryDetail from "./components/countryDetail";
import Weather from "./components/weather";
import weatherService  from "./services/weatherService";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [weather, setWeather] = useState({});

  useEffect(() => {
    countryService.getAllCountries().then(data => {
      setCountries(data);
      setFilteredCountries(data);
    });
  }, []);

  useEffect(() => {
      if (!selectedCountry.latlng) return;
      const latlng = `${selectedCountry.latlng},${selectedCountry.latlng[1]}`;

      weatherService.getWeather(latlng.trim())
        .then(data => setWeather(data))
        .catch(err => console.error(err));
    }, [selectedCountry]);

  const handleFilterChange = (event) => {
    const query = event.target.value.toLowerCase();
    const filteredCountries = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(query)
    );
    setFilteredCountries(filteredCountries);

    if(filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    }else{
      setSelectedCountry({});
      setWeather({});
    }
  };

  const handleOnClick = (country) => {
    setSelectedCountry(country);
    console.log(country);
  }

  return (
    <div>
      <label>Find countries</label>
      <input type="text" onChange={handleFilterChange} />
      <Result countries={filteredCountries} handleOnClick={handleOnClick}/>
      {filteredCountries.length > 1 && (
        <CountryDetail country={selectedCountry} />
      )}
      <Weather country={selectedCountry} weather={weather} />
    </div>
  );
};

export default App;
