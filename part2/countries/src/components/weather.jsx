export default function Weather({ country, weather }) {
  if (!country || Object.keys(weather).length === 0) return null;
  if (!weather || Object.keys(weather).length === 0) return null;

  const countryName = country?.name?.common;
  const windInMs = (weather.current.wind_kph / 3.6).toFixed(2);
  return (
    <div>
      <h2>Weather in {countryName}</h2>
      <p>Temperature: {weather.current.temp_c}°C</p>
      <img src={weather.current.condition.icon} alt="Weather icon" />
      <p>Wind: {windInMs} m/s</p>
    </div>
  );
}
