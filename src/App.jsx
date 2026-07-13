import { useEffect, useState } from "react";
import "./App.css";
import SearchCard from "./components/SearchCard";
import api from "./api/axios";
import { handleError } from "./api/handler";
import WeatherCard from "./components/WeatherCard";
import LoadingCard from "./components/LoadingCard";
import ErrorCard from "./components/ErrorCard";
import useDebounced from "./hooks/useDebounced";

function App() {
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [countryCode, setContryCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const search = async () => {

    setWeather(null);

    let [latitude, longitude, timezone, locationName, countryCode] = await getLocation();
    let weather = await getWeather(latitude, longitude, timezone);

    setWeather(weather);
    setLocationName(locationName);
    setContryCode(countryCode);

  };

  const debouncedInput = useDebounced(country,5000);

  console.log(debouncedInput);


  const getWeather = async (latitude, longitude, timezone) => {
    try {
      const weather = await api.get(
        `https://api.open-meteo.com/v1/forecast`,
        {
          params: {
            latitude: latitude,
            longitude: longitude,
            hourly: "temperature_2m",
            current: ["temperature_2m", "relative_humidity_2m", "wind_speed_10m", "weather_code", "apparent_temperature"],
            models: ["ecmwf_ifs025"],
            timezone: timezone,
          },
        },
      );

      setLoading(false);

      return weather.data;
    } catch (error) {
      handleError(error, true);
      setError(true);
      setLoading(false);
    }
  }

  const getLocation = async () => {

    setLoading(true);
    try {
      const location = await api.get(
        `https://geocoding-api.open-meteo.com/v1/search`,
        {
          params: {
            name: country,
            count: 1,
            language: "en",
            format: "json",
          },
        },
      );

      let latitude     = location.data.results[0].latitude;
      let longitude    = location.data.results[0].longitude;
      let timezone     = location.data.results[0].timezone;
      let locationName = location.data.results[0].name;
      let countryCode  = location.data.results[0].country_code;

      return [latitude, longitude, timezone, locationName, countryCode];

    } catch (error) {
      handleError(error, true);
      setError(true);
      setLoading(false);
    }
  };


  return (
    <>
      <div className={"weather-wrapper"}>
        <h1 className={"app-title"}>Weather App</h1>
        <p className={"app-subtitle"}>
          Search any city to get current conditions
        </p>
        <SearchCard setCountry={setCountry} search={search} />
        {weather && <WeatherCard weather={weather} countryCode={countryCode} locationName={locationName}/>}
        {loading && <LoadingCard country={country}/>}
        {error && <ErrorCard/>}
      </div>
    </>
  );
}

export default App;
