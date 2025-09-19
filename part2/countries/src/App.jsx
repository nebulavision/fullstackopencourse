import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import Result from "./components/result";
import CountryDetail from "./components/countryDetail";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    countryService.getAllCountries().then(data => {
      setCountries(data);
      setFilteredCountries(data);
    });
  }, []);

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
    }
  };

  const handleOnClick = (country) => {
    setSelectedCountry(country);
  }

  return (
    <div>
      <label>Find countries</label>
      <input type="text" onChange={handleFilterChange} />
      <Result countries={filteredCountries} handleOnClick={handleOnClick}/>
      {filteredCountries.length > 1 && (
      <CountryDetail country={selectedCountry} />
    )}
    </div>
  );
};

export default App;
