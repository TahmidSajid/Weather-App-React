import { useState } from "react";
import "./App.css";
import SearchCard from "./components/SearchCard";
import api from "./api/axios";
import { handleError } from "./api/handler";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [countryCode, setContryCode] = useState(null);

  const search = async () => {
    let [latitude, longitude, timezone, locationName, countryCode] = await getLocation();
    let weather = await getWeather(latitude, longitude, timezone);

    setWeather(weather);
    setLocationName(locationName);
    setContryCode(countryCode);



    console.log(latitude);

  };


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
            timezone: timezone,
          },
        },
      );
      return weather.data;
    } catch (error) {
      handleError(error, true);
    }
  }

  const getLocation = async () => {

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
      console.log(location);
      let latitude     = location.data.results[0].latitude;
      let longitude    = location.data.results[0].longitude;
      let timezone     = location.data.results[0].timezone;
      let locationName = location.data.results[0].name;
      let countryCode  = location.data.results[0].country_code;

      return [latitude, longitude, timezone, locationName, countryCode];

    } catch (error) {
      handleError(error, true);
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
      </div>
    </>
  );
}

export default App;
